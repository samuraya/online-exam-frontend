<template>
	
	<v-container style="height: 1000px;">



		 <v-card
    max-width="500"
    class="mx-auto"
  >
    <v-toolbar
      :color="'cyan darken-4'"
      dark
    >
      
      <v-toolbar-title>
        Active Exams
      </v-toolbar-title>

      <v-spacer></v-spacer>

      
          
      

     
    </v-toolbar>

    <v-card-text>
      <v-select
        :items="exams"
        item-text="name"
        item-value="exam_id"
        @change="selectExam"
        :menu-props="{ top: true, offsetY: true }"
        label="Select Exam"
      ></v-select>

	<v-card-actions
		v-if="selectedExam">
          <v-spacer></v-spacer>
          <v-btn
            text
            color="secondary"
            @click="selectedExam=false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="start"
          >
            Start
          </v-btn>
        </v-card-actions>



    </v-card-text>
  </v-card>

	</v-container>
     
 </template>
<script>
	export default {
		name: 'OverviewStudent',
		inject: ['ExamService'],
		data(){
			return {
				defaultText: 'Select a test',
				selectedExam:false,
				listOfExams:[],

			}
		},

		props : {
			user: {
				type: Object
			},
		},

		methods: {
			selectExam: function(id){
//console.log(id);
				this.selectedExam=id;
				
			},
			start: function(){
				if(!this.selectedExam){
					alert('select valid test');
				} else {
					
					this.$eventBus.$emit(
						'pageLoader',
						{name: 'exam',
						params: {examId: this.selectedExam}});					
				}
			}
		},
		computed: {
			exams(){
				return this.listOfExams;
			},			
		},
		created(){
			Promise.all([this.ExamService.fetchExams()])			
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