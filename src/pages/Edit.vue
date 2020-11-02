<template>	
	
	<NewExamForm
			v-bind:user="user"
			v-bind:subject="subject"
			v-bind:fields="fields"
			v-bind:exam="exam"
			v-bind:modeEdit="true"		
	></NewExamForm>

</template>

<script>
	import NewExamForm from '../components/forms/NewExamForm.vue';
	import ExamService from '../services/exam.service.js';
	import UserService from '../services/user.service.js';
	import QuestionInput from '../components/forms/QuestionInput.vue';
	import ChoiceInput from '../components/forms/ChoiceInput.vue';

	let exam={};

	export default{
		name:'Edit',
		inject:['ExamService','UserService'],
		components: {
			NewExamForm,
		},
		data(){
			return{
				user: '',
				fields:[],
				exam:{},
				subject: {},
			}
		},

		created(){
			let fields = [];
			const questionChoices = this.ExamService.retrieveQuestionsChoices();
			this.user = this.UserService.retrieveState();
			this.exam = exam;
			this.subject.subject_id = exam.subject_id;
	console.log(questionChoices);		
			let count = 1;
			let currentQuestion = 'question '+count;
			Object.entries(questionChoices).forEach(function(entry){
				let questionId = entry[0];
				for(const property in entry[1]) {
					
					let obj = {
						component: QuestionInput,
				        name: {},				        
				        subComponent: {
				          component:ChoiceInput,
				          props: entry[1][property],  
				          questionNumber: currentQuestion,				          
				        },
				        
				    };
				    obj.name = currentQuestion;
				    obj[currentQuestion] = property;
				    obj['question_id'] =  questionId;
				    fields.push(obj); 
					
				}
				count++;
				currentQuestion = 'question '+count;
			});
			
			this.fields = fields;
			console.log(this.fields);

		},

		// added modification
        beforeRouteEnter(to, from, next) {
            Promise.all([
             ExamService.fetchQuestions(to.params.examId)       
            ]).then(() => {
            	exam['exam_id'] = to.params.examId;
            	exam['subject_id'] = to.params.subjectId;
            	exam['name'] = to.params.name;
                console.log(to.params.examId, to.params.subjectId)
              next();
            });
            
        },



	}



</script>