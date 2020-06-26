<template> 
	<login-form></login-form>	
</template>
<script>
import LoginForm from '../components/forms/LoginForm.vue';
	export default {
		name:"login",
		data: function (){
			return {
				message: '',
			}
		},
		components: {
			LoginForm
		},
		
	};
</script>
<style scoped>
	.my-parent {
		width: auto;
		
	}
	.my-form {
		margin: auto;
	}
</style>