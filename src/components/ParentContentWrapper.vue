<template>
	<v-card class="overflow-hidden">	
<!-- dialog for profile form -->
	<v-dialog
		v-model="dialogProfile"
	>		
		<ProfileForm
			v-bind:profile="profile"
			@closeProfile = "dialogDown('Profile')"
			@saveProfile = "saveProfile"
		></ProfileForm>
	</v-dialog>

<!-- dialog for Avatar image -->
	<v-dialog
		v-model="dialogAvatar"
		max-width="400"
	>		
		<AvatarForm
			@uploadAvatar = "uploadAvatar"
			@closeAvatar = "dialogDown('Avatar')"
		></AvatarForm>
	</v-dialog>

<!-- dialog asking to fill in Profile -->

	 <v-overlay          
         v-model="dialogFirstTime"
        >
		<v-card light>
			<v-card-text>
			Fill up your profile details in the main menu
			<v-icon>mdi-account-details</v-icon>
			</v-card-text>
			<v-card-actions>
	          <v-spacer></v-spacer>         
	          <v-btn
	            color="green darken-1"
	            text
	            @click="dialogFirstTime = false"
	          >Ok, got It!
	          </v-btn>
	        </v-card-actions>
		</v-card>         

    </v-overlay>

   <!-- Logout dialog-->
   <v-dialog 
   	max-width="400"
   	v-model="dialogLogout"
   >
   <v-card light>
			<v-card-title >
			Are you sure you want to logout
			<v-icon>mdi-logout</v-icon>
			</v-card-title>
			<v-card-actions>
	          <v-spacer></v-spacer>         
	          <v-btn
	            color="green darken-1"
	            text
	            @click.stop="logout"
	          >Sure
	          </v-btn>
	          <v-btn
	            color="green darken-1"
	            text
	            @click.stop="dialogDown('Logout')"
	          >
	            Cancel
	          </v-btn>


	        </v-card-actions>
		</v-card>
	</v-dialog>     	

 	<!-- navigation bar for Tabs  -->
		<v-app-bar				  
	      color="#00897B"
	      dark
	      shrink-on-scroll
	      prominent      
	      fade-img-on-scroll
	      scroll-target="#scrolling-techniques-3"
	      src="assets/images/mfu2.jpg"
		  elevate-on-scroll		      
		>
		      <template v-slot:img="{ props }">
		        <v-img
		          v-bind="props"
		          gradient="to top right, rgba(19,84,122,.1), rgba(128,208,199,.3)"
		        ></v-img>
		      </template>


		      <v-app-bar-nav-icon
				v-on:click="drawer=!drawer"
		      ></v-app-bar-nav-icon>

		      <v-toolbar-title>Exam Center </v-toolbar-title>

		      <v-spacer></v-spacer>

		      
		      <template v-slot:extension>
		        <v-tabs 
		        	align-with-title
					
		        >
		         <v-tab 
		          	v-for="(tab, index) in user.header.tabs"
		          	:key="index"
		          	v-on:click="changeComponent(tab.tabComponent,index)"
		          	
		          	v-text="tab.tabText"
		          >Tab 1</v-tab>		        
		        
		        </v-tabs>
		      </template>

    	</v-app-bar>

<!-- drawer for profile    -->
	 
	<v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list-item
		@click="dialogUp('Avatar')"
		link

      >
        <v-list-item-avatar

        >
        <img v-bind:src="avatar">
          <!-- <v-img v-bind:src="avatar"></v-img> -->
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{profile.first_name}} {{profile.last_name}}</v-list-item-title>
          <v-list-item-title>{{profile.email}}</v-list-item-title>
           <v-list-item-subtitle>Logged In</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>

        <v-list-item
          v-for="item in items"
          :key="item.title"
          @click.stop="dialogUp(item.title)"
          link
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

<!-- tab content component -->
	<v-sheet
      id="scrolling-techniques-3"
      class="overflow-y-auto"
      max-height="600"
    >    
		<Component
			:is="componentLoader"
			:user="user"
		></Component>

    </v-sheet>
	</v-card>		
</template>

<script>	
import ProfileForm from './forms/ProfileForm';
import AvatarForm from './forms/AvatarForm';
	export default {
		name: 'ParentContentWrapper',
		inject: ['UserService'],
		components: {
			ProfileForm,
			AvatarForm,
		},
		data: function () {
			return {
				profile: {},

				//dialog popups
				dialogFirstTime:false,
				dialogAvatar:false,	
				dialogProfile:false,
				dialogLogout:false,

				formData: new FormData(),
				//tabs for components
				currentTab: 0,
				drawer: false,
				//profile items
				items: [
		          { title: 'Profile', icon: 'mdi-account', link:'/profile'},
		          { title: 'Logout', icon: 'mdi-logout', link:'/logout' },
		        ],

			}
		},
		props: {
			user: {
				type: Object,
			}
		},
		methods: {
			dialogUp(element){
				//console.log('dialogUp :'+element);
				this.$data['dialog'+element] = true;				
			},
			dialogDown(element){
				//console.log('dialogDown :'+element);
				this.$data['dialog'+element] = false;
			},
			changeComponent(componentName, key){				
				this.currentTab = key;
			},
			uploadAvatar(chosenImage){
				// console.log(chosenImage);
				
				this.formData.append("avatar",chosenImage);								
				
				this.UserService.uploadAvatar(
					this.formData,
					// this.user.details.user_id
				)
				.then(()=>{
					this.profile.avatar = this.UserService.retrieveAvatar();
					//alert('avatar updated');			
				})
				.catch(
					(error)=>console.log(error)
				);
				this.dialogDown('Avatar');			
				
			},	
			saveProfile(){
				const profile = this.profile;								
				
				this.UserService.saveProfile(
					profile
					// this.user.details.user_id
				)
				.then(()=>{
					//alert('profile updated!');					
				})
				.catch(
					(error)=>console.log(error)
				);
				this.dialogDown('Profile');
			},
			logout(){
				this.UserService.logout()
				.then(()=>location.replace("/login"));
			},
		
					
		},
		computed: {
			componentLoader(){
				const tab = this.user.header.tabs[this.currentTab];
				const name = tab.tabComponent;
				return () => import('../components/'+name);
			},
			avatar(){
				const avatar = this.profile.avatar || "default.jpeg";
				return "/uploads/images/"+avatar;
			}			
		},

		created(){
			Promise.all([this.UserService.fetchProfile()])
				.then(()=>{
					this.profile = this.UserService.retrieveProfile();

				})
				.catch((error)=>{
					if(error.status==404){
						this.dialogFirstTime = true;						
					} 
					else console.log(error);
						
				});
		},
	};

</script>
<style>
	.box {
		margin-top: 30px;
	}

</style>