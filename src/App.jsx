import React from "react";
import { Counter } from "./features/counter/Counter";
import { Search } from "./ToDo-UI/Search";
import { ToDoList } from "./ToDo-UI/ToDoList";

function App() {
    return (
        <div>
            <Search />
            <ToDoList />
            <Counter />
        </div>
    );
}

export default App;
