<template>
  <v-container>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <template v-slot:default="{ open }">
          <v-row no-gutters>
            <v-col cols="4">Exam Name</v-col>
            <FormInlineMessage
                v-if="$v.exam.name.$error"
              >           
              Exam name must be at least 3 characters long
              </FormInlineMessage>
           
          </v-row>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-text-field
          @input="$v.exam.name.$touch()"
          v-model="exam.name"
          placeholder="Exam name"
        ></v-text-field>
        
      </v-expansion-panel-content>
    </v-expansion-panel>

  <v-expansion-panel>
      <v-expansion-panel-header v-slot="{ open }">
        <v-row no-gutters>
          <v-col cols="4">Start and end dates</v-col>
          <v-col
            cols="8"
            class="text--secondary"
          >
          <FormInlineMessage
                v-if="$v.exam.datetime.$error"
              >           
              Date is required
              </FormInlineMessage>

            <v-fade-transition leave-absolute>
              <span v-if="open">What should be exam date</span>
              <v-row
                v-else
                no-gutters
                style="width: 100%"
              >
               
              </v-row>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row
          justify="space-around"
          no-gutters
        >
          <v-col cols="3">
            <v-menu
              ref="startMenu"
              :close-on-content-click="false"
              :return-value.sync="exam.datetime"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  @input="$v.exam.datetime.$touch()"
                  v-model="exam.datetime"
                  label="Exam Date"
                  
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="exam.datetime"
                no-title
                scrollable
              >
              
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.startMenu.isActive = false"
                >Cancel</v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.startMenu.save(exam.datetime)"
                >OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>          
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
   
    <QuestionInput
      v-bind:fields="fields"
      v-bind:modeEdit="modeEdit"
    ></QuestionInput>  
    
    
  </v-expansion-panels>
  <v-row align="center">
    <v-col class="text-center" cols="12" sm="6">
      <v-btn
        small 
        color="error"
        v-on:click="dialogSubmitExam=true"
      >Submit Exam</v-btn>  
    </v-col>
    <v-col class="text-center" cols="12" sm="6">
      <v-btn 
        small
        dark
        color="#00897B"
        @click.stop="addNewQuestion"
      >Add Question</v-btn>
    </v-col>
    
  </v-row>

<!-- dialog for submit actions -->
   <v-dialog 
    max-width="400"
    v-model="dialogSubmitExam"
    
   >
   <v-card light>
      <v-card-title >
      You are about to confirm exam. 
      <v-icon>mdi-logout</v-icon>
      </v-card-title>
      <v-card-actions>
            <v-spacer></v-spacer>         
            <v-btn
              color="green darken-1"
              text
              @click.stop="submitExam"
            >Confirm
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              @click.stop="dialogSubmitExam=false"
            >
              Cancel
            </v-btn>


          </v-card-actions>
    </v-card>
  </v-dialog>     


  
</v-container>
</template>
 
<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { minLength, between, integer } from 'vuelidate/lib/validators';
import QuestionInput from './QuestionInput.vue';
import ChoiceInput from './ChoiceInput.vue';

import FormInlineMessage from '../forms/FormInlineMessage.vue';

export default {
  name: 'NewExamForm',
  components: {
    QuestionInput,
    ChoiceInput,
    FormInlineMessage  
  },
  mixins: [validationMixin],
  inject: ['ExamService'],
  data(){
    return {
      errors: false,
      message: '',
      // questionNumber:1,
      questions:[{        
      }],
      dialogSubmitExam:false,      
    }
  },
  props: {
    user: {
      type:Object
    },
    exam: {
      type:Object,
      default: function(){
        return {
          name:'',
          datetime:'',
        }
      }       
    },
    subject:{
      type:Object,
      default:function(){
        return{
          subject_id:''
        }
      }
    },    
    fields: {
      type:Array,     
    },
    modeEdit: {
      type:Boolean,
      default:()=>false,
    }
  },
  validations:{
    exam: {
      name:{
        required,
        minLength: minLength(3)
      },
      datetime:{
        required,

      }
    }
  },
  methods: {
    submitExam(){
      console.log(this.exam);
      console.log(this.fields);
      
      this.ExamService.writeExam({
        exam_id: this.exam.exam_id || null,
        subject_id:this.subject.subject_id, 
        name: this.exam.name,
        datetime: this.exam.datetime,
        instructor_id:this.user.details.user_id,        
      })      
      .then((response)=>{          
          const self = this; 
          const newExam = this.ExamService.retrieveNewExam();
          var questions = [];

          this.fields.forEach( function(element) {
              Object.keys(element).map(function(key){          
              if(key.includes("question ")) {
                let choices = element.subComponent.props.choices;
                questions.push({
                  "id": element.question_id || null,
                  "exam_id": newExam.id,
                  "content": element[key],
                  "choices": choices
                });
              } 
            })
          });  
          console.log(questions);
          this.ExamService.writeQuestion(questions);
         
          if(this.modeEdit) this.$eventBus.$emit('pageLoader', {name:"welcome"});
          else location.replace("/welcome");      

                     
      })
      .catch((error)=>{
        console.log(error);
        this.message = [
          error.response.status,
          error.response.data.body.error
        ];
        this.errors = true;
      })     
    },
    addNewQuestion: function(){
      
      const nextQuestion = this.fields.length + 1;
      this.fields.push({
        component: QuestionInput,
        label: 'Question',
        name: 'question '+nextQuestion,
        options: {
          attrs: {
            placeholder: 'Type Your question',
            class: 'input'
          },
        },
        subComponent: {
          component:ChoiceInput,
          props: {
            choices: [{              
            }],
            questionNumber: 'question '+nextQuestion,

          }
        }
      });
      
    }
  },
  created() {
    console.log(this.fields);
  }, 
};
</script>

<style scoped>
  .my-parent {
    width: auto;
    
  }
  .my-form {
    margin: auto;
  }
</style>