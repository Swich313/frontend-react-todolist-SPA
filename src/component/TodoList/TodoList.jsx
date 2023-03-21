import {updateTodo, deleteTodo} from '../../store/todoSlice';
import TodoItem from "../TodoItem/TodoItem.jsx";
import Spinner from '../UI/Spinner/Spinner.jsx';
import classes from './TodoList.module.scss';
import {useTranslation} from "react-i18next";
import {useSelector, useDispatch} from "react-redux";


const TodosList = () => {
    const dispatch = useDispatch();
    const {isAuthenticated} = useSelector(state => state.auth)
    const {todos, todosLoadingStatus, testField, error} = useSelector(state => state.todos);
    const {t} = useTranslation();
    const style = {textAlign: 'center', marginTop: '5px'};
    // const loadedTodos = isAuthenticated ? todos : DUMMY_TODOS;
    console.log({isAuthenticated, todosLoadingStatus, testField})

    const onChangeTodoHandle = (id, changeType) => {
        const updatedTodo = todos.find(item => item._id === id);
        const params = {id, updatedField: {[changeType]: !updatedTodo[changeType]}};
        dispatch(updateTodo(params)).then(res => console.log(res))

    };

    const onDeleteTodoHandle = id => {
        dispatch(deleteTodo(id)).then(res => console.log(res))
    };

    const renderTodoList = arr => {
        if (arr.length === 0
            // && filter !== 'done'
        ) {
            return <h5 style={style}>{t('no_todo_yet')}</h5>
        } else if (arr.length === 0){
            return <h5 style={style}>{t('no_completed_todo_yet')}</h5>
        }
        console.log({arr})

        return arr.map(({_id, title, description, todoType, deadline, isCompleted, isArchived}) => {

            return <TodoItem title={title}
                             type={todoType}
                             description={description}
                             deadline={deadline}
                             id={_id}
                             isCompleted={isCompleted}
                             isArchived={isArchived}
                             onCompleteTodo={() => onChangeTodoHandle(_id, 'isCompleted')}
                             onArchiveTodo={() => onChangeTodoHandle(_id, 'isArchived')}
                             onDeleteTodo={() => onDeleteTodoHandle(_id)}
            />
        });
    };

    const elements = renderTodoList(todos);
    return (
        <ul>
            {todosLoadingStatus === 'error' && <h5 style={style}>{t('downloading_error')}</h5>}
            {todosLoadingStatus === 'loading' && <Spinner />}
            {todosLoadingStatus === 'idle' && elements}
        </ul>
    )
}

export default TodosList;
