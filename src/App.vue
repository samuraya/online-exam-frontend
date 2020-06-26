<template>
    <v-app>        
        <router-view></router-view>
        <div class="pageloader" v-bind:class="{'is-active': isActive}"><span class="title">a second...</span></div>
    </v-app>
</template>;
<script>
    export default {
        data(){
            return {            
                 isActive: false,             
            }
        },
        methods: {            
            pageLoader(page){
                this.isActive = true;
                window.setTimeout(()=>{
                   this.isActive = false;
                   this.$router.push(page);                                              
                }, 500);
            }
        },       
        created(){
           this.$eventBus.$on('pageLoader',this.pageLoader);
          
        },
       
    };
</script>
<style>
    
    .container {
       width: auto;
       
    }

    .flip-enter-active {
        animation: flip-in 0.4s ease-out forwards;
    }

    .flip-leave-active {
        animation: flip-out 0.5s ease-out forwards;
    }

    @keyframes flip-out {
        from {
            transform: rotateY(0deg);
        }
        to {
            transform: rotateY(90deg);
        }
    }

    @keyframes flip-in {
        from {
            transform: rotateY(90deg);
        }
        to {
            transform: rotateY(0deg);
        }
    }
</style>
