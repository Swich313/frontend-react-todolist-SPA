import {useTranslation} from "react-i18next";

import TodoList from "../component/TodoList/TodoList.jsx";
import Spinner from "../component/UI/Spinner/Spinner.jsx";

const HomePage = () => {
    const {t} = useTranslation();


    return (
        <>
            <div>Home Page</div>
            <div>{t('app_title')}</div>
            <TodoList />
        </>
    );
};

export default HomePage;