import Vue from 'vue';

const httpErrorHandler = function(error) {
	//console.log(error.config.hasOwnProperty("errorHandle"));
	if (error.config.hasOwnProperty("errorHandle") &&
            error.config.errorHandle === false) {
       	
       	return Promise.reject(error);
    }
    if (error.response.status!=401) {
    	return Promise.reject(error);
    }
    window.location.replace('/login');
    return;
};

export default httpErrorHandler;

	









