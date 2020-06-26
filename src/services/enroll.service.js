import ApiService from "./api.service";
import { local } from "./localStorage.service";

const EnrollService = function(){
	
	var writeEnrollFromFile = async function (payload,subjectId) {
	    	//'/enroll/'+subjectId
	    	ApiService.setHeader('multipart/form-data');
	    	await ApiService.post('/enroll/'+subjectId, payload)
	    		.then((response)=>{
	    			//setTableOneStudent(response.data.body.student);
	    		})
	    		.catch((error)=>{
	    			return Promise.reject(error);
	    		});
	} 


	return {
		writeEnrollFromFile,


	}    		


}();
export default EnrollService;