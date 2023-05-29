import React from "react";
import { Search } from "./ToDo-UI/Search";
import { NewToDo } from "./ToDo-UI/NewToDo";
import { ListToDos } from "./ToDo-UI/ListToDo";

import { useDispatch, useSelector } from "react-redux";
import {
    set_last_id,
    select_current_filters,
    select_current_sorting,
    select_current_page,
} from "./features/todo/reducer";

import { get_last_id_function } from "./api/axios_methods";

import { refresh_todos } from "./refreshToDos";

function App() {
    const dispatch = useDispatch();
    const my_filters = useSelector(select_current_filters);
    const my_sorters = useSelector(select_current_sorting);
    const my_curr_page = useSelector(select_current_page);

    refresh_todos(my_filters, my_sorters, my_curr_page, dispatch);
    // Finally, retrieve the last index used for a to do.
    const last_id_api = get_last_id_function();
    last_id_api((response) => {
        dispatch(
            set_last_id({
                id: response,
            })
        );
    });

    return (
        <div>
            <Search />
            <NewToDo />
            <ListToDos />
        </div>
    );
}

export default App;
