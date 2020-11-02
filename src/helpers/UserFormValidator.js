var UserFormValidator = function(user){
	this.user = user;



	this.validate = function(errors){

			var errorsList = [];
			if(!this.user.id) {
				errors.record({'id': 'id missing'});
				errorsList.push('idError');
			}
			if(!this.user.password) {
				errors.record({'password': 'password missing'});	
				errorsList.push('passwordError');
			} 
			if(errorsList.length > 0) {
				console.log(errors.any());
				return false;
			}
			return true; 
		}

		this.sanitize = function(errors){
			var errorsList = [];
			var paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,15}$/;

			if(!Number.isInteger(Number(this.id))) {
			//alert('id not number');	
				errors.record({'id': 'id must be a number'});
				errorsList.push('idError');
			}
			if(this.user.id.toString().length!==8) {
			//alert('id must be 8 digits');	
				errors.record({'id':'id must be 8 digits long'});
				errorsList.push('idError');
			}
			/*
			* To check a password between 5 to 15 characters 
			* which contain at least one numeric digit and a special character
			*/
			if(!this.user.password.match(paswd)) {  	
			//alert('password not valid');		
				errors.record({
					'password': `password must be between 5 to 15 characters 
								which contain at least one numeric digit and a special character!`
				});	
				errorsList.push('passwordError');
			} 
			if(errorsList.length > 0) {
				console.log(errors.any());
				return false;
			}
			return true;

		}
}

