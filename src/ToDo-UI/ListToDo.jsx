import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    change_done,
    remove_todo,
    edit_todo,
    set_sort_todo,
    sort_todo,
    refresh_filtered_todos,
    select_todos,
    select_current_sorting,
} from "../features/todo/reducer";

import { edit_todo_function, remove_todo_function } from "../api/axios_methods";

function sort_table_header(prefix, current_sorting) {
    if (prefix.toLowerCase().startsWith(current_sorting.substr(0, 3))) {
        switch (current_sorting.substr(-1)) {
            case "^":
                // Write Prefix and an arrow pointing up.
                return (
                    <>
                        {prefix} <span>&#8593;</span>
                    </>
                );
            case "v":
                // Write Prefix and an arrow pointing down.
                return (
                    <>
                        {prefix} <span>&#8595;</span>
                    </>
                );
        }
    } else {
        // Write Prefix and four dots. No sorting.
        return (
            <>
                {prefix} <span>&#8283;</span>
            </>
        );
    }
}

function list_of_todos(edit_button, delete_button) {
    const dispatch = useDispatch();
    const my_todos = useSelector(select_todos);
    const my_sorting = useSelector(select_current_sorting);

    function handle_sort_todos(where_clicked) {
        dispatch(
            set_sort_todo({
                where_clicked: where_clicked,
            })
        );
        dispatch(sort_todo());
        dispatch(refresh_filtered_todos());
    }

    // Table contents
    var table_head = (
        <thead>
            <tr>
                <th scope="col">Done</th>
                <th scope="col">Name</th>
                <th scope="col" onClick={() => handle_sort_todos("priority")}>
                    {sort_table_header("Priority", my_sorting)}
                </th>
                <th
                    scope="col"
                    onClick={() => {
                        handle_sort_todos("due_date");
                    }}
                >
                    {sort_table_header("Due Date", my_sorting)}
                </th>
                <th scope="col">Actions</th>
            </tr>
        </thead>
    );

    var table_body = (
        <tbody className="table-group-divider">
            {my_todos.map((item) => (
                <tr key={item.id}>
                    <th scope="row">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={item.done}
                                id={"list-todo-done-" + item.id}
                                onChange={(e) => {
                                    dispatch(
                                        change_done({
                                            id: item.id,
                                            done: e.target.checked,
                                        })
                                    ),
                                        dispatch(refresh_filtered_todos());
                                }}
                            ></input>
                        </div>
                    </th>
                    <td>{item.text}</td>
                    <td>{item.priority}</td>
                    <td>{item.due_date}</td>
                    <td>
                        <div className="btn-group btn-group-sm" role="group">
                            {edit_button(item)}
                            {delete_button(item)}
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    );

    return (
        <div className="container">
            <table className="table align-middle">
                {table_head}
                {table_body}
            </table>
        </div>
    );
}

function new_modal(modal_id, modal_header, modal_body, modal_footer) {
    return (
        <div className="modal fade" id={modal_id} tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    {modal_header}
                    {modal_body}
                    {modal_footer}
                </div>
            </div>
        </div>
    );
}

export function ListToDos() {
    const dispatch = useDispatch();

    const [edit_id, set_edit_id] = useState(-1);
    const [edit_text, set_edit_text] = useState("");
    const [edit_due_date, set_edit_due_date] = useState("");
    const [edit_priority, set_edit_priority] = useState("Low");

    const edit_todo_api = edit_todo_function();
    const remove_todo_api = remove_todo_function();

    function handle_open_modal(id, text, due_date, done, priority) {
        set_edit_id(id);
        set_edit_text(text);
        set_edit_due_date(due_date);
        set_edit_priority(priority);
    }
    function handle_exit_modal() {
        // https://stackoverflow.com/questions/27826381/clearing-form-input-fields-in-bootstrap
        $("form").get(0).reset(); // Reset form

        set_edit_id(-1);
        set_edit_text("");
        set_edit_priority("Low");
    }
    function handle_edit_todo() {
        edit_todo_api({
            id: edit_id,
            text: edit_text,
            due_date: edit_due_date,
            priority: edit_priority,
        });
        dispatch(
            edit_todo({
                id: edit_id,
                text: edit_text,
                due_date: edit_due_date,
                priority: edit_priority,
            })
        );
        dispatch(sort_todo());
        dispatch(refresh_filtered_todos());
        handle_exit_modal();
    }

    // Define Edit and Remove buttons
    function edit_button(item) {
        return (
            <button
                type="button"
                className="btn btn-outline-dark"
                data-bs-toggle="modal"
                data-bs-target="#EditToDo"
                onClick={() =>
                    handle_open_modal(
                        item.id,
                        item.text,
                        item.due_date,
                        item.done,
                        item.priority
                    )
                }
            >
                Edit
            </button>
        );
    }
    function delete_button(item) {
        return (
            <button
                type="button"
                className="btn btn-outline-dark"
                onClick={(e) => {
                    remove_todo_api({ id: item.id });
                    dispatch(remove_todo(item.id));
                    dispatch(refresh_filtered_todos());
                }}
            >
                Delete
            </button>
        );
    }

    // Define modal to edit a to do.
    var modal_header = (
        <div className="modal-header">
            <h5 className="modal-title">Edit a to do</h5>
            <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close edit window"
                onClick={handle_exit_modal}
            >
                <span>&times;</span>
            </button>
        </div>
    );
    var modal_footer = (
        <div className="modal-footer">
            <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handle_exit_modal}
            >
                Cancel
            </button>
            <button
                type="button"
                className="btn btn-primary"
                onClick={handle_edit_todo}
                data-bs-dismiss="modal"
            >
                Edit
            </button>
        </div>
    );
    var modal_body = (
        <div className="modal-body">
            <form>
                <div className="form-floating mb-3">
                    <input
                        className="form-control"
                        id="edit-todo-id"
                        value={edit_id}
                        disabled
                    />
                    <label htmlFor="edit-todo-id">ID</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        className="form-control"
                        placeholder="Text"
                        value={edit_text}
                        id="edit-todo-text"
                        onChange={(e) => set_edit_text(e.target.value)}
                    />
                    <label htmlFor="edit-todo-text">Text</label>
                </div>
                <div className="input-group mb-3">
                    <div className="form-floating">
                        <input
                            className="form-control"
                            type="datetime-local"
                            id="edit-todo-due-date"
                            placeholder="Due date"
                            value={edit_due_date}
                            onChange={(e) => {
                                set_edit_due_date(e.target.value);
                            }}
                        />
                        <label htmlFor="edit-todo-due-date">Due Date</label>
                    </div>
                </div>
                <div className="form-floating mb-3">
                    <select
                        className="form-select"
                        id="edit-todo-priority"
                        value={edit_priority}
                        onChange={(e) => set_edit_priority(e.target.value)}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    <label htmlFor="edit-todo-priority">Priority</label>
                </div>
            </form>
        </div>
    );

    return (
        <>
            {list_of_todos(edit_button, delete_button)}
            {new_modal("EditToDo", modal_header, modal_body, modal_footer)}
        </>
    );
}
