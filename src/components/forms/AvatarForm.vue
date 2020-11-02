<template>  
    <v-card>
		<v-col cols="12" sm="12">
		 <v-file-input					
		    v-model="chosenImage"
		    accept="image/*"
		    placeholder="Pick an avatar"
		    prepend-icon="mdi-camera"
		    label="Avatar"			    
	 	 ></v-file-input>
		</v-col>	       
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click.stop="$emit('closeAvatar')"
          >
            Cancel
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click.stop="$emit('uploadAvatar',chosenImage)"
          >
            Upload
          </v-btn>
        </v-card-actions>
	</v-card>
</template> 
<script>
	
	export default{

		data(){
			return {
				chosenImage:[],
			}
		},		

	};




</script>