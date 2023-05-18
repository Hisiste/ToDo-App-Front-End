import { configureStore } from "@reduxjs/toolkit";
import todo_reducer from "../features/todo/reducer";

export const store = configureStore({
    reducer: {
        todo_list: todo_reducer,
    },
});
