import React from "react";
import { Search } from "./ToDo-UI/Search";
import { NewToDo } from "./ToDo-UI/NewToDo";
import { ListToDos } from "./ToDo-UI/ListToDo";

function App() {
    return (
        <div>
            <Search />
            <NewToDo />
            <ListToDos />
        </div>
    );
}

export default App;
