const adapter = function(storageType){

	this.storage = storageType;
	//this.path = false;
	


		this.save = function (key,value) {
			this.storage.save(key,value); //should be json object

		};

		this.read = function (key) {
			return this.storage.read(key);
		};

		this.remove = function (key) {
			this.storage.remove(key);
		};

		this.clearAll = function () {
			this.storage.clearAll();
		};

		this.readAll = function() {
			return this.storage.readAll();
		};
		this.post = function() {
			return this.storage.post()
		};
		this.setPath = function(url){
			this.storage.setPath(url);
		};
};




export const local = (function(){
	
	function save (key,value) {
		console.log('writing to localStorage')
		if(typeof value === 'string') {
			localStorage[key] = value;
		} else {

		 	localStorage[key] = JSON.stringify(value);
		}
	};

	function read (key) {
		
		try {
		    //console.log('bnbnsbndsn')
		    var json = JSON.parse(localStorage.getItem(key));
		    
		    return  json;
		  } catch (e) {
		    return localStorage.getItem(key); 
		  }
	};

		
	function remove (key) {
		localStorage.removeItem(key);
	};

	function clearAll () {
		localStorage.clear();
	};

	function readAll () {
		//return localStorage;
		return localStorage;
	};
	

	return {
			save: save,
			read: read,
			remove: remove,
			clearAll: clearAll,
			readAll: readAll,
			
		}




})();

export const session = (function(){

	function save (key,value) {
		if(typeof value === 'string') {
			sessionStorage[key] = value;
		} else {

		 	sessionStorage[key] = JSON.stringify(value);
		}
	};

	function read (key) {
		return JSON.parse(sessionStorage.getItem(key));
	};

	function remove (key) {
		sessionStorage.removeItem(key);
	};

	function clearAll () {
		sessionStorage.clear();
	};

	function readAll () {
		//return localStorage;
		return sessionStorage;
	};

	return {
		save: save,
		read: read,
		remove: remove,
		clearAll: clearAll,
		readAll: readAll
	};

})();



export default adapter;
	
