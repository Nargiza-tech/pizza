import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './Slices/FilterSlice';
import cartSlice from './Slices/CartSlice';
import pizzasSlice from './Slices/PizzasSlise'

export const store = configureStore({
    reducer: {
        filter: filterSlice,
        cart: cartSlice,
        pizzas: pizzasSlice
    }
})

console.log(store)