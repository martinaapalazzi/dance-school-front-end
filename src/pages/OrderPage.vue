<script>
    import HomeHeader from '../components/Home/HomeHeader.vue';
    import OrderForm from '../components/OrderForm/OrderForm.vue';

    export default {
        data() {
            return { 
                
            }
        },
        components: {
            HomeHeader,
            OrderForm

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
        <OrderForm/>
    </main>
    
</template>

<style lang="scss" scoped>
   
</style>
