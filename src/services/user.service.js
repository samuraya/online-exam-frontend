import ApiService from "./api.service";
import ValidationService from "./validation.service";
import { local } from "./localStorage.service";

const UserService = function(){
	var state = {
		details: {},
		isLogged:false,
		errors: 'nothing',
		profile: {
			avatar: [],
			first_name:'',
			last_name:'',
			email:'',
		}
	};	
	var retrieveState = function(){
			return state;			
	};
	var retrieveProfile = function(){
		return state.profile;
	};
	var retrieveAvatar = function(){
		return state.profile.avatar;
	};
	var updateDetails = function(payload){
			state.details ={...payload};
			
	};
	var saveLocaly = function(payload){    	
    	local.save('user',payload);
    	if(payload.token){    		
    		local.save('auth_token',payload.token);
    	}      	
    };
    var setAvatar = function(url) {
    	state.profile.avatar = url;
    };
    var setProfile = function(profile) {
    	state.profile = profile;
    };
	var login = async function(credentials){  //public 
			const errorHandler = {errorHandle: false};
			//ApiService.setHeader('application/x-www-form-urlencoded');
			await ApiService.post('/login', credentials, errorHandler)
				.then((response)=>{					
					updateDetails(response.data.body.user);						
				})
				.catch((error)=>{
					return Promise.reject(error.response);
				});
	    };

	var register = async function(credentials){  //public 
			ApiService.setHeader();
			await ApiService.post('/register', credentials)
				.then((response)=>{
					updateDetails(response.data.body.user);							
				})
				.catch((error)=>{
					return Promise.reject(error.response);
				});
	    };

	var uploadAvatar = async function (payload) {
	    	//alert('upload avatar')
	    	ApiService.setHeader('multipart/form-data');
	    	await ApiService.post('/profile/image', payload)
	    		.then((response)=>{	 
	    		console.log(response.data);	
	    			setAvatar(response.data.body.filename);		    			    			
	    		})	    	    		
	    		.catch((error)=>{
	    			return Promise.reject(error);
	    		});
	};
	var saveProfile = async function (payload) {
	    	await ApiService.post('/profile', payload)
	    		.then((response)=>{	 
	    		console.log(response.data);	
	    			setProfile(response.data.body.profile);		    			 			
	    		})	    	    		
	    		.catch((error)=>{
	    			return Promise.reject(error.response);
	    		});
	};
	var logout = async function() {
		await ApiService.post('/logout')
	    		.then(response)
	    		.catch((error)=>{
	    			return Promise.reject(error.response);
	    		});	    		
	};
	var fetchProfile = async function() {
		await ApiService.get('/profile')
	    		.then((response)=>{
	    			setProfile(response.data.body.profile);					
	    		})
	    		.catch((error)=>{
	    			return Promise.reject(error.response);
	    		});	    		
	};
	var fetchAuth = async function () {
		await ApiService.get('/me')
	    		.then((response)=>{	    			
					updateDetails(response.data.body.user);	
	    		})
	    		.catch((error)=>{
	    			return Promise.reject(error.response);
	    		});	    	
	};   	
	return {
		retrieveState,
		login,
		updateDetails,
		fetchAuth,
		fetchProfile,
		register,
		saveProfile,
		uploadAvatar,
		retrieveAvatar,
		retrieveProfile,
		logout,

	};	
}();
export default UserService;

 
    
