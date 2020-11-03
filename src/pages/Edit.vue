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
		
	export default{
		name:'Edit',
		props: ['exam'],
		inject:['ExamService','UserService'],
		components: {
			NewExamForm,
		},
		data(){
			return{
				user: {},
				fields:[],
				subject: {},
			}
		},

		created(){

			Promise.all([
             ExamService.fetchQuestions(this.exam['exam_id'])       
            ]).then(() => {
            	let fields = [];
				const questionChoices = this.ExamService.retrieveQuestionsChoices();
				this.user = this.UserService.retrieveState();				
				this.subject.subject_id = this.exam['subject_id'];
		
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
				//console.log(this.user,this.subject,this.fields);
            })
            .catch((error)=>{
            	console.log(error)
            });

		},
	}



</script>