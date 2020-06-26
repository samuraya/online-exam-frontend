<template>
   <v-alert
      width="auto"
      outlined
      type="warning"
      prominent
      border="left"
      dismissible
      @input="close"

      
    
    >
           
      <p v-for="line in message">{{line}}</p>

    </v-alert>

</template>

<script>
	export default {
        props: ['message','isActive'],
        data(){
            return {
               
            }
        },
        methods: {
          close(arg){
            this.$emit('closeAlert');
          }
        },

        computed: {
          check(){

          }
        }
       




  };

</script>

<style></style>