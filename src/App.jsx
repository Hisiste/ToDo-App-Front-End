import React from "react";
import { Search } from "./ToDo-UI/Search";
import { NewToDo } from "./ToDo-UI/NewToDo";
import { ListToDos } from "./ToDo-UI/ListToDo";

import { useDispatch, useSelector } from "react-redux";
import {
    set_last_id,
    set_todo,
    select_current_filters,
    select_current_sorting,
} from "./features/todo/reducer";

import {
    set_fil_sort_function,
    get_todos_page_function,
    get_last_id_function,
} from "./api/axios_methods";

function App() {
    // Set default sorting and filters on back end.
    const set_fil_sor_api = set_fil_sort_function();

    const my_filters = useSelector(select_current_filters);
    const my_sorting = useSelector(select_current_sorting);
    set_fil_sor_api({
        filter: {
            name: my_filters.name,
            priority: my_filters.priority,
            state: my_filters.state,
        },
        sort: {
            field: my_sorting.split("/")[0],
            order: my_sorting.split("/")[1],
        },
    });

    // Retrieve the first page of our to dos.
    const get_todos_api = get_todos_page_function();
    const dispatch = useDispatch();

    function write_todos_redux(data) {
        data.map((todo) => {
            const due_date = new Date(todo.dueDate);
            const offset = due_date.getTimezoneOffset();

            dispatch(
                set_todo({
                    id: todo.id,
                    text: todo.text,
                    due_date:
                        todo.dueDate != null
                            ? new Date(due_date - offset * 60 * 1000)
                                  .toISOString()
                                  .slice(0, -1)
                            : "",
                    done: todo.done,
                    priority: todo.priority,
                    creation_date: todo.creationDate,
                })
            );
        });
    }
    get_todos_api(write_todos_redux, { page: 1 });

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
