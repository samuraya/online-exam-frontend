<template>
  <v-container>
  	<v-expansion-panel
      v-for="(field, index) in fields"
      :key="field.name"
    >
       
        <v-expansion-panel-header v-slot="{ open }">

          <v-row no-gutters>

            <v-col cols="4">{{field.name}}</v-col>
           
          </v-row>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
         <!-- <v-btn 
            class="mx-2" 
            dark absolute 
            right x-small
            color="teal"
          > -->
            <div class="icon-wrapper">
              <v-icon
              v-on:click="deleteQuestion(index)"
              >mdi-delete</v-icon>

            </div>
            
          <!-- </v-btn> -->
          <v-text-field
            v-model="field[field.name]"
            placeholder="type your question"
          ></v-text-field>
          
  		<ChoiceInput
        v-bind="field.subComponent.props"
        v-bind:modeEdit="modeEdit"
      ></ChoiceInput>

        </v-expansion-panel-content>
      </v-expansion-panel>
</v-container>

</template>

<script>
import ChoiceInput from './ChoiceInput.vue';
  
  export default {
    inject: ['ExamService'],
    name: "QuestionInput",
    components: {
      ChoiceInput,
    },
    data() {
      return{
        data:{

        }
      }
    },

    props: {
        fields: {
          
          type: Array,
        },
        modeEdit: {
          type:Boolean,
        }
    },

    methods: {

        deleteQuestion(index){
          console.log(this.fields[index].question_id);
          const questionId = this.fields[index].question_id;

          if(questionId){
            this.ExamService.deleteQuestion(questionId)
            .then((response)=>{
              this.fields.splice(index, 1);
            })
            .catch(error=>console.log(error));        
          } else {
            this.fields.splice(index, 1);
          }
          
        },



    },

    created() {
      console.log(this.fields)
    }

  };

</script>
<style scoped>
    .icon-wrapper {
      text-align: right
    }
  
</style>