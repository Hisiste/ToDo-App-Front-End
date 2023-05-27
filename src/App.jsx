import React from "react";
import { Search } from "./ToDo-UI/Search";
import { NewToDo } from "./ToDo-UI/NewToDo";
import { ListToDos } from "./ToDo-UI/ListToDo";

import { useDispatch } from "react-redux";
import { set_todo, refresh_filtered_todos } from "./features/todo/reducer";

import { get_todos_function } from "./api/axios_methods";

function App() {
    const get_todos = get_todos_function();

    const dispatch = useDispatch();
    function handler(data) {
        data.map((todo) => {
            dispatch(
                set_todo({
                    id: todo.id,
                    text: todo.text,
                    due_date:
                        todo.dueDate != null
                            ? todo.dueDate.substring(0, 16)
                            : todo.dueDate,
                    done: todo.done,
                    priority: todo.priority,
                    creation_date: todo.creationDate,
                })
            );
        });
        dispatch(refresh_filtered_todos());
    }
    get_todos(handler);

    return (
        <div>
            <Search />
            <NewToDo />
            <ListToDos />
        </div>
    );
}

export default App;
