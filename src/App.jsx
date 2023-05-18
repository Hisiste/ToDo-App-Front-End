import React from "react";
// import { Counter } from "./features/counter/Counter";
import { Search } from "./ToDo-UI/Search";
import { NewToDo, ListToDos } from "./ToDo";

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
