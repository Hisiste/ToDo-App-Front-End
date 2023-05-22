import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { set_filters, refresh_filtered_todos } from "../features/todo/reducer";

export function Search() {
    const dispatch = useDispatch();

    const [search_name, set_search_name] = useState("");
    const [search_priority, set_search_priority] = useState("All");
    const [search_state, set_search_state] = useState("All");

    function handle_search() {
        dispatch(
            set_filters({
                name: search_name,
                priority: search_priority,
                state: search_state,
            })
        );
        dispatch(refresh_filtered_todos());
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
                            <option value="1">Done</option>
                            <option value="0">Undone</option>
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
