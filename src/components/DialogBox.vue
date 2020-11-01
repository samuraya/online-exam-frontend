<template>
	<v-dialog
      v-model="dialog"
      max-width="290"
  >
      <v-card>
        <v-card-title class="headline">{{headline}}</v-card-title>

        <v-card-text>
          {{body}}
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>         
          <slot name="buttonConfirm"></slot>
          <v-spacer></v-spacer>  
          <slot name="buttonCancel"></slot>
        </v-card-actions>           
        </v-card-actions>
      </v-card>
  </v-dialog>	
</template>
<script>
	export default {
		name: 'DialogBox',
		props: ['headline','body','dialog'],
		data(){
			return {
				
			}
		},		

		methods: {
			
		},
		computed: {
			subjects(){
				return this.listOfSubjects;
			}
		},
		
};
</script>