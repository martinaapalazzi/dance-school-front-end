import { reactive } from "vue";

export const store = reactive({
    typologies: [],
    dishes: [],
    selectedTypology: [],
    InputHome: '',
    allRestaurants: [],
    selectedDishes: [],
    totalPrice: 0,
    restaurantTypology: [],
    modalCart: false,

});