import ApiService from "./api.service";
import { local } from "./localStorage.service";

const ExamService = function(){

	var exams = [{
		id:'',
		name:'',
		instructor:''
	}];

	var subjects = [{}];
	var questions = [{}];
	var choices = [{}];
	var questionsChoices = [{}];
	
	var newSubject = {
		id:'',
		subject_id:'',
		name:'',
		instructor_id:''
	};
	var newExam = {
		id:'',
		name:'',
		subject_id:'',
		datetime:'',
		is_active:'',
	};
	var newQuestions = {
		id:'',
		exam_id:'',
		content:'',
		is_active:'',
	};
	var choicesToNewQuestions = {
		id:'',
		question_id:'',
		content:'',
		is_correct:'',
	};


	//get already existing records from database
	var retrieveExams = function(){ 
		return exams;
	};
	var retrieveSubjects = function(){
		return subjects;
	};
	var retrieveQuestions = function(){
		return questions;
	};
	var retrieveChoices= function(){
		return choices;
	};
	//ready made multiple choice question by exam id
	var retrieveQuestionsChoices = function(){
		return questionsChoices
	}
	



	//get fresh records that were created in latest request
	var retrieveNewSubject = function(){
		return newSubject;
	}
	var retrieveNewExam = function(){
		return newExam;
	};
	var retrieveNewQuestions = function(){
		return newQuestions;
	};
	var retrieveChoicesToNewQuestions= function(){
		return choicesToNewQuestions;
	};
	

	//fetch and write to memory records that already existed in database
	var setExams = function(payload){
		exams = payload;
		
	};
	var setSubjects = function(payload){
		subjects = payload;
		
	};
	var setQuestions = function(payload){
		questions = payload;
	}

	var setChoices = function(payload) {
		choices = payload;
	};

	var setQuestionsChoices= function(payload){
		questionsChoices = payload;
	}
	//fetch fresh data for the new records created in database
	var setNewSubject = function(payload){
		newSubject = payload;
		
	};

	var setNewQuestions = function(payload){
		newQuestions = payload;
	};

	var setChoicesToNewQuestions = function(payload){
		choicesToNewQuestions = payload;
	};

	var setNewExam = function(payload){
		newExam = payload;
	};


	var saveLocaly = function(key, payload){
    	
    	console.log('commiting to saveLocaly', payload);
    	local.save(key,payload);
    	
      	
    };


	var fetchExams = async function (status=1) {
	    	
	    	await ApiService.get('/exams?status='+status)
	    		.then((response)=>{
	    			setExams(response.data.body.exams);
	    		})
	    		.catch((error)=>{
	    			return Promise.reject(error);
	    		});	    	
	}; 

	var fetchSubjects = async function () {
	    	
	    	
		await ApiService.get('/subjects')
	    		.then((response)=>{	    			
					setSubjects(response.data.body.subjects);					
	    		})
	    		.catch((error)=>{
	    			return Promise.reject(error.response);
	    		})		
	}; 

	var fetchQuestions = async function (examId) {
	    	
	    	
		await ApiService.get('/exam/'+examId)
	    		.then((response)=>{	    			
					setQuestionsChoices(response.data.body.questions_choices)					
	    		})
	    		.catch((error)=>{
	    			return Promise.reject(error.response);
	    		})
	    }


	//writes one subject fetches back all subjects.
	var writeExam = async function (payload) {
	    		  
	    		  console.log(payload);  	    	
	    		
	    		await ApiService.post('/exam', payload)
	    		.then((response)=>{	     			
					setNewExam(response.data.body.exam);					
	    		})
	    		.catch((error)=>{
	    			return Promise.reject(error.response);
	    		})
    	
	}; 
	var writeSubject = async function (payload) {	    		
	    		await ApiService.post('/subject', payload)
	    		.then((response)=>{	     			
					setNewSubject(response.data.body.subject);					
	    		})
	    		.catch((error)=>{
	    			return Promise.reject(error.response);
	    		})
    	
	}; 

	var writeQuestion = async function (payload) {	    		    	    	
	    		await ApiService.post('/question', payload)
	    		.then((response)=>{	    			
					setNewQuestions(response.data.body.questions);
					setChoicesToNewQuestions(response.data.body.choices);					
	    		})
	    		.catch((error)=>{
	    			return Promise.reject(error.response);
	    		})
    	
	}; 

	var writeAnswer = async function (payload) {	    		    	    	
	    		//console.log('fetching exams from server')
	    		await ApiService.post('/answer', payload)
	    		.then((response)=>{ 
					
	    		})
	    		.catch((error)=>{
	    			return Promise.reject(error.response);
	    		})
    	
	}; 

	var deleteChoice = async function(choiceId) {
		await ApiService.delete('/choice/'+choiceId)
	    		.then((response)=>{			 
					
	    		})
	    		.catch((error)=>{
	    			return Promise.reject(error.response);
	    		})
	};


	var deleteQuestion = async function(questionId) {
		await ApiService.delete('/question/'+questionId)
	    		.then((response)=>{
	    								
	    		})
	    		.catch((error)=>{
	    			return Promise.reject(error.response);
	    		})
	};

	//writes one subject fetches back all subjects.
	var closeExam = async function (examId) {	    		    	    	
	    		console.log(examId)
	    		await ApiService.update('/exam/'+examId)
	    		.then((response)=>{	    			
	   			
	    		})
	    		.catch((error)=>{
	    			return Promise.reject(error.response);
	    		})
    	
	}; 
		 
	return {
		fetchExams,
		fetchSubjects,
		fetchQuestions,
		retrieveExams,
		retrieveSubjects,
		retrieveNewSubject,
		retrieveNewExam,
		retrieveNewQuestions,
		retrieveChoicesToNewQuestions,
		retrieveQuestions,
		retrieveChoices,
		retrieveQuestionsChoices,
		writeSubject,
		writeExam,
		writeQuestion,
		writeAnswer,
		deleteChoice,
		deleteQuestion,
		closeExam,
		
	};

}();
export default ExamService;