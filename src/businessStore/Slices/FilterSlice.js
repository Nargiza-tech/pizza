const {createSlice} = require("@reduxjs/toolkit");



const initialState = {
    categoryId: 0,
    currentPage: 1,
    searchValue: '',
    sort:{
        name: "Популярносьти",
        sortProperty: "rating"
    }
};



const filterSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setCategoryId(state, action) {
            console.log(action);
            state.categoryId = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },
        setPageCount(state, action) {
            state.currentPage = action.payload;
        },
        setFilter(state, action){
            state.currentPage = Number(action.payload.currentPage)
            state.categoryId = Number(action.payload.categoryId)
            state.sort = action.payload.sort

        }
    }
});


export const selectSort = (state) => state.filter.sort;
export const selectFilter = (state) => state.filter;
export  const {setCategoryId, setSort, setPageCount, setFilter, setSearchValue} = filterSlice.actions;


export default filterSlice.reducer;