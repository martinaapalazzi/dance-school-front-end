<script>
    import Axios from 'axios';
    import { store } from '../../store.js';


    export default {
        data() {
            return { 
                store,
                carousell: [
                    'burger.jpg',
                    'pizza.jpg',
                    'salad.jpg',
                    'soup.jpg',
                    'taco.jpg',
                ],
            }
        },
        computed: {
            inputHomeWithoutSpaces: function() {
                return this.store.InputHome.replace(/\s/g, "");
            }
        },
        methods:{

            setDinamicPLaceholder(){
                const input = document.getElementById('restaurant_name');
                const restaurantsNameArray = [];

                if(this.store.allRestaurants.length > 0){
                    this.store.allRestaurants.forEach(restaurant => {
                        restaurantsNameArray.push(restaurant.company_name);
    
                        console.log(restaurantsNameArray);
                    });
                    
                    function impostaPlaceholder() {
                        
                        let randomIndex = Math.floor(Math.random() * restaurantsNameArray.length);
                        let randomPlaceholder = restaurantsNameArray[randomIndex];
                        
                        input.placeholder = randomPlaceholder;
                    }
                    
                    setInterval(impostaPlaceholder, 5000);
                }
                console.log(restaurantsNameArray)

            },

            getRestaurantByName() {
                this.$emit('search');
            },

            getImagePath: function (imgPath) {
                return new URL(imgPath, import.meta.url).href;
            },

            navigateToList() {
                
                if (this.inputHomeWithoutSpaces === '') {

                } else {
                    
                    this.$router.push({ name: 'list' });
                }
                
            },

        },
        mounted(){
            this.setDinamicPLaceholder();
        }
    }
    </script>

<template>

    <div class="input">
        <h1>
            Cerca il tuo ristorante ...
        </h1>
        <div class="input-container">
            <input v-model="store.InputHome" id="restaurant_name" type="text" placeholder="Nome Ristorante">
            <button @click="getRestaurantByName()" :class="{
                'disable': inputHomeWithoutSpaces == '',
            }"
            >
                
                <span v-if=" inputHomeWithoutSpaces == ''">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </span>

                <span v-else>
                    Cerca
                </span>
            </button>
        </div>
    </div>
                
</template>

<style lang="scss" scoped>

.input{
                
    width: 25%;
    height: 250px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content:end;

    h1{
        color: white;
        font-weight: 700;
        margin-bottom: 20px;
    }
    .input-container{

        width: 100%;
        background-color: white;
        height: 56px;
        border-radius: 28px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 8px 0 16px;
        overflow: hidden;
        margin-bottom: 24px;
        input{
            width: 80%;
            height: 100%;
            border: none;
            outline: none !important;
            box-shadow: none !important;
        }
        button{
            width: 15%;
            height: 40px;
            border-radius: 19px;
            border: none;
            font-weight: 500;
            background-color: #6aaed7;
            transition: all .3s ease-in-out;
            &.disable{
                width: 40px;
            }
            >*{
                width: 100%;
                color: white;
                text-decoration: none;
            }
            
        }
    }


}
@media only screen and (max-width: 600px) {

    .input{
                
        width: 80%;
        height: 250px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content:end;
    }

}

  
/* Regole CSS per dispositivi con larghezza minima di 600px */
@media only screen and (min-width: 600px) {

    .input{
                
        width: 75%;
        height: 250px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content:end;
    }

}


/* Regole CSS per dispositivi con larghezza minima di 768px */
@media only screen and (min-width: 768px) {

    .input{
                
        width: 70%;
        height: 250px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content:end;
    }

}

/* Regole CSS per dispositivi con larghezza minima di 992px */
@media only screen and (min-width: 992px) {

    .input{
                
        width: 50%;
        height: 250px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content:end;
    }

}

/* Regole CSS per dispositivi con larghezza minima di 1200px */
@media only screen and (min-width: 1200px) {
    .input{
                
        width: 50%;
        height: 250px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content:end;
    }
}

@media only screen and (min-width: 1200px) {

    .input{
                
        width: 30%;
        height: 250px;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content:end;
    }

}
</style>
