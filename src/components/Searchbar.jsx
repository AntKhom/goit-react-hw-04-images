import React, { useState } from "react";
import { toast } from 'react-toastify';
import css from "../css/searchbar.module.css";

const Searchbar = ({onSubmit}) => {
    // state = {
    //     query:'',
    // }

    const [query, setQuery] = useState('')

    const changeHandler = e => {
        setQuery(e.target.value);
    };

    const submitHandler = e => {
        e.preventDefault();
        if (query.trim() === '') {
            toast.error('Please enter')
            return;
        }

        onSubmit(query);
        setQuery({ query: '' });
    };  


    return (
        <header className={css.Searchbar }>
            <form onSubmit={submitHandler} className={css.SearchForm }>
                <button type="submit" className={css.SearchFormButton }>
                    <span className={css.SearchFormButtonLabel}>Search</span>
                </button>
                <input
                    className={css.SearchFormInput}
                    type="text"
                    autocomplete="off"
                    autofocus
                    placeholder="Search images and photos"
                    onChange={changeHandler}
                />
            </form>
        </header>
    );

}

export default Searchbar;