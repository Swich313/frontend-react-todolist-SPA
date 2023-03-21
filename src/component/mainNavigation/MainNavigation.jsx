import {Form, NavLink} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import {logout, setLogout} from '../../store/authSlice';

import LanguageSwitch from "../LanguageSwtch/LanguageSwitch.jsx";
import classes from './MainNavigation.module.css';
import $api from "../../utils/axiosFetcher.js";
import {useEffect} from "react";
import axios from "axios";

const MainNavigation = () => {
    // const token = useRouteLoaderData('root');
    const {token, isAuthenticated} = useSelector(state => state.auth);
    const dispatch = useDispatch();


    const logoutHandler = async () => {
        const res = await $api.post('/auth/logout');
        // const res = await fetch('http://localhost:8000/auth/logout', {
        //     method: 'POST',
        //     headers: {'Content-Type': 'application/json'},
        //     // mode: 'cors',
        //     credentials: "include",
        // })
        // const config = {headers: {'Content-Type': 'application/json'}, withCredentials: true}
        // const res = await axios.post('http://localhost:8000/auth/logout', config);
        // const response = await res.json();
        dispatch(setLogout());
        console.log(res)
        // console.log('Logout')
        // dispatch(logout()).then(res => {
        //     const data = res.payload;
        //     console.log(data)
        // })
    }
    return (
        <header className={classes.header}>
            <nav>
                <ul className={classes.list}>
                    <li>
                        <NavLink to='/' className={({isActive}) => isActive ? classes.active : undefined}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/calendar' className={({isActive}) => isActive ? classes.active : undefined}>
                            Calendar
                        </NavLink>
                    </li>
                    {!isAuthenticated && (<li>
                        <NavLink to='/auth?mode=login' className={({isActive}) => isActive ? classes.active : undefined}>
                            Login
                        </NavLink>
                    </li>)
                    }
                    {isAuthenticated && (<li>
                        <NavLink to='/' className={({isActive}) => isActive ? classes.active : undefined} onClick={logoutHandler}>
                            Logout
                        </NavLink>
                    </li>)
                    }
                    <li>
                        <LanguageSwitch />
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;
