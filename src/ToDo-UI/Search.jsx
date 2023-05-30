import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { set_filters } from "../features/todo/reducer";

import {
    select_current_filters,
    select_current_sorting,
    select_current_page,
} from "../features/todo/reducer";

import { refresh_todos } from "../refreshToDos";

export function Search() {
    const dispatch = useDispatch();

    const [search_name, set_search_name] = useState("");
    const [search_priority, set_search_priority] = useState("All");
    const [search_state, set_search_state] = useState("All");

    const my_filters = useSelector(select_current_filters);
    const my_sorters = useSelector(select_current_sorting);
    const my_curr_page = useSelector(select_current_page);

    function handle_search() {
        dispatch(
            set_filters({
                name: search_name,
                priority: search_priority,
                state: search_state,
            })
        );
        refresh_todos(my_filters, my_sorters, my_curr_page, dispatch);
    }

    return (
        <div className="container mt-3" style={{ border: "2px solid black" }}>
            <div className="row">
                <div className="input-group mb-3 mt-3">
                    <span className="input-group-text" id="search-name">
                        Name
                    </span>
                    <input
                        className="form-control"
                        type="text"
                        onChange={(e) => set_search_name(e.target.value)}
                    ></input>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-7">
                    <div className="input-group mb-3 mt-3">
                        <label className="input-group-text">Priority</label>
                        <select
                            className="form-select"
                            id="search-priority"
                            onChange={(e) =>
                                set_search_priority(e.target.value)
                            }
                        >
                            <option value="All" defaultValue>
                                All
                            </option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="row align-items-center justify-content-between">
                <div className="col-sm-7">
                    <div className="input-group mb-3 mt-3">
                        <label className="input-group-text">State</label>
                        <select
                            className="form-select"
                            id="search-priority"
                            onChange={(e) => set_search_state(e.target.value)}
                        >
                            <option value="All" defaultValue>
                                All
                            </option>
                            <option value="Done">Done</option>
                            <option value="Undone">Undone</option>
                        </select>
                    </div>
                </div>

                <div className="col-sm-2">
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button
                            type="button"
                            className="btn btn-outline-dark"
                            onClick={handle_search}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
