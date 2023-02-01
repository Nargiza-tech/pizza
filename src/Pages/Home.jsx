import React from 'react';
import Cotigories from "../Cotigories/Cotigories";
import Sort, {sortList} from "../Sort/Sort";
import Skeleton from "../PizzaBlock/Skeleton";
import PizzaBlock from "../PizzaBlock/PizzaBlock";
import ReactPaginate from 'react-paginate';
import Pagination from "../Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";

import {selectFilter, setCategoryId, setFilter, setPageCount, setSort} from "../Redux/Slices/FilterSlice";
import axios from "axios";
import Categories from "../Cotigories/Cotigories.jsx";
import qs from 'qs';
import {useNavigate} from "react-router";
import {fetchPizzas, selectPizzaData} from "../Redux/Slices/PizzasSlise";

const Home = () => {

    const navigate = useNavigate()
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false);




    // const [categoryId, setCategoryId] = React.useState(0);
    const {categoryId, sort, currentPage, searchValue} = useSelector(selectFilter);

    const pizzaItems = useSelector(selectPizzaData);
    const status = useSelector((state) => state.pizzas.status);

    const dispatch = useDispatch();

    // const [currentPage, setCurrentPage] = React.useState(1);

    // const [sortType, setSortType] = React.useState({
    //     name: "Популярносьти",
    //     sortProperty: "rating"
    //
    // });

    const onChangeCategory = (id) => {

        dispatch(setCategoryId(id));
    }


    // ******************Статичный поиск******************
    // const pizzas =    pizzaItems.filter((obj) => {
    //     if(obj.title.toLowerCase().includes(searchValue.toLowerCase())){
    //         return true;
    //     }
    //     return false;
    // }).map((pizza) => <PizzaBlock {...pizza} key={pizza.id}/>);
    // const skeletons =   [...new Array(6)].map((_, index) => <Skeleton key={index}/>)

    // ********************Филтрация*******************


    const onChangePage = (number) => {
        dispatch(setPageCount(number))
    }


    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            console.log(params)
            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty);

            dispatch(
                setFilter({...params, sort})
            );
            isSearch.current = true
        }
    }, [])

    const netPizzas = async () => {

        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sort.sortProperty.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

            dispatch(fetchPizzas({sortBy, order, category, search, currentPage}))


        window.scrollTo(0, 0)

    }


    React.useEffect(() => {

        if (!isSearch.current) {
            netPizzas()
        }

        isSearch.current = false
        window.scrollTo(0, 0)

    }, [categoryId, sort.sortProperty, searchValue, currentPage]);


    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            });

            navigate(`?${queryString}`)
        }
        isMounted.current = true

    }, [categoryId, sort.sortProperty, currentPage])


    const pizzas = pizzaItems.map((pizza) => <PizzaBlock {...pizza} key={pizza.id}/>);
    const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index}/>)


    return (
        <>
            <div className="container">

                <div className="con tent__top">
                    <Categories categoryId={categoryId} onChangeCategory={onChangeCategory}/>
                    <Sort/>
                </div>


                <h2 className="content__title">Все пиццы</h2>

                {status === 'error' ? (
                    <div className="content__error-info">
                        <h2>Произошла ошибка 😕</h2>
                        <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
                    </div>
                ) : (
                    <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
                )}
                <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
            </div>
        </>
    );
};

export default Home;