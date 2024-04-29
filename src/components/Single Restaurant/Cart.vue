<script>
//import Axios from 'axios';
import { store } from "../../store.js";

export default {
    data() {
        return {
            store,
        };
    },
    methods: {
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
};
</script>

<template>
    <div>
        <div class="cart">
            <div class="dish-list">
                <div
                    v-for="(singleDish, i) in store.selectedDishes"
                    class="dish"
                >
                    <div class="left">
                        <h3>
                            {{ singleDish.name }}
                        </h3>
                    </div>

                    <div class="right">
                        <div class="quantity">
                            <button
                                @click="removeQuantity(singleDish)"
                                class="plus"
                            >
                                -
                            </button>
                            <span v-if="singleDish.quantity">
                                {{ singleDish.quantity }}
                            </span>
                            <button
                                @click="addQuantity(singleDish)"
                                class="minus"
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <span
                class="no-dish-cart"
                v-if="this.store.selectedDishes.length == 0"
            >
                Non hai nessun piatto nel carrello
            </span>

            <span
                @click="$emit('clear')"
                class="trash"
                v-if="this.store.selectedDishes.length > 0"
            >
                <i class="fa-solid fa-trash"></i>
            </span>

            <div class="final-price">
                <div v-if="this.store.selectedDishes.length > 0">
                    {{ totalPrice + "€" }}
                </div>
            </div>
        </div>

        <button v-if="store.selectedDishes.length > 0">
            <router-link :to="{ name: 'order' }"> Esegui checkout </router-link>
        </button>
    </div>
</template>

<style lang="scss" scoped>
div {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 25%;
    .cart {
        min-height: 200px;
        max-height: calc(100vh - 245px);
        margin-bottom: 32px;
        width: 100%;
        border-radius: 40px;
        padding: 0 20px;
        -webkit-box-shadow: 0px 22px 54px -11px rgba(0, 0, 0, 0.56);
        -moz-box-shadow: 0px 22px 54px -11px rgba(0, 0, 0, 0.56);
        box-shadow: 0px 22px 54px -11px rgba(0, 0, 0, 0.56);
        .dish-list {
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            padding: 8px;
            padding-top: 32px;
            .dish {
                width: 100%;
                padding: 12px 24px;
                height: 80px;
                margin-bottom: 24px;
                border-radius: 45px;
                display: flex;
                justify-content: start;
                flex-direction: row;
                background-color: rgba(196, 196, 196, 0.333);
                .left {
                    height: 100%;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: row;
                    justify-content: start;
                    align-items: center;
                    white-space: nowrap;
                    h3 {
                        margin: 0;
                        font-size: 0.9rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }

                .right {
                    height: 100%;
                    width: 25%;
                    .quantity {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        align-items: center;
                        .plus,
                        .minus {
                            font-size: 1.5rem;
                            padding: 0;
                            width: 20px;
                            height: 20px;
                            background-color: transparent;
                            line-height: 20px;
                            color: black;
                        }

                        span {
                            font-size: 1.5rem;
                        }
                    }
                }
            }
        }
        .no-dish-cart {
            color: gray;
        }
        .trash {
            font-size: 0.9rem;
            color: gray;
            cursor: pointer;
        }
        .final-price {
            padding: 16px;
            height: auto;
            width: 100%;
        }
    }

    button {
        border-radius: 10px;
        background: #3498db;
        color: white;
        border: none;
        width: 100%;
        height: 60px;
        > * {
            text-decoration: none;
            color: white;
        }
    }
}

@media only screen and (max-width: 993px) {
    div {
        display: none;
    }
}

@media only screen and (max-width: 768px) {
    div {
        display: none;
    }
}


</style>
