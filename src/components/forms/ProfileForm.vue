<template>
	
	 <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field 
                	@input="$v.profile.first_name.$touch()"
	                v-model="profile.first_name"
	                label="First Name*" required
                >                	
                </v-text-field>
                <FormInlineMessage
		          v-if="$v.profile.first_name.$error"
		        >		        
		          First Name must be provided in alphabetical characters
		        </FormInlineMessage>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field 
                	@input="$v.profile.last_name.$touch()"
                	v-model="profile.last_name"
	                label="Last name*" 
	                hint="example of helper text only on focus">
                	
                </v-text-field>
                <FormInlineMessage
		          v-if="$v.profile.last_name.$error"
		        >		        
		        Last Name must be provided in alphabetical characters
		        </FormInlineMessage>
              </v-col>
              
              <v-col cols="12">
                <v-text-field
                	@input="$v.profile.email.$touch()"
                	v-model="profile.email" 
	                label="Email*" required
	            >	                	
	            </v-text-field>
	            <FormInlineMessage
		          v-if="$v.profile.email.$error"
		        >		        
		        valid email must be provided
		        </FormInlineMessage>
              </v-col>
              
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click.stop="close">Close</v-btn>
          <v-btn color="blue darken-1" text @click.stop="save">Save</v-btn>
        </v-card-actions>
      </v-card>

</template>
<script>
	import { validationMixin } from 'vuelidate';
	import { required } from 'vuelidate/lib/validators';
	import { email, alpha, minLength, between } from 'vuelidate/lib/validators';

	import FormInlineMessage from '../forms/FormInlineMessage.vue';
	
	export default{
		name: "ProfileForm",
		mixins: [validationMixin],
		components: {
	      FormInlineMessage,	     
	    },
		data(){
			return {

			}
		},
		props: {
			profile: {
				type: Object,
				default(){
					return {
						first_name:'John',
						last_name:'Doe',
						email:'john@yahoo.com'
					}
				}
			}
		},

		validations: {
			profile:{
				first_name: {
			      required,
			      alpha,
			      minLength: minLength(1),
				},
			    last_name: {
			      required,
			      alpha,
			      minLength: minLength(1),
			    },
			    email: {
			    	required,
			    	email,
			    }
			}
				    
		},
		methods: {
			close(){
				this.$emit('closeProfile');
			},
			save(){
				this.$v.$touch();
				if (this.$v.$error) return;
				this.$emit('saveProfile');
			}
		},

		

	};




</script>