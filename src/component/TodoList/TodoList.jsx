// import {useHttp} from '../../hooks/http.hook';
// import {useCallback, useEffect} from 'react';
// import { useDispatch, useSelector } from 'react-redux';
//
// import { todoDeleted,
//     todoArchived,
//     todoToggleCompleted,
//     fetchTodos,
//     setCurrentPage,
//     setFilteredTodosQuantity} from './todosSlice';
// import {createSelector} from "@reduxjs/toolkit";

import TodoItem from "../TodoItem/TodoItem.jsx";
import Spinner from '../UI/Spinner/Spinner.jsx';
import classes from './TodoList.module.scss';
// import 'dotenv/config';
import {useTranslation} from "react-i18next";
import {useState} from "react";

const DUMMY_TODOS = [
    {id: 'todo1', title: 'todo #1', description: 'Description of the first todo', todoType: 'hobby', isCompleted: false, isArchived: false, deadline: Date.now()},
    {id: 'todo2', title: 'todo #2', description: 'Description of the second todo', todoType: 'work', isCompleted: false, isArchived: false, deadline: Date.now()},
    {id: 'todo3', title: 'todo #3', description: 'Description of the third todo', todoType: 'home', isCompleted: false, isArchived: false, deadline: Date.now()},
    {id: 'todo4', title: 'todo #4', description: 'Description of the fourth todo', todoType: 'other', isCompleted: false, isArchived: false, deadline: Date.now()},
    {id: 'todo5', title: 'todo #5', description: 'Description of the fifth todo', todoType: 'work', isCompleted: true, isArchived: false, deadline: Date.now()},
    {id: 'todo6', title: 'todo #6', description: 'Description of the sixth todo', todoType: 'hobby', isCompleted: false, isArchived: false, deadline: Date.now()},
]

const TodosList = () => {                       //нужно прокинуть props.updateData

    const [todos, setTodos] = useState(DUMMY_TODOS);
    const {t} = useTranslation();
    const style = {textAlign: 'center', marginTop: '5px'};

    const onCompleteTodoHandle = id => {
        const completedTodoIndex = todos.findIndex(item => item.id === id);
        const newTodos = [...todos];
        newTodos[completedTodoIndex].isCompleted = !todos[completedTodoIndex].isCompleted;
        setTodos(newTodos);
    };

    const onArchiveTodoHandle = id => {
        const completedTodoIndex = todos.findIndex(item => item.id === id);
        const newTodos = [...todos];
        newTodos[completedTodoIndex].isArchived = true;
        newTodos[completedTodoIndex].todoType = 'done';
        setTodos(newTodos);
    };

    const onDeleteTodoHandle = id => {
        const completedTodoIndex = todos.findIndex(item => item.id === id);
        const newTodos = [...todos];
        newTodos.splice(completedTodoIndex, 1);
        setTodos(newTodos);
    };


    // const renderTodosList = (arr, filter, currentPage, perPage) => {
    //     if (arr.length === 0 && filter !== 'done') {
    //         return <h5 style={style}>{t('no_todo_yet')}</h5>
    //     } else if (arr.length === 0){
    //         return <h5 style={style}>{t('no_completed_todo_yet')}</h5>
    //     }
    //     let start = (currentPage - 1) * perPage;
    //     let stop = currentPage * perPage;
    //     const shortenArr = arr.slice(start, stop);
    //     return shortenArr.map(({_id, ...props}) => {
    //         return (
    //             <TodosItem
    //                 key={_id}
    //                 {...props}
    //                 id={_id}
    //                 onArchiveTodo={() => onArchiveTodo(_id)}
    //                 onDeleteTodo={() => onDeleteTodo(_id, filteredTodos)}
    //                 onCompleteTodo={() => onCompleteTodo(_id, todos)}/>
    //         )
    //     })
    // }
    const renderTodoList = arr => {
        return arr.map(({id, title, description, todoType, deadline, isCompleted, isArchived}) => {
            return <TodoItem key={id}
                             title={title}
                             type={todoType}
                             description={description}
                             deadline={deadline}
                             isCompleted={isCompleted}
                             isArchived={isArchived}
                             onCompleteTodo={() => onCompleteTodoHandle(id)}
                             onArchiveTodo={() => onArchiveTodoHandle(id)}
                             onDeleteTodo={() => onDeleteTodoHandle(id)}
            />
        });
    };

    // const elements = renderTodosList(filteredTodos, activeFilter, currentPage, perPage);
    const elements = renderTodoList(todos);

    return (
        <ul>
            {elements}
            <div className={classes.pages}>
                {/*{pages.map((page, i) => {*/}
                {/*    return (*/}
                {/*        <span key={i}*/}
                {/*              className={currentPage === page && pages.length > 1 ? "page active_page" : pages.length > 1 ? "page" : "invisible"}*/}
                {/*              onClick={() => {dispatch(setCurrentPage(page))}}>*/}
                {/*            {page}*/}
                {/*        </span>*/}
                {/*    )*/}
                {/*})}*/}
            </div>
        </ul>
    )
}

export default TodosList;