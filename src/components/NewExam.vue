<template>
	<v-container style="height: 1000px;">	
	  <v-expansion-panels>
	    <v-expansion-panel>
	      <v-expansion-panel-header v-slot="{ open }">
	        <v-row no-gutters>
	          <v-col cols="4">Subjects</v-col>
	          <v-col
	            cols="8"
	            class="text--secondary"
	          >
	            <v-fade-transition leave-absolute>
	              <span
	                v-if="open"
	                key="0"
	              >
	                
	              </span>
	              <span
	                v-else
	                key="1"
	              >
	                
	              </span>
	            </v-fade-transition>
	          </v-col>
	        </v-row>
	      </v-expansion-panel-header>
	      <v-expansion-panel-content>
	        <v-row no-gutters>
	          <v-spacer></v-spacer>
	          <v-col cols="5">
	            <v-select
	              return-object
	              :items="subjects"
	              item-text="name"
	              @change="selectSubject"
	              chips
	              flat
	              label="Select Subject"
	            ></v-select>
				
	          </v-col>

	          <v-divider
	            vertical
	            class="mx-4"
	          ></v-divider>

	          <v-col cols="3">
	           Add New Subject
	            <br>	            
	          </v-col>
	        </v-row>

	        <v-card-actions>
	          <v-spacer></v-spacer>
	          <v-btn
	            text
	            color="secondary"
	            @click="addNewSubjectForm=false"
	          >
	            Cancel
	          </v-btn>
	          <v-btn
	            text
	            color="primary"
	            @click="addNewSubjectForm=true"
	          >
	            Add
	          </v-btn>
	        </v-card-actions>
	      </v-expansion-panel-content>
	    </v-expansion-panel>
		
		<NewSubjectForm	
			v-if="addNewSubjectForm"
			v-bind:user="user.details"
			v-on:subjectAdded="subjectAdded">
			
		</NewSubjectForm>
	    
	  </v-expansion-panels>

		<NewExamForm
			v-if="addNewExamForm"
			v-bind:user="user"
			v-bind:subject="selectedSubject"
			v-bind:fields="fields"
			
		></NewExamForm>
				
	</v-container>
	
</template>;

<script>
import { validationMixin } from 'vuelidate';
import NewSubjectForm from '../components/forms/NewSubjectForm.vue';
import NewExamForm from '../components/forms/NewExamForm.vue';

import QuestionInput from './forms/QuestionInput.vue';
import ChoiceInput from './forms/ChoiceInput.vue';



	export default {
		name: 'NewExam',
		inject: ['ExamService'],
		components: {			 
			NewSubjectForm,			 
			NewExamForm,

			// QuestionInput,
   //  		ChoiceInput, 
			
		},
		mixins: [validationMixin],
		data: function () {
			return {				
				defaultText: 'Select subject',
				selectedSubject:false,
				isActive: false,
				addNewSubjectForm:false,
				addNewExamForm:false,				
				createNewSubject: false,
				listOfSubjects:'nothing',
				fields:[],
				
			}
		},
		props: {
			user: {
				type: Object
			},
			exams: {
				type: Array,
			},
			
		},
		methods: {
			selectSubject: function(subject){
				console.log(subject);
				this.selectedSubject={subject_id:subject.subject_id,name:subject.name};
				this.defaultText=name;
				this.isActive=false;			
				this.addNewExamForm=true;
			},
			subjectAdded: function(subject){				
				this.ExamService.fetchSubjects()
					.then(()=>{
						this.listOfSubjects = this.ExamService.retrieveSubjects();
						this.addNewSubjectForm=false;
				});
			},			
		},
		computed: {
			subjects(){
				return this.listOfSubjects;
			}
		},
		created(){
			Promise.all([this.ExamService.fetchSubjects()])			
				.then(()=>{					
					this.listOfSubjects = this.ExamService.retrieveSubjects();
				})
				.catch(
					()=>console.log('nothing came back')
				);


		    this.fields = [
		      {
		        component: QuestionInput,
		        name: 'question 1',
		        subComponent: {
		          component:ChoiceInput,
		          props: {
		            choices: [{            
		            }],
		            questionNumber: 'question 1',
		          }
		        },
		        validation: {          
		        },
		      }, 
		    ]

		},
	};
</script>;

<style>
	.box {
		margin-top: 30px;
	}

	
</style>