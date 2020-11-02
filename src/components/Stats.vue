<template>
	<v-container style="height: 1000px;">
		<!-- select exam menu -->
		<v-card
			v-if="selectMenu"
		    max-width="500"
		    class="mx-auto"
		  >
		    <v-toolbar
		      :color="'cyan darken-4'"
		      dark
		    >
		      <v-toolbar-title>
		        Completed Exams
		      </v-toolbar-title>
		      <v-spacer></v-spacer>
		    </v-toolbar>
		    <v-card-text>
		      <v-select
		        :items="exams"
		        item-text="name"
		        item-value="exam_id"
		        @change="loadTableAll"
		        :menu-props="{ top: true, offsetY: true }"
		        label="Select exam to see results"
		      ></v-select>
			</v-card-text>
		</v-card>
	  	<v-divider></v-divider>
	<!-- table of all students -->
	<v-card v-if="tableAll">
		<v-card-text class="table-container">
		  	 <v-data-table
		  	 	:headers="headers"
			    :items="records"
			    @click:row="clickRow"
			    class="elevation-1"
			  >		  		
			  </v-data-table>
			
		</v-card-text>
		
	</v-card>
	<!-- table of one Student -->
	<v-card v-if="tableStudent">
		<v-card-text class="table-container">
			<v-data-table	  	 	
			    :headers="headers"
			    :items="records"
			    @click:row="clickRow"
			    class="elevation-1"
			    
			  >		  

			  </v-data-table>
		</v-card-text>
		<v-card-actions>
			<v-btn color="#00897B" 
				dark class="ml-4 mb-4"
				@click="loadTableAll($data['selectedExam'])"
			>Back to all</v-btn>
		</v-card-actions>
		
	</v-card>
	<!-- pop up dialog when row clicked   -->
		<v-dialog
	      v-model="dialog"
	      max-width="290"
	    >
	      <v-card>
	        <v-card-title class="headline">See details?</v-card-title>
	        <v-card-actions>
	          <v-spacer></v-spacer>
	          <v-btn
	            color="green darken-1"
	            text
	            @click="dialog = false"
	          >
	            Cancel
	          </v-btn>
	          <v-btn
	            color="green darken-1"
	            text
	            @click="loadTableStudent"	            
	          >
	            Ok
	          </v-btn>
	        </v-card-actions>
	      </v-card>
    	</v-dialog>
	</v-container>
 </template>
<script>
	export default {
		name: 'OverviewTeacher',
		inject: ['ExamService','ReportService'],
		data(){
			return {
				defaultText: 'Select a test',
				selectedExam:false,	
				selectedStudent:false,			
				listOfExams:[],
				dialog: false,
				tableAll: false,
				tableStudent: false,
				selectMenu: true,
				currentTable:[{}],			

			}
		},

		props : {
			user: {
				type: Object
			},
		},

		methods: {
			
			loadTableAll: function(id){
				this.selectMenu=true;
				this.selectedExam=id;
				this.tableAll=true;
				this.tableStudent=false;
				Promise.all([this.ReportService.fetchReportByExam(id)])
				.then(()=>{
					this.currentTable = this.ReportService.retrieveTableAllStudents();
				})
				.catch(
					()=>console.log('nothing came back')
				);
			},
			loadTableStudent: function(){
				this.selectMenu = false;
				this.dialog = false;
				this.tableAll = false;
				this.tableStudent = true;
				Promise.all([this.ReportService.fetchOneStudent(
					this.selectedExam, this.selectedStudent)])
				.then(()=>{
					this.currentTable = this.ReportService.retrieveTableOneStudent();
				})
				.catch(
					()=>console.log('nothing came back')
				);


			},
			clickRow: function(item){
				this.selectedStudent = item["Student"];
				this.dialog = true;				
				console.log(item);
			}
		},
				
		computed: {
			exams(){
				return this.listOfExams;
			},
			headers(){
				const headers = [];
				const values = Object.keys(this.currentTable[0]);
				values.map(function(el){
					headers.push({text: el, value: el});
				});
				return headers;				
			},
			records(){
				return this.currentTable;
			}


		},

		created(){
			Promise.all([this.ExamService.fetchExams(0)])
				.then(()=>{
					this.listOfExams = this.ExamService.retrieveExams();
				})
				.catch(
					()=>console.log('nothing came back')
				);
			}
	};

</script>
<style scoped>
	.box {
		height: 100%;
	}

</style>