import React from "react";
import { Counter } from "./features/counter/Counter";
import { Search } from "./ToDo-UI/Search";

function App() {
    return (
        <div>
            <Search />
            <Counter />
        </div>
    );
}

export default App;
