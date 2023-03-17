import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useTranslation} from "react-i18next";
import {changeActiveFilter} from "../../../../new todoList/src/store/filterSlice.js"
// import {setCurrentPage} from "../../store/filterSlice.js;
import Spinner from "../UI/Spinner/Spinner.jsx";

import classes from './TodosFilters.module.scss'
import {setCurrentPage} from "../../../../new todoList/src/store/todoSlice.js";
import Card from "../UI/Card/Card.jsx";


const TodosFilters = () => {
    console.log('render filters')
    const {filters, filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
    const {filteredTodosQuantity} = useSelector(state => state.todos);
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const style = {textAlign: 'center', marginTop: '5px'};

    if (filtersLoadingStatus === 'loading') {
        return <Spinner />;
    } else if(filtersLoadingStatus === 'error') {
        return <h5 style={style}>{t('not_found')}</h5>
    }

    const onCLickHandler = (name) => {
        dispatch(setCurrentPage(1));
        dispatch(changeActiveFilter(name));
    };

    const renderFilters = arr => {
        if(arr.length === 0){
            return <h5 style={style}>{t('downloading_error')}</h5>
        }
        return arr.map(({name, className, _id}) => {
            const btnClasses = [classes.button, classes[className], name === activeFilter ? classes.active_filter : null, name === activeFilter ? classes['btn-data-count'] : null].join(' ');
            // const btnClass = classNames('button', className, {
            //     'active_filter' : name === activeFilter,
            //     'btn-data-count' : name === activeFilter
            // });
           if(name === 'work' || name === 'home' || name === 'hobby' ||
              name === 'other' || name === 'all' || name === 'done'){
                        return <button key={_id}
                            className={btnClasses}
                            data-count={filteredTodosQuantity}
                            onClick={() => {onCLickHandler(name)}}>{t(`filter_${name}`)}</button>
                    } else {
                        return <button key={_id}
                                       className={btnClasses}
                                       data-count={filteredTodosQuantity}
                                       onClick={() => {onCLickHandler(name)}}>{name}</button>
                    }
        });
    }

    const element = renderFilters(filters);

    return (
        <Card className={classes.container}>
            <div className={classes.container__inner}>
                <p>{t('filters_title')}</p>
                <div className={classes.button_group}>
                    {element}
                </div>
            </div>
        </Card>
    )
}

export default TodosFilters;