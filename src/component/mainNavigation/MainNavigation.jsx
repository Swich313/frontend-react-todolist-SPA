import {NavLink} from 'react-router-dom';

import LanguageSwitch from "../LanguageSwtch/LanguageSwitch.jsx";
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
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
                    <li>
                        <NavLink to='/auth?mode=login' className={({isActive}) => isActive ? classes.active : undefined}>
                            Login
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/logout' className={({isActive}) => isActive ? classes.active : undefined}>
                            Logout
                        </NavLink>
                    </li>
                    <li>
                        <LanguageSwitch />
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;