import ApiService from "./api.service";
import { local } from "./localStorage.service";

const ReportService = function(){
	var tableAllStudents = [{
		
	}];

	var tableOneStudent = [{
		
	}];
	var retrieveTableOneStudent = function(){
		return tableOneStudent;
	}

	var retrieveTableAllStudents = function(){
		return tableAllStudents;
	}
	var setTableAllStudents = function(payload){
		if(payload.length > 0){
			tableAllStudents = payload;
		}
		
	}
	var setTableOneStudent = function(payload){
		if(payload.length > 0){
			tableOneStudent = payload;
		}
		
	}
	var fetchReportByExam = async function (id) {
	    	
	    	await ApiService.get('/report/exams/'+id)
	    		.then((response)=>{
	    			setTableAllStudents(response.data.body.students);
	    		})
	    		.catch((error)=>{
	    			return Promise.reject(error);
	    		});
	}
	var fetchOneStudent = async function (examId,studentId) {
	    	
	    	await ApiService.get('/report/exams/'+examId+'/'+studentId)
	    		.then((response)=>{
	    			setTableOneStudent(response.data.body.student);
	    		})
	    		.catch((error)=>{
	    			return Promise.reject(error);
	    		});
	}


	return {
		fetchReportByExam,
		fetchOneStudent,
		retrieveTableAllStudents,		
		retrieveTableOneStudent,


	}   
}();
export default ReportService;