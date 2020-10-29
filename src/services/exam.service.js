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
	    	
		/*
	    	const localData = local.read('exams');

	    	if(localData===null){
	    		console.log('fetching from server')
	    		await ApiService.get('/exams')
	    		.then((response)=>{
	    			saveLocaly('exams',response.data.body.exams);
					updateExams(local.read('exams'));	
	    		})
	    		.catch((error)=>{
	    			return Promise.reject(error);
	    		})
	    	} else {

	    		console.log('fetching from localStorage',localData);
	    		updateSubjects(local.read('exams'));	
	    		return Promise.resolve();
	    	}
	    */
	    	
	}; 

	var fetchSubjects = async function () {
	    	
	    	
		await ApiService.get('/subjects')
	    		.then((response)=>{
	    			//saveLocaly('subjects',response.data.body.exams);
					setSubjects(response.data.body.subjects);
					//console.log(response.data.body.subjects);
	    		})
	    		.catch((error)=>{
	    			return Promise.reject(error);
	    		})

		/*
	    	const localData = local.read('subjects');

	    	if(localData===null){
	    		console.log('fetching from server')
	    		await ApiService.get('/subjects')
	    		.then((response)=>{
	    			saveLocaly('subjects',response.data.body.exams);
					updateExams(local.read('subjects'));	
	    		})
	    		.catch((error)=>{
	    			return Promise.reject(error);
	    		})
	    	} else {

	    		console.log('fetching from localStorage',localData);
	    		updateSubjects(local.read('subjects'));	
	    		return Promise.resolve();
	    	}
	    */
	}; 

	var fetchQuestions = async function (examId) {
	    	
	    	
		await ApiService.get('/exam/'+examId)
	    		.then((response)=>{
	    			//saveLocaly('subjects',response.data.body.exams);
					// setQuestions(response.data.body.questions);
					// setChoices(response.data.body.choices);
					setQuestionsChoices(response.data.body.questions_choices)


					//console.log(response.data.body.subjects);
	    		})
	    		.catch((error)=>{
	    			return Promise.reject(error);
	    		})
	    }


	//writes one subject fetches back all subjects.
	var writeExam = async function (payload) {
	    		  
	    		  console.log(payload);  	    	
	    		//console.log('fetching exams from server')
	    		await ApiService.post('/exam', payload)
	    		.then((response)=>{
	    			
	     			//saveLocaly('subject',response.data.body.subject);
				setNewExam(response.data.body.exam);
				//setNewSubject(response.data.body.subject);
					//return response;
				 
					
	    		})
	    		.catch((error)=>{
	    			return Promise.reject(error);
	    		})
    	
	}; 
	var writeSubject = async function (payload) {
	    		    	    	
	    		//console.log('fetching exams from server')
	    		await ApiService.post('/subject', payload)
	    		.then((response)=>{
	    			
	     			//saveLocaly('subject',response.data.body.subject);
					setNewSubject(response.data.body.subject);
				//setNewSubject(response.data.body.subject);
					//return response;
				 
					
	    		})
	    		.catch((error)=>{
	    			return Promise.reject(error);
	    		})
    	
	}; 

	var writeQuestion = async function (payload) {
	    		    	    	
	    		//console.log('fetching exams from server')
	    		await ApiService.post('/question', payload)
	    		.then((response)=>{
	    			//console.log('new question came back',response.data);
	     			//saveLocaly('subject',response.data.body.subject);
					//setNewSubject(response.data.body.question);
				setNewQuestions(response.data.body.questions);
				setChoicesToNewQuestions(response.data.body.choices);
					//return response;
				 
					
	    		})
	    		.catch((error)=>{
	    			return Promise.reject(error);
	    		})
    	
	}; 

	var writeAnswer = async function (payload) {
	    		    	    	
	    		//console.log('fetching exams from server')
	    		await ApiService.post('/answer', payload)
	    		.then((response)=>{
	    			//console.log('new question came back',response.data);
	     			//saveLocaly('subject',response.data.body.subject);
					//setNewSubject(response.data.body.question);
				// setNewQuestions(response.data.body.questions);
				// setChoicesToNewQuestions(response.data.body.choices);
					//return response;
				 
					
	    		})
	    		.catch((error)=>{
	    			return Promise.reject(error);
	    		})
    	
	}; 

	var deleteChoice = async function(choiceId) {
		await ApiService.delete('/choice/'+choiceId)
	    		.then((response)=>{
	    			//console.log('new question came back',response.data);
	     			//saveLocaly('subject',response.data.body.subject);
					//setNewSubject(response.data.body.question);
				// setNewQuestions(response.data.body.questions);
				// setChoicesToNewQuestions(response.data.body.choices);
					//return response;
				 
					
	    		})
	    		.catch((error)=>{
	    			return Promise.reject(error);
	    		})
	};


	var deleteQuestion = async function(questionId) {
		await ApiService.delete('/question/'+questionId)
	    		.then((response)=>{
	    								
	    		})
	    		.catch((error)=>{
	    			return Promise.reject(error);
	    		})
	};


	//writes one subject fetches back all subjects.
	var closeExam = async function (examId) {	    		    	    	
	    		console.log(examId)
	    		await ApiService.update('/exam/'+examId)
	    		.then((response)=>{	    			
	   			//saveLocaly('subject',response.data.body.subject);
				// setNewExam(response.data.body.exam);
				// //setNewSubject(response.data.body.subject);
				// 	//return response;		 
					
	    		})
	    		.catch((error)=>{
	    			return Promise.reject(error);
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