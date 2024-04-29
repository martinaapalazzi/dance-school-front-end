<script>
    import HomeHeader from "../components/Home/HomeHeader.vue";
    import AppSingleRestaurantMain from '../components/Single Restaurant/AppSingleRestaurantMain.vue';
    export default {
        data() {
            return { 
                
            }
        },
        components: {
            HomeHeader,
            AppSingleRestaurantMain
        },
        methods: {
            scrollToTop(){
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            },
        },
        mounted(){
            this.scrollToTop();
        }
    }
    </script>

<template>
    <header>
        <HomeHeader/>
    </header>
    <main>
        <AppSingleRestaurantMain/>
    </main>
</template>

<style lang="scss" scoped>
   
</style>