import React from 'react';
import styles from './Search.module.scss';
import search from '../../src/assets/img/4092559_search_magnifier_mobile ui_zoom_icon.svg'
import close from '../assets/img/close.svg';
import debounce from 'lodash.debounce';
import {useDispatch} from "react-redux";
import {setSearchValue} from "../businessStore/Slices/FilterSlice";


const Search = () => {
    const dispatch = useDispatch();
    const [inputSearchValue, setInputSearch] = React.useState('');
    const inputRef = React.useRef();

    const onClickCLear = () => {
        dispatch(setSearchValue(''));

        inputRef.current.focus()
    }

    // debounce - (задержка) это функция иммено для импута поиска чтобы он не делал при каждом вводе запрос

    const ubdateInputSearchValue =  React.useCallback(
        debounce((str) => {
            console.log('hello');
            dispatch(setSearchValue(str));
        },300), []
    )


    const onChangeInput = (e) => {
        setInputSearch(e.target.value);
        ubdateInputSearchValue(e.target.value)
    }


    return (
        <div className={styles.root}>
            <img className={styles.icon} src={search} alt=""/>
            <input ref={inputRef} value={inputSearchValue} onChange={onChangeInput}
                   className={styles.input} type="text" placeholder="Поис пиццы"/>

            {
                inputSearchValue && (
                    <img onClick={onClickCLear} className={styles.clearIcon} src={close} alt=""/>
                )
            }


        </div>
    );
};

export default Search;