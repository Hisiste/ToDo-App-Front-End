import React from "react";
import { Counter } from "./features/counter/Counter";
import { Search } from "./ToDo-UI/Search";
import { NewToDo } from "./ToDo-UI/NewToDo";
import { ToDoList } from "./ToDo-UI/ToDoList";

function App() {
    return (
        <div>
            <Search />
            <NewToDo />
            <ToDoList />
            <Counter />
        </div>
    );
}

export default App;
