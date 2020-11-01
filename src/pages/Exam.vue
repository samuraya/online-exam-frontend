<template>
    <div>
        <div class="panel panel-default" v-for="(choices, question) in questions">
            <div class="panel-heading">
                <h3 class="panel-title text-center">{{question}}</h3>
            </div>
            <div class="panel-body">
                <div class="col-xs-12 col-sm-6 text-center" v-for="choice in choices">{{choice.content}}
                <input type="radio" v-bind:name="choice.question_id" @input="selectChoice(choice.question_id,choice.id)">
                </div>
            </div>
        </div>       
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="290">
              <template v-slot:activator="{ on }">
                <v-btn color="#00897B" dark v-on="on">Submit</v-btn>
              </template>
              <v-card>
                <v-card-title class="headline">Agree to submit?</v-card-title>
                <v-card-text>Once you confirm your submission there is no going back</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>
                  <v-btn color="green darken-1" text @click="submitAnswer">Agree</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>

<script>
import ExamService from '../services/exam.service.js';

    export default{
        name: "Exam",
        data(){
            return {
                questions: {},
                answers:{},
                choices: [],
                dialog: false,
            }
        },
        inject: ['ExamService','UserService'],
        methods: {
            selectChoice(questionId, choiceId){
                console.log(questionId,choiceId);
                this.answers[questionId] = choiceId;
                console.log(this.answers);
                
            },
            submitAnswer(){
                this.ExamService.writeAnswer(this.answers);
                this.$eventBus.$emit(
                        'pageLoader',
                        {name: 'welcome',                        
                        });
            }
        },

        computed: {
            questionsAnswers(){
                console.log('computed')
                return this.ExamService.retrieveQuestionsChoices();
            }
        },
        
        created(){
            const questions ={};
            const temp = Object.values(this.questionsAnswers);
            temp.forEach(function(el){
                const question = Object.keys(el);
                questions[question]= Object.values(el)[0].choices;                
            });
            this.questions = questions;
            console.log(questions);
        },
        // added modification
        beforeRouteEnter(to, from, next) {
            Promise.all([
              ExamService.fetchQuestions(to.params.examId)             
            ]).then(() => {
                console.log('fetching questions')
              next();
            });
            
        },

        
    };

</script>