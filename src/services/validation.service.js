import Vue from 'vue';
import Vuelidate from 'vuelidate';
import { required, minLength, between, email } from 'vuelidate/lib/validators';

Vue.use(Vuelidate);

const ValidationService = {

	requiredLength: {
	  avatar: 1,
	  name:1,
	  bio: 1,
	  email:1,
	  password:1,
	},

	keepRelevants: function(obj) {  //filters out empty values
		const filteredObject = {};
		Object.keys(obj)
			.map((currentKey)=>{
				if(obj[currentKey].length > 
	          	ValidationService.requiredLength[currentKey]){
	            filteredObject[currentKey]=obj[currentKey];
	          };
	        });
		return filteredObject;
	        

	},

	validators: {

		updateSettings: {
	
		    name: {
		      //required,
		      minLength: minLength(4)
		    },
		    age: {
		      //required,
		      between: between(20, 30)
		    },

		    bio :{
		    	//required,
		    	minLength: minLength(10)
		    },
		    password: {
		    	required,
		    	minLength: minLength(5)
		    },
		    email: {
		    	//required,
		    	email
		    },
		    avatar: {
		    	required,
		    	
	    	}	
		}
	}

	






};


export default ValidationService;

