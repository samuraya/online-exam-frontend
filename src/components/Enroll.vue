<template>
	<v-container style="height: 1000px;">
  <v-expansion-panels>

    <v-expansion-panel>
      <v-expansion-panel-header v-slot="{ open }">
        <v-row no-gutters>
          <v-col cols="4">Subjects</v-col>
          <v-col
            cols="8"
            class="text--secondary"
          >
            <v-fade-transition leave-absolute>
              <span
                v-if="open"
                key="0"
              >
                
              </span>
              <span
                v-else
                key="1"
              >
                
              </span>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row no-gutters>
          <v-spacer></v-spacer>
          <v-col cols="5">
            <v-select
            	return-object
            	v-model="selected"
              :items="subjects"
              item-text="name"
              @change="selectSubject"
              chips
              flat
              label="Select Subject"
            ></v-select>
			
          </v-col>

          <v-divider
            vertical
            class="mx-4"
          ></v-divider>

          <v-col cols="3">
           Upload Students List

            <br>
            <!-- <a href="javascript:void(0)">Learn more</a> -->
          </v-col>
        </v-row>

        <v-card-actions 
        	v-if="action">
          <v-spacer></v-spacer>
          <v-btn
            text
            color="secondary"
            @click.stop="cancelSelected"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click.stop="uploadFile"
          >
            Upload
          </v-btn>
        </v-card-actions>
<!-- file input field -->
    	<v-file-input 
    		v-if="fileInput"
    		@change="action=true"
    		v-model="chosenFile"
    		label="File input"
        accept=".csv,.odt,.xls">
    	</v-file-input>  

      </v-expansion-panel-content>

    </v-expansion-panel>
    
  </v-expansion-panels>	
 
    <DialogBox 
      :dialog="dialog"
      :headline="dialogContent.headline" 
      :body="dialogContent.body"
    >

        <template slot="buttonConfirm">
           <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >I got it</v-btn>
          
        </template>        
    </DialogBox>


	</v-container>
</template>
<script>
  import DialogBox from './DialogBox.vue';
	export default {
		name: 'Enroll',
    components: {
      DialogBox,
    },
		inject: ['ExamService', 'EnrollService'],
		data(){
			return {
				defaultText: 'Select a test',
				fileInput:false,				
				listOfSubjects:[],
				selected:null,
				action:false,
				chosenFile: null,
				formData: new FormData(),
        dialog: false,
        dialogContent: {
          headline: "",
          body:"",

        }
			}
		},

		props : {
			user: {
				type: Object
			},
		},

		methods: {
			selectSubject: function(){
				console.log(this.selected);
				this.fileInput=true;
        this.dialogContent.headline="The file must be CSV file";
        this.dialogContent.body="Make sure columnA is filled with student IDs and columnB is filled with student names.There must not be any headers and empty fields. Example of a first row: [111 | John Doe]";
        this.dialog = true;
			},

			cancelSelected: function(){
				this.selected = null;
				this.fileInput = false;
				this.action = false;
			},

			uploadFile: function(){
				console.log('upload file')
				this.formData.append("students",this.chosenFile);								
				
				this.EnrollService.writeEnrollFromFile(
					this.formData,
					this.selected.subject_id
				)
        .then((response)=>{
          this.dialogContent.headline="File Uploaded!";
          this.dialogContent.body="Move on";
          this.dialog=true;
          this.cancelSelected();
        })
				.catch(
					(error)=>{
            this.dialogContent.headline="Failed to upload!";
            this.dialogContent.body="There was an error in uploading";
            this.dialog=true;
        });
			}
		},
		computed: {
			subjects(){
				return this.listOfSubjects;
			}
		},
		created(){
			Promise.all([this.ExamService.fetchSubjects()])			
				.then(()=>{
					this.listOfSubjects = this.ExamService.retrieveSubjects();
				})
				.catch(
					()=>console.log('nothing came back')
				);			
		},	
};
</script>
<style scoped>
	.box {
		height: 100%;
	}

</style>