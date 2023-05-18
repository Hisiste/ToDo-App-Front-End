import { createSlice } from "@reduxjs/toolkit";

export const todo_slice = createSlice({
    name: "todo_list",
    initialState: {
        todos: [],
        last_id: 0,
    },

    reducers: {
        add_todo: (state, action) => {
            state.todos = [
                ...state.todos,
                {
                    id: ++state.last_id,
                    text: action.payload.text,
                    due_date: action.payload.due_date,
                    done: action.payload.done,
                    priority: action.payload.priority,
                    creation_date: action.payload.creation_date,
                },
            ];
        },

        change_done: (state, action) => {
            let selected_todo = state.todos.findIndex(
                (x) => x.id == action.payload.id
            );
            if (selected_todo == -1) return;

            state.todos[selected_todo].done = action.payload.done;
        },
    },
});

export const { add_todo, change_done } = todo_slice.actions;

export const select_todos = (state) => state.todo_list.todos;
export const select_last_index = (state) => state.todo_list.last_id;

export default todo_slice.reducer;
