<script>
    import Axios from 'axios';
    import InputHome from './InputHome.vue';
    import TypologiesCarousell from './TypologiesCarousell.vue';
    import { store } from '../../store.js';

    export default {
        data() {
            return {

                JumbotronCounter: 0,
                store,
                carousell: [
                    'burger.jpg',
                    'pizza.jpg',
                    'salad.jpg',
                    'soup.jpg',
                    'taco.jpg',
                ], 
                page: 1,
                lastPage: 1,
            }
        },
        methods:{

            setPage(indexPage){
                this.page = indexPage;
                this.getRestaurant(this.page);
            },

            nextPage() {
                if (this.page < this.lastPage){
                    this.page++;
                    this.getRestaurant(this.page);
                }
            },

            prevPage(){
                if (this.page > 1) {
                    this.page--;
                    this.getRestaurant(this.page);
                }
            },
            
            getRestaurant(page){
                Axios.get("http://127.0.0.1:8000/api/restaurant",{
                    params: {
                        page: page,
                        slug: this.inputHomeWithoutSpaces,
                        typologies: this.store.selectedTypology,
                    }
                })
                .then((res) => {
                    console.log(res)
                    this.store.allRestaurants = res.data.results.data;

                    // mi imposta la mia page come la current page data in risposta dall'API
                    this.page = res.data.results.current_page;

                    // mi imposta la mia ultima pagina come la last page data in risposta dall'API
                    this.lastPage = res.data.results.last_page;
                });

            },

            getImagePath: function (imgPath) {
                return new URL(imgPath, import.meta.url).href;
            },

            autoPlay(){
                setInterval(() => {
                    if(this.JumbotronCounter < this.carousell.length - 1){
                
                    this.JumbotronCounter ++;
            
                    }else{
                        this.JumbotronCounter = 0;
                    }
                }, 5000);
            },

            getTypologies() {

                Axios.get('http://127.0.0.1:8000/api/typology')
                .then(res => {
                    this.store.typologies = res.data.results;

                });
            },

            getFromLocalStorage() {
                if (localStorage.getItem("cart")) {
                    const cart = JSON.parse(localStorage.getItem("cart"));

                    for (let i = 0; i < cart.length; i++) {
                        if (cart[i].restaurant == this.currentSingleRestaurant) {
                            this.store.selectedDishes = cart;
                        }
                    }
                }
            },

        },
        components:{
            InputHome,
            TypologiesCarousell
        },
        created(){
            this.autoPlay();
            this.getTypologies();
            this.getRestaurant(this.page);
            this.getFromLocalStorage();
        },
        computed: {
            inputHomeWithoutSpaces: function() {
                return this.store.InputHome.replace(/\s/g, "-");
            }
        },
    }
    </script>

<template>
    <section class="jumbo-tron">
        <div class="carousell">

            <div class="color-layer">
                <InputHome @search="getRestaurant()"/>
                <TypologiesCarousell @search="getRestaurant()"/>
            </div>

            <img :src="getImagePath('../../assets/img/food-home-carousell/' + carousell[JumbotronCounter])" alt="">
            
        </div>
    </section>
    <section class="bottom-main">

        <div class="restaurant-result">
            <div v-for="(restaurant, i) in this.store.allRestaurants" :key="i" class="mycardcontainer">
                <router-link :to="{ name: 'restaurant', params: { slug: restaurant.slug } }">
                    <div class="myrestaurantcard">
                        <div class="myrestaurantimg">
                            <div class="color-layer">
                            </div>
                            <img v-if="restaurant.img != null" :src="'http://127.0.0.1:8000/storage/images/' + restaurant.img" :alt="restaurant.company_name">
                            <img
                                v-else
                                src="..\..\assets\img\no-img-dish2.png"
                                alt=""
                            />
                        </div>
                        <div class="myrestaurantcardbody">
                            <h2 class="text-h2">
                                {{ restaurant.company_name }}
                            </h2>
                            <span><i class="fa-solid fa-location-dot"></i> {{restaurant.address}}</span>
                        </div>
                    </div>
                </router-link>
                <div class="typology-tag">
                    <span v-for="(typology, i) in restaurant.typologies">{{ typology.name }}</span>
                </div>
                <!-- <div>
                    <span><i class="fa-solid fa-location-dot"></i> {{restaurant.address}}</span>
                </div> -->
            </div>

            <!-- 
                    Se sto mostrando i risultati ottenuti dalla ricerca effettuata 
                    attraverso il filtraggio della tipologia dei ristoranti e 
                    l'array contenente i risultati è vuoto, mostro il seguente messaggio...
             -->
            <div class="no-restaurants-found" v-if="store.allRestaurants.length <= 0">
                <h3>
                    Nessun ristorante trovato
                </h3>
            </div>

            <div class="buttons-container" v-if=" lastPage > 1">
                <button :class="{
                    'hidden' : page == 1
                }" @click="prevPage()">
                    <
                </button>

                <button @click="setPage(i+1)" v-for="(elem, i) in this.lastPage" :class="{
                    'enable' : page == i+1
                }">
                    {{ i+1 }}
                </button>

                <button @click="nextPage()" :class="{
                    'hidden' : page == lastPage
                }">
                    >
                </button>
            </div>

        </div>
        
        <div class="bg">
            <div class="my-container">
                <div class="row">
                    <div class="col-6">
                        <img src="../../assets/img/DESKTOP-E-CELL.png" alt="">
                    </div>

                    <div class="col-6">
                        <h3>
                            Scarica l'app e segui il tuo ordine tramite ogni tuo dispositivo
                        </h3>

                        <p>
                            I piatti e i prodotti che ami, consegnati in pochissimo tempo. Vedrai quando il rider ha ritirato l'ordine, che potrai seguire passo passo, e riceverai una notifica quando sarà quasi da te.
                        </p>

                        <div class="buttons-container">
                            
                            <div class="single-button">
                                <a href="#nogo">
                                    <img src="../../assets/img/apple-store-badge.png" alt="">
                                </a>
                            </div>

                            <div class="single-button">
                                <a href="#nogo">
                                    <img src="../../assets/img/google-play-badge.png" alt="">
                                </a>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/Home/home-main.scss' as *;
</style>
