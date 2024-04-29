<script>
    import { store } from '../../store.js';

    export default {
        data() {
            return { 
                store
            }
        },
        methods:{

            openCartModal(){
                this.store.modalCart = !this.store.modalCart;

                console.log(this.store.selectedDishes)
            },

            addQuantity(dish) {
                dish["quantity"]++;

                this.saveCartToLocalStorage();
            },

            removeQuantity(dish) {
                if (dish["quantity"] > 1) {
                    dish["quantity"]--;
                } else {
                    const index = this.store.selectedDishes.indexOf(dish);
                    if (index !== -1) {
                        this.store.selectedDishes.splice(index, 1);

                        console.log(
                            "piatti selezionati",
                            this.store.selectedDishes
                        );
                    }
                }

                this.saveCartToLocalStorage();
            },

            saveCartToLocalStorage() {
                localStorage.setItem(
                    "cart",
                    JSON.stringify(this.store.selectedDishes)
                );
            },
        },
        computed:{
            computed: {
                totalPrice() {
                    let totalPrice = 0;

                    this.store.selectedDishes.forEach((dish) => {
                        const quantity = dish.quantity || 1;

                        totalPrice += parseFloat(dish.price) * quantity;
                    });

                    this.store.totalPrice = totalPrice;
                    return totalPrice.toFixed(2);
                },
            },
        }
    }
    </script>

<template>
    <div class="header"> 
        <router-link :to="{ name: 'home' }" class="img-container">
                <img v-if="$route.name == 'home' || $route.name == 'restaurant'" src="..\..\assets\img\logo-header-home-page.png" alt="">
                <img v-else src="..\..\assets\img\logo-restaurant-list-page.png" alt="">
        </router-link>
        
        <nav>


            <button @click="openCartModal()" class="cart"  :class="{
                'd-lg-none' : $route.name == 'restaurant'
            }" v-if="$route.name != 'order'">
                <i class="fa-solid fa-cart-shopping"></i>
                <div v-if="store.selectedDishes.length > 0" class="notify">
                </div>

                <div v-if="this.store.modalCart == true" class="cart-modal">
                    <ul class="dish-container">
                        <li v-for="(dish, i) in store.selectedDishes" class="dish">
                            <div class="left">
                                <span>{{ dish.name }}</span>
                            </div>
                            <div class="right">
                                <button @click.stop="removeQuantity(dish)">
                                    -
                                </button>
                                <span>
                                    {{ dish.quantity }}
                                </span>
                                <button @click.stop="addQuantity(dish)">
                                    +
                                </button>
                            </div>
                        </li>
                    </ul>
                    <span class="no-dish-found" v-if="store.selectedDishes.length == 0">
                        Non hai nessun piatto nel carrello
                    </span>
                    <button v-if="store.selectedDishes.length > 0" class="check-out">
                        <router-link :to="{ name: 'order' }"> Esegui checkout </router-link>
                    </button>
                    
                </div>
            </button>


            <a href="http://127.0.0.1:8000" class="member" target="_blank">
                Accedi come membro
            </a>

            <a href="http://127.0.0.1:8000" class="user" target="_blank">
                <i class="fa-solid fa-user"></i>
            </a>
        </nav>
    </div>
</template>

<style lang="scss" scoped>
    @use '../../assets/scss/Home/home-header.scss' as *;

</style>
