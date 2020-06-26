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

      </v-expansion-panel-content> 
  </v-expansion-panel>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { minLength, between, integer } from 'vuelidate/lib/validators';

export default {
  name: 'NewSubjectForm',
  components: {  
     
  },
  inject: ['ExamService'],
  data(){
    return {
      errors: false,
      message: '',
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
          console.log(error);
          this.message = [
            error.response.status,
            error.response.data.body.error
          ];
          this.errors = true;
        })
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