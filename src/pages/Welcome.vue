<template>		
	<ParentContentWrapper v-bind:user="user"></ParentContentWrapper>	
</template> 
<script>
	import ParentContentWrapper from '../components/ParentContentWrapper';	
	export default {
		name: 'Welcome',
		inject: ['UserService'],
		components: {			
			ParentContentWrapper,
		},		
		computed: {
			user(){
				const user = this.UserService.retrieveState().details;
				if(user.level==1) {
					this.userType.teacher['details']=user;
					return this.userType.teacher;
				}
				this.userType.student['details']=user;
				return this.userType.student;
			},		
		},
		created() {
		    this.userType = {
		    	student: {
		    		header: {
		    			title: "Exam Center",
		    			subtitle: "You are student",
		    			tabs: [
			    			{
			    				tabComponent: 'OverviewStudent',
			    				tabText: 'Overview'
			    			},
			    			{
			    				tabComponent: 'Performance',
			    				tabText: 'Performance'
			    			}
			    		],
		    		}
		    	},
		    	teacher: {
		    		header: {
		    			title: "Exam Center",
		    			subtitle: "You are teacher",
		    			tabs: [
			    			{
			    				tabComponent: "OverviewTeacher",
			    				tabText: "Overview"
			    			},
			    			{
			    				tabComponent: "NewExam",
			    				tabText: "New Exam"
			    			},
			    			{
			    				tabComponent: "Stats",
			    				tabText: "Stats"
			    			},
			    			{
			    				tabComponent: "Enroll",
			    				tabText: "Enroll Students"
			    			}
			    		],
		    		}
		    	}
		    }		    
  		},
	};		
</script>;

<style>
	.box {
		margin-top: 30px;		
	}

</style>