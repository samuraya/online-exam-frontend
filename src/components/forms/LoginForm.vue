<template>
 <v-container>   
  <v-card width="400" class="elevation-8 mx-auto mt-12">
    <v-toolbar
        color="#009688"
        dark
        flat
      >
      <v-toolbar-title>Login form</v-toolbar-title>       
      </v-toolbar>
    
    <v-card-text>
      
      <v-form>
        <v-text-field
          @input="$v.user_id.$touch()"
          v-model="user_id"
          label="User Id"
          name="login"
          prepend-icon="mdi-account"
          type="text"
        ></v-text-field>
        <FormInlineMessage
          v-if="$v.user_id.$error"
        >
        
          Please fill in this field correctly.
        </FormInlineMessage>

        <v-text-field
          @input="$v.password.$touch()"
          v-model="password"
          id="password"
          label="Password"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
        ></v-text-field>
        <FormInlineMessage
         v-if="$v.password.$error"

        >         
          Please fill in this field correctly.
        </FormInlineMessage>
      </v-form>

    </v-card-text>
    <!-- checkbox for teacher -->
     <v-checkbox
        class="ml-5"
        v-model="isTeacher"
        label="Check if instructor"
      ></v-checkbox>
    

    <!-- buttons to action -->
    <v-card-actions>
      <v-btn 
        color="#00897B"
        dark
        v-on:click="registerUser"
        class="ml-5"
      >Register</v-btn>
      <v-spacer></v-spacer>
      <v-btn 
        color="#00897B"
        dark
        v-on:click="loginUser"
        class="mr-5"
      >Login</v-btn>
    </v-card-actions>  

  </v-card> 
   <ErrorMessage 
    v-if="serverErrors"
    v-bind:message="message"
    v-on:closeAlert="resetErrors"    
  ></ErrorMessage>

</v-container>
</template>
<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { minLength, between } from 'vuelidate/lib/validators';

import FormInlineMessage from '../forms/FormInlineMessage.vue';
import ErrorMessage from '../messages/ErrorMessage.vue';

export default {
  name: 'LoginForm',
  mixins: [validationMixin],
  components: {
      FormInlineMessage,
      ErrorMessage,
       
    },  
  inject: ['UserService'],
  data(){
    return {
      errors: false,
      message: '',
      user_id:'',
      password:'',
      isTeacher:false,
      serverErrors:false,
    }
  },
  validations: {
    user_id: {
      required,
      minLength: minLength(8)
    },
    password: {
      required,
      minLength: minLength(4)
    }
  },
  methods: {
    registerUser(user){
      this.$v.$touch();
      if (this.$v.$error) return;     
      this.UserService.register({user_id:this.user_id, password: this.password, level: this.isTeacher ? 1:0})
      .then((response)=>{
          this.$eventBus.$emit('pageLoader', {name: 'welcome'});          
          
        })
        .catch((error)=>{
          this.message = [
            error.data.statusCode,
            error.data.error.description
          ];
          this.serverErrors = true;
        })      
    },
    loginUser(user){
      this.$v.$touch();
      if (this.$v.$error) return;   
      this.UserService.login({user_id:this.user_id, password: this.password})
      .then((response)=>{
          this.$eventBus.$emit('pageLoader', {name: 'welcome'});        
          
        })
        .catch((error)=>{
          this.message = [
            error.data.statusCode,
            error.data.error.description
          ];
          this.serverErrors = true;
        });
    },
    resetErrors(){
      this.serverErrors = false;
      this.message = '';
    }
  },  
};
</script>