import React from "react";
import { Search } from "./ToDo-UI/Search";
import { NewToDo } from "./ToDo-UI/NewToDo";
import { ListToDos } from "./ToDo-UI/ListToDo";
import { Pagination } from "./ToDo-UI/Pagination";
import { Average } from "./ToDo-UI/averageTime";

import { useDispatch, useSelector } from "react-redux";
import {
    select_current_filters,
    select_current_sorting,
    select_current_page,
} from "./features/todo/reducer";

import { refresh_todos } from "./refreshToDos";

function App() {
    const dispatch = useDispatch();
    const my_filters = useSelector(select_current_filters);
    const my_sorters = useSelector(select_current_sorting);
    const my_curr_page = useSelector(select_current_page);

    refresh_todos(my_filters, my_sorters, my_curr_page, dispatch);

    return (
        <div>
            <Search />
            <NewToDo />
            <ListToDos />
            <Pagination />
            <Average />
        </div>
    );
}

export default App;
