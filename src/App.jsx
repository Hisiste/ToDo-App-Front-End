import React from "react";
import { NewToDo } from "./ToDo-UI/NewToDo";
import { ListToDos } from "./ToDo-UI/ListToDo";

function App() {
    return (
        <div>
            <NewToDo />
            <ListToDos />
        </div>
    );
}

export default App;
