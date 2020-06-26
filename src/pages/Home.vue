<template>
<section class="hero is-primary is-fullheight">
  <!-- Hero content: will be in the middle -->
  <div class="hero-body">
    <div class="container has-text-centered">
      <h1 class="title">
        Welcome to Exam

      </h1>
      <h2 class="subtitle">
         <router-link to="login" class="button is-primary is-inverted is-medium is-outlined">
               
            <span>Login</span>
          </router-link>
        
      </h2>
    </div>
  </div> 
</section>
</template>

<script>
  export default {
    name: 'Home',   

};
</script>