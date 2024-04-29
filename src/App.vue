<script>
import AppFooter from './components/AppFooter.vue';

export default {
    data() {
        return { 
            
        }
    },
    components: {
        AppFooter,
    },
    
}
</script>

<template>
    <router-view></router-view>
    <footer>
        <AppFooter/>
    </footer>
</template>

<style lang="scss">
    @import "bootstrap/scss/bootstrap";

    *{
        font-family: "Poppins", sans-serif;
        font-weight: 500;
        font-style: normal;
        ::-webkit-scrollbar {
            width: 8px;
        }
        
        ::-webkit-scrollbar-track {
            background-color: #cccccc00;

        }
        
        ::-webkit-scrollbar-thumb {
            background-color: #00000083;
            border-radius: 40px;
        }

    }


</style>
