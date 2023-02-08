import {useState} from "react";
// import {handleDate} from "../todoCalendar/TodoCalendar";

import Card from "../UI/Card/Card.jsx";

import classes from './TodoItem.module.scss';
import {useTranslation} from "react-i18next";

const handleDate = date => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${date.getDate()} ${months.at(date.getMonth())} ${date.getFullYear()}`;
}

const TodosListItem = props => {
    const {
        title,
        description,
        type,
        deadline,
        id,
        isCompleted,
        isArchived,
        onCompleteTodo,
        onArchiveTodo,
        onDeleteTodo
    } = props;
    let typeClassName;
    const [visibility, setVisibility] = useState('tooltip_invisible');
    const currentDateString = handleDate(new Date());
    const {t} = useTranslation();

    switch (type) {
        case 'home':
            typeClassName = `bg__${type}`;
            break;
        case 'work':
            typeClassName = `bg__${type}`;
            break;
        case 'hobby':
            typeClassName = `bg__${type}`;
            break;
        case 'other':
            typeClassName = `bg__${type}`;
            break;
        case 'done':
            typeClassName = `bg__${type}`;
            break;
        default:
            typeClassName = 'bg__default';
    }

    const closeBtnHandler = () => {
            if (isCompleted && !isArchived) {
                onArchiveTodo();
                return;
            } else if (isCompleted && isArchived) {
                onDeleteTodo();
                return;
            }
            setVisibility('tooltip_visible');
            // const timer = setTimeout(()=> {
            //     setVisibility('tooltip_invisible');
            //     }, 5000);
            // clearTimeout(timer);
            const timer = null;
            timer ? clearTimeout(timer) : setTimeout(() => {
                setVisibility('tooltip_invisible')
            }, 5000);
    };

    return (

        <li className={classes.todo_item}>
            <Card styles={classes[typeClassName]}>
                <div className={classes["todo_item__checkbox-rect"]} onClick={onCompleteTodo}>
                    <input type="checkbox" id={id} name="check" checked={isCompleted} onChange={onCompleteTodo}/>
                    <label htmlFor={id} className={isCompleted ? classes.crossed : null}>
                        {title}
                    </label>
                </ div>
                <div className={`${classes.todo_item__text} ${isCompleted ? classes.crossed : null}`}>
                    {description}
                    <p className={deadline ? null : classes.time_hide}>
                        {t('deadline_text')} {Date.parse(deadline) > Date.parse(new Date()) ? `${deadline}` : deadline === currentDateString ? `${deadline} ${t('deadline_today')}`: `${deadline} ${t('deadline_outdated')}`}
                    </p>
                </div>
                <button type="button" className={classes.close_btn} aria-label="Close" onClick={closeBtnHandler} >x
                    <span className={`${classes.close_btn__tooltip} ${classes[visibility]}`}>{t('tooltip')}</span>
                </button>
            </Card>
        </li>
    )
}

export default TodosListItem;