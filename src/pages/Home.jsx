import {useTranslation} from "react-i18next";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {json, useActionData} from "react-router-dom";

import TodoList from "../component/TodoList/TodoList.jsx";
import Pagination from "../component/UI/Pagination/Pagination.jsx";
import TodoAddForm from "../component/TodoAddForm/TodoAddForm.jsx";
import TodosFilters from "../component/TodosFilters/TodosFilters.jsx";
import $api from "../utils/axiosFetcher.js";
import {fetchTodos} from "../../../new todoList/src/store/todoSlice.js";
import {fetchFilters, resetInputs} from "../../../new todoList/src/store/filterSlice.js";
import store from "../../../new todoList/src/store/index.js";


import PageContent from "../component/UI/PageContent/PageContent.jsx";


const HomePage = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {todos, todosTotalQuantity, currentPage} = useSelector(state => state.todos)
    const {activeFilter, filters, isAddNewFilterMode} = useSelector(state => state.filters);
    const data = useActionData();
    console.log(data)

    useEffect(() => {
        dispatch(fetchTodos(activeFilter))
            .then(res => {
            const data = res.payload;
            console.log(data)
            });
        // eslint-disable-next-line
    }, [currentPage, data?.response[0].data.todo._id, activeFilter])

    // useEffect(() => {
    //     dispatch(fetchFilters())
    //         .then(res => {
    //             const data = res.payload;
    //         })
    // }, []);
    //
    // useEffect(() => {
    //     if(data?.ok){
    //         dispatch(resetInputs());
    //         dispatch(fetchFilters())
    //     }
    // }, [data])

    return (
           <PageContent>
                <div>
                    <div>{t('app_title')}</div>
                    <TodoList />
                    <Pagination />
                </div>
               {/*<div>*/}
               {/*    <TodoAddForm />*/}
               {/*    <TodosFilters />*/}
               {/*</div>*/}
           </PageContent>
    );
};

export default HomePage;

// export const loader = async ({request}) => {
//     const url = new URL(request.url);
//     const page = url.searchParams.get('page') || 1
//
//     const response = await $api.get(`/todos?page=${page}`);
//     if(response.statusText !== 'OK'){
//         return json({message: 'Couldn\'t fetch todos!'}, {status: 500});
//     }
//     console.log(response.data)
//     return response.data;
// };

export const action = async ({request}) => {
    const state = store.getState();
    const data = await request.formData();
    const todoData = {
        title: data.get('title'),
        description: data.get('description'),
        todoType: data.get('type') === 'AddNewType' ? data.get('todoType') : data.get('type')
    };

    const todoResponse = await $api.post('/todos/todo', todoData);
    let filterResponse;
    if(state.filters.isAddNewFilterMode){
        filterResponse = await $api.post('/todos/filter', {todoType: todoData.todoType});
    }


    if (todoResponse.status === 422 || filterResponse?.status === 422){
        return json({message: 'Invalid data!'}, {response: [todoResponse, filterResponse]});
    }

    // if(response.statusText !== 'OK'){
    //     return json({message: 'Could not authenticate user!'}, {status: 500});
    // }

    // const res = await response.json();

    return {ok: true, response: [todoResponse, filterResponse]}

};