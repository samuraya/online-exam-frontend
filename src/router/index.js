import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';

import Welcome from '../pages/Welcome.vue';
import Profile from '../pages/Profile.vue';

import Exam from '../pages/Exam.vue';
import Edit from '../pages/Edit.vue';

import UserService from '../services/user.service';

Vue.use(VueRouter);

var router = new VueRouter({
	mode: 'history',
	routes: [
	{
		path:'/',
		name:'home',
		component: Home,
		meta: {
			title:'Home | Welcome Page',

		}
	},

	{
		path:'/login',
		name:'login',
		component: Login,
		meta: {
			title:'Login | Register',

		}
	},
	{
		path:'/welcome',
		name: 'welcome',
		component: Welcome,
		meta : {
			title: 'Home page | You are in',
			requiresAuth: true
		}
	},
	{
		path:'/exam/:examId',
		name: 'exam',
		component: Exam,
		meta : {
			title: 'Exam | content',
			requiresAuth:true,
		}
	},
	{
		path:'/logout',
		name: 'logout',
		redirect: {
			name: 'login'
		},
	},
	{
		path:'/profile',
		name: 'profile',
		component: Profile,
		meta: {
			title: 'Profile | User`s Page'
		}

	},
	{
		path:'/edit/:examId',
		name: 'editExam',
		component: Edit,
		meta : {
			title: 'Edit',
			requiresAuth: true
		}	

	}],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if (to.matched.some((record) => record.meta.requiresAuth)) {  	
    Promise.all([UserService.fetchAuth()])
      .then(next)
      .catch((error)=>{        
        return;        
      })   

  } else{
    next();
  }
});

export default router;

