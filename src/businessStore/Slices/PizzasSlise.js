import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzasStatus',
    async (param,thunkApi) => {
        const {sortBy, order, category, search, currentPage} = param
        const {data} = await axios.get(
            `https://6347d25cdb76843976b2f2e4.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        )
        return  data;

    })


const initialState = {
    items: [],
    status: "loading"
};


const pizzasSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        pizzasSetItems(state, action) {
            state.items = action.payload
        }
    },
    extraReducers: {
        [fetchPizzas.pending](state) {
            state.status = "loading";
            state.items = [];

        },
        [fetchPizzas.fulfilled](state, action) {
            state.items = action.payload;
            state.status = "success"
        },
        [fetchPizzas.rejected](state, action) {
            state.status = "error";
            state.items = [];
        }
    },
});


export const {pizzasSetItems} = pizzasSlice.actions;

export const selectPizzaData = (state) => state.pizzas.items;

export default pizzasSlice.reducer;