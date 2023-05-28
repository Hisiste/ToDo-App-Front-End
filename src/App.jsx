import React from "react";
import { Search } from "./ToDo-UI/Search";
import { NewToDo } from "./ToDo-UI/NewToDo";
import { ListToDos } from "./ToDo-UI/ListToDo";

import { useDispatch } from "react-redux";
import {
    set_last_id,
    set_todo,
    refresh_filtered_todos,
} from "./features/todo/reducer";

import { get_todos_function, get_last_id_function } from "./api/axios_methods";

function App() {
    const get_todos = get_todos_function();

    const dispatch = useDispatch();
    function handler(data) {
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
        dispatch(refresh_filtered_todos());
    }
    get_todos(handler);

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
