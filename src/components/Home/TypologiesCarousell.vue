<script>
import { store } from "../../store.js";

export default {
    data() {
        return {
            store,
        };
    },
    methods: {
        selectTypology(typology, i) {
            if (!this.store.selectedTypology.includes(typology)) {
                this.store.selectedTypology.push(typology);
            } else {
                const indexToRemove =
                    this.store.selectedTypology.indexOf(typology);
                if (indexToRemove !== -1) {
                    
                    this.store.selectedTypology.splice(indexToRemove, 1); // Rimuovi l'elemento dall'array
                }
            }

            this.getRestaurantByTypology();
        },

        getRestaurantByTypology() {
            this.$emit('search');
        },
    },
};
</script>

<template>
    <div class="container-tipology">
        <span
            class="single-typology"
            @click="selectTypology(elem.name, i)"
            v-for="(elem, i) in store.typologies"
            :key="i"
            :class="{
                selected: store.selectedTypology.includes(elem.name),
            }"
        >
            {{ elem.name }}
        </span>
    </div>
</template>

<style lang="scss" scoped>
@media only screen and (max-width: 767px) {
    .container-tipology {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        width: 350px;
        padding: 16px;
        border: 1px solid white;
        border-radius: 20px;
        background-color: #121f27a4;

        .single-typology {
            text-align: center;
            display: block;
            color: white;
            margin: 10px 4px;
            border: 1px solid white;
            border-radius: 21px;
            padding: 8px 10px;
            cursor: pointer;
            &.selected {
                background-color: white;
                color: rgb(20, 20, 36);
            }
        }
    }
}

/* Regole CSS per dispositivi con larghezza minima di 600px */
// @media only screen and (min-width: 600px) {

//     .container-tipology{

//         display: flex;
//         flex-wrap: wrap;
//         justify-content: center;
//         align-items: center;
//         width: 400px;
//         padding: 16px;
//         border: 1px solid white;
//         border-radius: 20px;
//         background-color: #121f27a4;

//         .single-typology{
//             text-align: center;
//             display: block;
//             color: white;
//             margin: 10px 4px;
//             border: 1px solid white;
//             border-radius: 21px;
//             padding: 8px 10px;
//             cursor: pointer;
//             &.selected{

//                 background-color: white;
//                 color: rgb(20, 20, 36);
//             }
//         }
//     }

// }

/* Regole CSS per dispositivi con larghezza minima di 768px */
@media only screen and (min-width: 768px) {
    .container-tipology {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        width: 85%;
        padding: 16px;
        // border: 1px solid white;
        // border-radius: 20px;
        // background-color: #121f27a4;
        .single-typology {
            text-align: center;
            display: block;
            color: white;
            margin: 10px 4px;
            border: 1px solid white;
            border-radius: 21px;
            padding: 8px 10px;
            cursor: pointer;
            &.selected {
                background-color: white;
                color: rgb(20, 20, 36);
            }
        }
    }
}

/* Regole CSS per dispositivi con larghezza minima di 992px */
@media only screen and (min-width: 992px) {
    .container-tipology {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        width: 80%;
        padding: 16px;
        // border: 1px solid white;
        // border-radius: 20px;
        // background-color: #121f27a4;
        .single-typology {
            text-align: center;
            display: block;
            color: white;
            margin: 16px 4px;
            border: 1px solid white;
            border-radius: 21px;
            padding: 8px 16px;
            cursor: pointer;
            &.selected {
                background-color: white;
                color: rgb(20, 20, 36);
            }
        }
    }
}

/* Regole CSS per dispositivi con larghezza minima di 1200px */
@media only screen and (min-width: 1200px) {
    .container-tipology {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        width: 70%;
        padding: 16px;
        // border: 1px solid white;
        // border-radius: 20px;
        // background-color: #121f27a4;
        .single-typology {
            text-align: center;
            display: block;
            color: white;
            margin: 16px 6px;
            border: 1px solid white;
            border-radius: 21px;
            padding: 8px 16px;
            cursor: pointer;
            &.selected {
                background-color: white;
                color: rgb(20, 20, 36);
            }
        }
    }
}

@media only screen and (min-width: 1400px) {
    .container-tipology {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        width: 50%;
        padding: 16px;
        // border: 1px solid white;
        // border-radius: 20px;
        // background-color: #121f27a4;
        .single-typology {
            text-align: center;
            display: block;
            color: white;
            margin: 16px 8px;
            border: 1px solid white;
            border-radius: 21px;
            padding: 8px 16px;
            cursor: pointer;
            &.selected {
                background-color: white;
                color: rgb(20, 20, 36);
            }
        }
    }
}
</style>
