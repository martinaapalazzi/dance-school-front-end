<script>
import Axios from "axios";
import Cart from "./Cart.vue";
import { store } from "../../store.js";

export default {
    data() {
        return {
            store,
            currentSingleRestaurant: null,
            modal: false,
        };
    },
    components: {
        Cart,
    },
    methods: {
        clearCart() {
            this.store.selectedDishes = [];
            this.saveCartToLocalStorage();
            setTimeout(() => {
                this.modal = false;
            }, 1000);
        },

        closeModal() {
            this.modal = false;
        },

        /*
                Al mounted del componente eseguo una chiamata API per recuperare
                il ristorante interessato, richiamando lo slug, presente all'interno della rotta
            */
        getSingleRestaurant() {
            Axios.get(
                "http://127.0.0.1:8000/api/restaurant/" +
                    this.$route.params.slug
            ).then((response) => {
                this.currentSingleRestaurant = response.data.results;
            });
        },

        /*
                Funzione che restituisce una variabile con valore:
                  - 'true' se nel carrello è già presente un piatto con lo stesso
                    nome di quello che si sta provando ad aggiungere;

                  - 'false' se non è presente nessun piatto con quel nome;
            */
        isDishInCart(dish) {
            let dishFound = false;
            this.store.selectedDishes.forEach((selectedDish) => {
                if (selectedDish.name === dish.name) {
                    dishFound = true;
                }
            });
            return dishFound;
        },

        /*
                Funzione che inserisce un piatto all'array selectedDishes in store,
                secondo alcuni controlli:

                    - Se l'array contiene già almeno un elemento e quest'ultimo fà
                      parte dello stesso ristorante del piatto che si sta provando ad inserire
                    
                    - Se non è già presente un piatto con lo stesso nome,
                      nel caso fosse presente lo rimuovo dall'array selectedDishes

                In fine reimposto il localStorage con l'array selectedDishes *
            */
        selectDishes(dish) {
            if (this.isDishInCart(dish)) {
                const indexToRemove = this.store.selectedDishes.findIndex(
                    (selectedDish) => selectedDish.name === dish.name
                );
                this.store.selectedDishes.splice(indexToRemove, 1);
            } else {
                // Verifica se ci sono piatti nel carrello
                if (this.store.selectedDishes.length > 0) {
                    if (
                        this.store.selectedDishes[0].restaurant_id !==
                        dish.restaurant_id
                    ) {
                        this.modal = true;
                        return;
                    }
                }

                dish.quantity = 1;
                this.store.selectedDishes.push(dish);
            }
            this.saveCartToLocalStorage();
        },

        saveCartToLocalStorage() {
            // *
            localStorage.setItem(
                "cart",
                JSON.stringify(this.store.selectedDishes)
            );
        },

        /*
                Al mounted del componente assegno all'array dello store selectedDishes,
                il valore del localStorage, secondo alcuni controlli:
                    - Se esiste la struttura dati 'cart' all'interno del localStorage,
                      allora lo assegno.
                    - Se i piatti all'interno della struttura 'cart' fanno parte del ristorante
                      dal quale si sta provando ad aggiungere piatti. 
            */
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

        descriptionVisible(index) {
            const descriptionClass = "description_" + index;
            const descriptionElement = document.querySelector(
                "." + descriptionClass
            );
            if (descriptionElement) {
                descriptionElement.classList.remove("d-none");
            }
        },

        hideDescription(index) {
            const descriptionClass = ".description_" + index;
            const descriptionElement = document.querySelector(descriptionClass);
            if (descriptionElement) {
                descriptionElement.classList.add("d-none");
            }
        },
    },
    mounted() {
        this.getFromLocalStorage();
        this.getSingleRestaurant();
    },
};
</script>

<template>
        <section>
            <div
                class="single-restaurant"
                v-if="
                    currentSingleRestaurant
                "
            >
                <div v-if="modal == true">
                    <div class="warning-modal">
                        <button @click="closeModal()" class="close">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                        <span>
                            Puoi ordinare solo da un ristorante alla volta.
                        </span>
                        <button @click="clearCart()" class="clean">
                            Svuota il carrello
                        </button>
                    </div>
                </div>

                <div class="restaurant-img">
                    <img
                        v-if="currentSingleRestaurant.img != null"
                        :src="
                            'http://127.0.0.1:8000/storage/images/' +
                            currentSingleRestaurant.img
                        "
                        :alt="currentSingleRestaurant.company_name"
                    />
                    <img
                        v-else
                        src="..\..\assets\img\no-img-dish2.png"
                        alt=""
                    />
                    <div class="img-overlay"></div>
                </div>
                <div class="info-container">
                    <h2 class="company-name">
                        {{ currentSingleRestaurant.company_name }}
                    </h2>
                </div>
            </div>

            <section class="main-page">
                <div class="menu-container">
                    <div
                        class="d-flex justify-content-between align-items-center p-4"
                    >
                        <div
                            v-if="
                                currentSingleRestaurant &&
                                currentSingleRestaurant.address != null
                            "
                            class="restaurant-info"
                        >
                            <span
                                ><i class="fa-solid fa-location-dot"></i
                            ></span>
                            <strong>{{
                                currentSingleRestaurant.address
                            }}</strong>
                        </div>
                        <div class="homebadge">
                            <router-link
                                :to="{ name: 'home' }"
                                class="text-decoration-none"
                            >
                                <i class="fa-solid fa-house"></i>
                            </router-link>
                        </div>
                    </div>

                    <div class="mycontainerinoverflow">
                        <div class="dish-container">
                            <div
                                class="dish"
                                v-for="(
                                    dish, i
                                ) in currentSingleRestaurant.dishes"
                                v-if="currentSingleRestaurant != null"
                            >
                                <button
                                    class="info"
                                    @mouseenter="descriptionVisible(i)"
                                    @mouseleave="hideDescription(i)"
                                >
                                    <i class="fa-solid fa-circle-info"></i>
                                </button>

                                <p
                                    :class="'description_' + i"
                                    class="description d-none"
                                >
                                    {{ dish.description }}
                                </p>

                                <div class="img-container">
                                    <img
                                        v-if="dish.img != null && dish.img != 'images/'"
                                        :src="
                                            'http://127.0.0.1:8000/storage/' +
                                            dish.img
                                        "
                                        :alt="dish.name"
                                    />
                                    <img
                                        v-else
                                        src="..\..\assets\img\no-img-dish2.png"
                                        alt=""
                                    />
                                </div>

                                <div class="card-body">
                                    <h4>
                                        {{ dish.name }}
                                    </h4>

                                    <h6 class="price">
                                        <strong>{{ dish.price + "€" }}</strong>
                                    </h6>

                                    <div class="button-container">
                                        <button
                                            @click="selectDishes(dish)"
                                            :class="{
                                                trash: isDishInCart(dish),
                                            }"
                                             v-if="dish.visible == 1"
                                        >
                                            <span v-if="!isDishInCart(dish)">
                                                <i class="fa-solid fa-plus"></i>
                                            </span>

                                            <span v-else>
                                                Rimuovi dal carrello
                                            </span>
                                        </button>

                                        <span v-else>
                                            Non disponibile
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Cart @clear="clearCart()" />
            </section>
        </section>
</template>

<style lang="scss" scoped>
.single-restaurant {
    width: 100%;
    height: 400px;
    position: relative;
    overflow: hidden;
    .warning-modal {
        margin: 0 auto;
        position: fixed;
        top: 15%;
        left: 0;
        right: 0;
        z-index: 100000;
        display: flex;
        flex-direction: column;
        width: 400px;
        min-height: 130px;
        background-color: white;
        border-radius: 25px;
        justify-content: space-between;
        align-items: center;
        padding: 8px 32px 20px 32px;
        -webkit-box-shadow: 0px 22px 54px -11px rgba(0, 0, 0, 0.56);
        -moz-box-shadow: 0px 22px 54px -11px rgba(0, 0, 0, 0.56);
        box-shadow: 0px 22px 54px -11px rgba(0, 0, 0, 0.473);
        button {
            border: none;
            background-color: transparent;
        }
        .close {
            width: 30px;
            align-self: end;
            font-size: 1.3rem;
            color: gray;
            transition: all 0.2s ease-in-out;
            &:hover {
                color: rgb(22, 22, 22);
            }
        }
        span {
            font-size: 1.1rem;
            color: gray;
            margin: 16px 0 24px 0;
            text-align: center;
            font-size: 0.9rem;
        }
        .clean {
            background-color: #3498db;
            width: 60%;
            padding: 8px 16px;
            border-radius: 25px;
            color: white;
            transition: all 0.2s ease-in-out;
            &:hover {
                transform: scale(1.1);
            }
        }
    }

    .restaurant-img {
        width: 100%;
        height: 100%;
        opacity: 0.9;
        filter: blur(2px);
        position: relative;
        background-color: #172127;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
            filter: saturate(0) contrast(1.5) opacity(0.4);
        }
        .img-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 60%;
            background: linear-gradient(
                to top,
                rgb(255, 255, 255),
                transparent
            ); /* Sfumatura verso l'alto */
        }
    }

    .info-container {
        position: absolute;
        width: 100%;
        padding: 32px;
        left: 0;
        bottom: 0px;

        .company-name {
            text-shadow: 2px 2px 4px rgba(46, 46, 46, 0.491);
            color: white;
            font-size: 100px;
        }
    }
}

.main-page {
    display: flex;
    max-width: 1400px;
    margin: 0 auto;
    justify-content: space-between;
    margin-bottom: 100px;
    border-radius: 44px;
    .menu-container {
        border-radius: 40px;
        width: 70%;
        padding: 40px 20px 20px 20px;
        height: 1000px;
        overflow-y: auto;
        -webkit-box-shadow: 0px 22px 54px -11px rgba(0, 0, 0, 0.56);
        -moz-box-shadow: 0px 22px 54px -11px rgba(0, 0, 0, 0.56);
        box-shadow: 0px 22px 54px -11px rgba(0, 0, 0, 0.473);
        .restaurant-info {
            i {
                color: red;
            }
        }

        .homebadge {
            padding: 5px 12px;
            background-color: #3498db;
            color: white;
            border-radius: 20px;
            i {
                color: white;
            }
        }

        .dish-container {
            width: 100%;
            display: flex;
            flex-wrap: wrap;

            .dish {
                width: calc(100% / 3 - 60px);
                margin: 15px 30px;
                height: 370px;
                border-radius: 20px;
                position: relative;
                overflow: hidden;
                .info {
                    position: absolute;
                    top: 4px;
                    right: 4px;
                    z-index: 2;
                    color: white;
                    background-color: transparent;
                    border: none;
                    font-size: 1.3rem;
                }
                .description {
                    position: absolute;
                    top: 50px;
                    bottom: 0;
                    right: 0;
                    left: 0;
                    background: rgb(0, 0, 0);
                    background: linear-gradient(
                        180deg,
                        rgb(0, 0, 0) 0%,
                        rgba(0, 0, 0, 0.591) 48%,
                        rgba(0, 0, 0, 0) 100%
                    );
                    color: white;
                    padding: 16px;
                    margin: 0;
                    z-index: 3;
                }
                .img-container {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    top: 0;
                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        object-position: center;
                    }
                }

                .card-body {
                    position: absolute;
                    height: 100%;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    justify-content: end;
                    padding: 20px;
                    color: white;
                    background: rgb(0, 0, 0);
                    background: linear-gradient(
                        0deg,
                        rgba(0, 0, 0, 1) 0%,
                        rgba(0, 0, 0, 0.471) 48%,
                        rgba(0, 0, 0, 0) 100%
                    );

                    h4 {
                        text-align: center;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }

                    h6 {
                        text-align: center;
                    }

                    .button-container {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        button {
                            border-radius: 25px;
                            border: 0;
                            background-color: #3498db;
                            color: white;
                            width: 50px;
                            height: 50px;
                            overflow: hidden;
                            transition: all 0.3s ease-in-out;
                            &.trash {
                                width: 100%;
                                border-radius: 15px;
                                color: #3498db;
                                background-color: white;
                            }
                            > span {
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                text-align: center;
                            }
                        }
                    }
                }
            }
        }
    }
}

@media only screen and (max-width: 1200px) {
    .main-page {
        display: flex;
        max-width: 1400px;
        margin: 0 auto;
        justify-content: space-between;
        margin-bottom: 100px;
        border-radius: 44px;
        .menu-container {
            border-radius: 40px;
            width: 100%;
            padding: 40px 20px 20px 20px;
            height: 1000px;
            overflow-y: auto;
            -webkit-box-shadow: 0px 22px 54px -11px rgba(0, 0, 0, 0.56);
            -moz-box-shadow: 0px 22px 54px -11px rgba(0, 0, 0, 0.56);
            box-shadow: 0px 22px 54px -11px rgba(0, 0, 0, 0.473);
            .restaurant-info {
                i {
                    color: red;
                }
            }

            .homebadge {
                padding: 5px 12px;
                background-color: #3498db;
                color: white;
                border-radius: 20px;
                i {
                    color: white;
                }
            }

            .dish-container {
                width: 100%;
                display: flex;
                flex-wrap: wrap;

                .dish {
                    width: calc(100% / 2 - 60px);
                    margin: 15px 30px;
                    height: 370px;
                    border-radius: 20px;
                    position: relative;
                    overflow: hidden;
                    .info {
                        position: absolute;
                        top: 4px;
                        right: 4px;
                        z-index: 2;
                        color: white;
                        background-color: transparent;
                        border: none;
                        font-size: 1.3rem;
                    }
                    .description {
                        position: absolute;
                        top: 50px;
                        bottom: 0;
                        right: 0;
                        left: 0;
                        background: rgb(0, 0, 0);
                        background: linear-gradient(
                            180deg,
                            rgb(0, 0, 0) 0%,
                            rgba(0, 0, 0, 0.591) 48%,
                            rgba(0, 0, 0, 0) 100%
                        );
                        color: white;
                        padding: 16px;
                        margin: 0;
                        z-index: 3;
                    }
                    .img-container {
                        position: absolute;
                        bottom: 0;
                        width: 100%;
                        top: 0;
                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            object-position: center;
                        }
                    }

                    .card-body {
                        position: absolute;
                        height: 100%;
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        gap: 8px;
                        justify-content: end;
                        padding: 20px;
                        color: white;
                        background: rgb(0, 0, 0);
                        background: linear-gradient(
                            0deg,
                            rgba(0, 0, 0, 1) 0%,
                            rgba(0, 0, 0, 0.471) 48%,
                            rgba(0, 0, 0, 0) 100%
                        );

                        h4 {
                            text-align: center;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }

                        h6 {
                            text-align: center;
                        }

                        .button-container {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            button {
                                border-radius: 25px;
                                border: 0;
                                background-color: #3498db;
                                color: white;
                                width: 50px;
                                height: 50px;
                                overflow: hidden;
                                transition: all 0.3s ease-in-out;
                                &.trash {
                                    width: 100%;
                                    border-radius: 15px;
                                    color: #3498db;
                                    background-color: white;
                                }
                                > span {
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                    overflow: hidden;
                                    text-align: center;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

@media only screen and (max-width: 768px) {
    .main-page {
        display: flex;
        max-width: 1400px;
        margin: 0 auto;
        justify-content: space-between;
        margin-bottom: 100px;
        border-radius: 44px;
        .menu-container {
            border-radius: 40px;
            width: 100%;
            padding: 40px 20px 20px 20px;
            height: 1000px;
            overflow-y: auto;
            -webkit-box-shadow: 0px 22px 54px -11px rgba(0, 0, 0, 0.56);
            -moz-box-shadow: 0px 22px 54px -11px rgba(0, 0, 0, 0.56);
            box-shadow: 0px 22px 54px -11px rgba(0, 0, 0, 0.473);
            .restaurant-info {
                i {
                    color: red;
                }
            }

            .homebadge {
                padding: 5px 12px;
                background-color: #3498db;
                color: white;
                border-radius: 20px;
                i {
                    color: white;
                }
            }

            .dish-container {
                width: 100%;
                display: flex;
                flex-wrap: wrap;

                .dish {
                    width: calc(100% / 2 - 60px);
                    margin: 15px 30px;
                    height: 370px;
                    border-radius: 20px;
                    position: relative;
                    overflow: hidden;
                    .info {
                        position: absolute;
                        top: 4px;
                        right: 4px;
                        z-index: 2;
                        color: white;
                        background-color: transparent;
                        border: none;
                        font-size: 1.3rem;
                    }
                    .description {
                        position: absolute;
                        top: 50px;
                        bottom: 0;
                        right: 0;
                        left: 0;
                        background: rgb(0, 0, 0);
                        background: linear-gradient(
                            180deg,
                            rgb(0, 0, 0) 0%,
                            rgba(0, 0, 0, 0.591) 48%,
                            rgba(0, 0, 0, 0) 100%
                        );
                        color: white;
                        padding: 16px;
                        margin: 0;
                        z-index: 3;
                    }
                    .img-container {
                        position: absolute;
                        bottom: 0;
                        width: 100%;
                        top: 0;
                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            object-position: center;
                        }
                    }

                    .card-body {
                        position: absolute;
                        height: 100%;
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        gap: 8px;
                        justify-content: end;
                        padding: 20px;
                        color: white;
                        background: rgb(0, 0, 0);
                        background: linear-gradient(
                            0deg,
                            rgba(0, 0, 0, 1) 0%,
                            rgba(0, 0, 0, 0.471) 48%,
                            rgba(0, 0, 0, 0) 100%
                        );

                        h4 {
                            text-align: center;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }

                        h6 {
                            text-align: center;
                        }

                        .button-container {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            button {
                                border-radius: 25px;
                                border: 0;
                                background-color: #3498db;
                                color: white;
                                width: 50px;
                                height: 50px;
                                overflow: hidden;
                                transition: all 0.3s ease-in-out;
                                &.trash {
                                    width: 100%;
                                    border-radius: 15px;
                                    color: #3498db;
                                    background-color: white;
                                }
                                > span {
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                    overflow: hidden;
                                    text-align: center;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

@media only screen and (max-width: 600px) {
    .single-restaurant {
        .info-container {
            .company-name {
                font-size: 75px;
            }
        }
    }
    .main-page {
        display: flex;
        max-width: 1400px;
        margin: 0 auto;
        justify-content: space-between;
        margin-bottom: 100px;
        border-radius: 44px;
        .menu-container {
            border-radius: 40px;
            width: 100%;
            padding: 40px 20px 20px 20px;
            height: 1000px;
            overflow-y: auto;
            -webkit-box-shadow: 0px 22px 54px -11px rgba(0, 0, 0, 0.56);
            -moz-box-shadow: 0px 22px 54px -11px rgba(0, 0, 0, 0.56);
            box-shadow: 0px 22px 54px -11px rgba(0, 0, 0, 0.473);
            .restaurant-info {
                i {
                    color: red;
                }
            }

            .homebadge {
                padding: 5px 12px;
                background-color: #3498db;
                color: white;
                border-radius: 20px;
                i {
                    color: white;
                }
            }

            .dish-container {
                width: 100%;
                display: flex;
                flex-wrap: wrap;

                .dish {
                    width: calc(100%);
                    margin: 15px 30px;
                    height: 370px;
                    border-radius: 20px;
                    position: relative;
                    overflow: hidden;
                    .info {
                        position: absolute;
                        top: 4px;
                        right: 4px;
                        z-index: 2;
                        color: white;
                        background-color: transparent;
                        border: none;
                        font-size: 1.3rem;
                    }
                    .description {
                        position: absolute;
                        top: 50px;
                        bottom: 0;
                        right: 0;
                        left: 0;
                        background: rgb(0, 0, 0);
                        background: linear-gradient(
                            180deg,
                            rgb(0, 0, 0) 0%,
                            rgba(0, 0, 0, 0.591) 48%,
                            rgba(0, 0, 0, 0) 100%
                        );
                        color: white;
                        padding: 16px;
                        margin: 0;
                        z-index: 3;
                    }
                    .img-container {
                        position: absolute;
                        bottom: 0;
                        width: 100%;
                        top: 0;
                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                            object-position: center;
                        }
                    }

                    .card-body {
                        position: absolute;
                        height: 100%;
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        gap: 8px;
                        justify-content: end;
                        padding: 20px;
                        color: white;
                        background: rgb(0, 0, 0);
                        background: linear-gradient(
                            0deg,
                            rgba(0, 0, 0, 1) 0%,
                            rgba(0, 0, 0, 0.471) 48%,
                            rgba(0, 0, 0, 0) 100%
                        );

                        h4 {
                            text-align: center;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }

                        h6 {
                            text-align: center;
                        }

                        .button-container {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            button {
                                border-radius: 25px;
                                border: 0;
                                background-color: #3498db;
                                color: white;
                                width: 50px;
                                height: 50px;
                                overflow: hidden;
                                transition: all 0.3s ease-in-out;
                                &.trash {
                                    width: 100%;
                                    border-radius: 15px;
                                    color: #3498db;
                                    background-color: white;
                                }
                                > span {
                                    white-space: nowrap;
                                    text-overflow: ellipsis;
                                    overflow: hidden;
                                    text-align: center;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>
