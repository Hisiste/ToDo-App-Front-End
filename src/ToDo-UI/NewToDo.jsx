import React from "react";

export function NewToDo() {
    return (
        <>
            <div className="container mt-3 mb-3">
                <button
                    type="button"
                    className="btn btn-outline-dark"
                    data-bs-toggle="modal"
                    data-bs-target="#NewToDo"
                >
                    + New To Do
                </button>
            </div>

            <div
                className="modal fade"
                id="NewToDo"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="New To Do Window"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="exampleModalLongTitle"
                            >
                                Add a new to do
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-floating mb-3">
                                    <input
                                        className="form-control"
                                        id="new-todo-id"
                                        value="4"
                                        disabled
                                    />
                                    <label htmlFor="floatingInput">ID</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        className="form-control"
                                        placeholder="Text"
                                        id="new-todo-text"
                                    />
                                    <label htmlFor="floatingInput">Text</label>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">
                                        <i className="fa-regular fa-calendar"></i>
                                    </span>
                                    <div className="form-floating">
                                        <input
                                            className="form-control"
                                            id="new-todo-due-date"
                                            name="new-todo-due-date"
                                            placeholder="Due date"
                                        />
                                        <label htmlFor="floatingInput">
                                            Due Date
                                        </label>
                                    </div>
                                </div>
                                <div class="form-check mb-3">
                                    <input
                                        class="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="flexCheckDefault"
                                    />
                                    <label
                                        class="form-check-label"
                                        for="flexCheckDefault"
                                    >
                                        Done
                                    </label>
                                </div>
                                <div class="form-floating mb-3">
                                    <select
                                        class="form-select"
                                        id="floatingSelect"
                                        aria-label="Floating label select example"
                                    >
                                        <option selected>Low</option>
                                        <option value="1">Medium</option>
                                        <option value="2">High</option>
                                    </select>
                                    <label for="floatingSelect">Priority</label>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary">
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
