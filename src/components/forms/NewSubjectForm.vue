<template>
    <v-expansion-panel>      
      <v-expansion-panel-header>
        <template v-slot:default="{ open }">
          <v-row no-gutters>
            <v-col cols="4">Create New Subject</v-col>
            
          </v-row>
        </template>
      </v-expansion-panel-header>

     <!-- input fields  -->
      <v-expansion-panel-content>
        <v-text-field
          v-model="subject.id"
          placeholder="Subject Id"
        ></v-text-field>
         <v-text-field
          v-model="subject.name"
          placeholder="Subject name"
        ></v-text-field>
      
       <!-- action buttons -->
        <v-card-actions>
        
          <v-btn
            text
            color="primary"
            @click="submitSubject"
          >
            Add
          </v-btn>
        </v-card-actions>

        <ErrorMessage 
          v-if="serverErrors"
          v-bind:message="message"
          v-on:closeAlert="resetErrors"    
        ></ErrorMessage>

      </v-expansion-panel-content> 
  </v-expansion-panel>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { minLength, between, integer } from 'vuelidate/lib/validators';

import FormInlineMessage from '../forms/FormInlineMessage.vue';
import ErrorMessage from '../messages/ErrorMessage.vue';

export default {
  name: 'NewSubjectForm',
  components: {  
    FormInlineMessage,
    ErrorMessage,
  },
  inject: ['ExamService'],
  data(){
    return {
      errors: false,
      message: '',
      serverErrors:false,
      subject: {
        id:'',
        name:'',
      }      
    }
  },
  props: {
    user: {
      type:Object
    }, 
  },
  methods: {
    submitSubject(){
      this.ExamService.writeSubject({
        subject_id:this.subject.id, 
        name: this.subject.name,
        instructor_id:this.user.user_id,
        
      })
      .then((response)=>{
        this.$emit('subjectAdded');                        
        })
        .catch((error)=>{
          this.message = [
            error.data.statusCode,
            error.data.error.description
          ];
          this.serverErrors = true;


        })
    },

    resetErrors(){
      this.serverErrors = false;
      this.message = '';
    }
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