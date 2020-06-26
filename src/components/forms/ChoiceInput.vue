<template>
  <div>
 	<div v-for="(choice,index) in choices">
		<input type="checkbox" :name="questionNumber" v-model="choice.status">
		<textarea type="text" name="answer" id="input-content"
		placeholder="choice"
		v-model="choice.content"></textarea>
		<v-btn 
			class="mx-2" 
			dark absolute 
			right x-small
			color="teal"
		>
	      <v-icon dark
			v-on:click="deleteChoice(index)"
	      >mdi-minus</v-icon>
	    </v-btn>
	</div>
	<button 
		class="button is-primary is-small"
		v-on:click.prevent="addChoice()"
	>Add Choice</button>
 </div>
  
</template>
<script>
	export default {
		inject: ['ExamService'],
		data(){
			return {
				
			}
		},
		props:{
			choices:{
				type:Array
			},
			questionNumber: {
				type: String,
			},
			modeEdit: {
				type: Boolean
			}

		},
		methods:{
			addChoice(){
				this.choices.push({status:'',content:''});
				
			},
			deleteChoice(index){
				const choiceId = this.choices[index].id;
				if(choiceId){
					this.ExamService.deleteChoice(choiceId)
					.then((response)=>{
						this.choices.splice(index, 1);
					})
					.catch(error=>console.log(error));				
				} else {
					this.choices.splice(index, 1);
				}
				
			}
		},
				
};
</script>
<style scoped>
	input {
		margin-bottom: 10px;
	}

	#input-content {
		width: 500px;
	}
</style>