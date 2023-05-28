import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    add_todo,
    sort_todo,
    refresh_filtered_todos,
    select_last_index,
} from "../features/todo/reducer";

import { new_todo_function } from "../api/axios_methods";

function new_button(trigger_id) {
    return (
        <div className="container mt-3 mb-3">
            <button
                type="button"
                className="btn btn-outline-dark"
                data-bs-toggle="modal"
                data-bs-target={trigger_id}
            >
                + New To Do
            </button>
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

export function NewToDo() {
    const my_last_idx = useSelector(select_last_index);

    const dispatch = useDispatch();
    const [new_text, set_new_text] = useState("");
    const [new_due_date, set_new_due_date] = useState("");
    const [new_priority, set_new_priority] = useState("Low");

    const new_todo_api = new_todo_function();

    function handle_exit_modal() {
        // https://stackoverflow.com/questions/27826381/clearing-form-input-fields-in-bootstrap
        $("form").get(0).reset(); // Reset form

        set_new_text("");
        set_new_due_date("");
        set_new_priority("Low");
    }
    function handle_add_todo() {
        new_todo_api({
            text: new_text,
            due_date:
                new_due_date.length == 0
                    ? ""
                    : new Date(new_due_date).toISOString(),
            priority: new_priority,
        });
        dispatch(
            add_todo({
                text: new_text,
                due_date:
                    new_due_date.length == 0
                        ? ""
                        : new Date(new_due_date).toISOString(),
                priority: new_priority,
                creation_date: new Date().toISOString(),
            })
        );
        dispatch(sort_todo());
        dispatch(refresh_filtered_todos());
        handle_exit_modal();
    }

    // Define modal to add a new to do.
    var modal_header = (
        <div className="modal-header">
            <h5 className="modal-title">Add a new to do</h5>
            <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close new to do window"
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
                onClick={handle_add_todo}
                data-bs-dismiss="modal"
            >
                Add
            </button>
        </div>
    );
    var modal_body = (
        <div className="modal-body">
            <form>
                <div className="form-floating mb-3">
                    <input
                        className="form-control"
                        id="new-todo-id"
                        value={my_last_idx + 1}
                        disabled
                    />
                    <label htmlFor="new-todo-id">ID</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        className="form-control"
                        placeholder="Text"
                        id="new-todo-text"
                        onChange={(e) => set_new_text(e.target.value)}
                    />
                    <label htmlFor="new-todo-text">Text</label>
                </div>
                <div className="input-group mb-3">
                    <div className="form-floating">
                        <input
                            className="form-control"
                            type="datetime-local"
                            id="new-todo-due-date"
                            placeholder="Due date"
                            onChange={(e) => {
                                set_new_due_date(e.target.value);
                            }}
                        />
                        <label htmlFor="new-todo-due-date">Due Date</label>
                    </div>
                </div>
                <div className="form-floating mb-3">
                    <select
                        className="form-select"
                        id="new-todo-priority"
                        onChange={(e) => set_new_priority(e.target.value)}
                    >
                        <option value="Low" defaultValue>
                            Low
                        </option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                    <label htmlFor="new-todo-priority">Priority</label>
                </div>
            </form>
        </div>
    );

    return (
        <>
            {new_button("#NewToDo")}
            {new_modal("NewToDo", modal_header, modal_body, modal_footer)}
        </>
    );
}
