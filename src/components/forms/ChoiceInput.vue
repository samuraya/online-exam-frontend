<template>
  <div>
 	<div 
 		v-for="(choice,index) in choices"> 		
		<input type="checkbox" 
			true-value="1" false-value="0"
			:name="questionNumber"
			v-model="choice.is_correct" 			
			>
		<textarea type="text" name="answer" id="input-content"
		placeholder="choice"
		v-model="choice.content"></textarea>		
				<v-icon class="icon-wrapper"
				v-on:click="deleteChoice(index)"
		      >mdi-delete</v-icon>    	    
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
				this.choices.push({is_correct:'',content:''});
				
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
				
			},		
			
		},
		
		created() {
			console.log(this.choices)
		}
				
};
</script>
<style scoped>
	input {
		margin-bottom: 10px;
	}

	#input-content {
		width: 500px;
	}
	.icon-wrapper {
      text-align: right

    }
    button.icon-wrapper {
    	float: right;
    	margin: 0 auto;
    }
  
</style>