import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    change_page,
    select_current_filters,
    select_current_sorting,
    select_current_page,
} from "../features/todo/reducer";

import { refresh_todos } from "../refreshToDos";
import { get_nu_pages_function } from "../api/axios_methods";

function range(start, end) {
    return Array.from({ length: end - start + 1 }, (_, i) => i + start);
}

function render_pagination(current_page, nu_pages, handle_on_click) {
    const first_page = (
        <li
            className={
                "page-item" +
                (current_page == 1 || nu_pages == 0 ? " disabled" : "")
            }
        >
            <a className="page-link" onClick={() => handle_on_click(1)}>
                &laquo;
            </a>
        </li>
    );
    const previous_page = (
        <li
            className={
                "page-item" +
                (current_page == 1 || nu_pages == 0 ? " disabled" : "")
            }
        >
            <a
                className="page-link"
                onClick={() => handle_on_click(current_page - 1)}
            >
                &lt;
            </a>
        </li>
    );
    const next_page = (
        <li
            className={
                "page-item" +
                (current_page == nu_pages || nu_pages == 0 ? " disabled" : "")
            }
        >
            <a
                className="page-link"
                onClick={() => handle_on_click(current_page + 1)}
            >
                &gt;
            </a>
        </li>
    );
    const last_page = (
        <li
            className={
                "page-item" +
                (current_page == nu_pages || nu_pages == 0 ? " disabled" : "")
            }
        >
            <a className="page-link" onClick={() => handle_on_click(nu_pages)}>
                &raquo;
            </a>
        </li>
    );

    let in_between = <></>;
    // If pages <= 5, render all of them.
    if (nu_pages <= 5) {
        in_between = (
            <>
                {range(1, nu_pages).map((number) => (
                    <li
                        className={
                            "page-item" +
                            (current_page == number ? " active" : "")
                        }
                        key={number}
                    >
                        <a
                            className="page-link"
                            onClick={(e) =>
                                handle_on_click(parseInt(e.target.innerText))
                            }
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </>
        );
    } else if (current_page <= 3) {
        in_between = (
            <>
                {range(1, 3).map((number) => (
                    <li
                        className={
                            "page-item" +
                            (current_page == number ? " active" : "")
                        }
                        key={number}
                    >
                        <a
                            className="page-link"
                            onClick={(e) =>
                                handle_on_click(parseInt(e.target.innerText))
                            }
                        >
                            {number}
                        </a>
                    </li>
                ))}
                <li className="page-item disabled">
                    <a className="page-link">...</a>
                </li>
                <li className="page-item">
                    <a
                        className="page-link"
                        onClick={(e) =>
                            handle_on_click(parseInt(e.target.innerText))
                        }
                    >
                        {nu_pages}
                    </a>
                </li>
            </>
        );
    } else if (current_page >= nu_pages - 2) {
        in_between = (
            <>
                <li className="page-item">
                    <a className="page-link" onClick={() => handle_on_click(1)}>
                        1
                    </a>
                </li>
                <li className="page-item disabled">
                    <a className="page-link">...</a>
                </li>
                {range(nu_pages - 2, nu_pages).map((number) => (
                    <li
                        className={
                            "page-item" +
                            (current_page == number ? " active" : "")
                        }
                        key={number}
                    >
                        <a
                            className="page-link"
                            onClick={(e) =>
                                handle_on_click(parseInt(e.target.innerText))
                            }
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </>
        );
    } else {
        in_between = (
            <>
                <li className="page-item">
                    <a className="page-link" onClick={() => handle_on_click(1)}>
                        1
                    </a>
                </li>
                <li className="page-item disabled">
                    <a className="page-link">...</a>
                </li>
                <li className="page-item active">
                    <a className="page-link">{current_page}</a>
                </li>
                <li className="page-item disabled">
                    <a className="page-link">...</a>
                </li>
                <li className="page-item">
                    <a
                        className="page-link"
                        onClick={() => handle_on_click(nu_pages)}
                    >
                        {nu_pages}
                    </a>
                </li>
            </>
        );
    }
    return (
        <nav aria-label="To dos page navigation">
            <ul className="pagination justify-content-center mt-3">
                {first_page}
                {previous_page}
                {in_between}
                {next_page}
                {last_page}
            </ul>
        </nav>
    );
}

export function Pagination() {
    const [nu_pages, set_nu_pages] = useState(0);

    const nu_pages_api = get_nu_pages_function();
    nu_pages_api((response) => set_nu_pages(response));

    const dispatch = useDispatch();

    const my_filters = useSelector(select_current_filters);
    const my_sorters = useSelector(select_current_sorting);
    const my_curr_page = useSelector(select_current_page);

    function handle_on_click(target) {
        if (my_curr_page == target) return;

        dispatch(change_page({ page: target }));
        refresh_todos(my_filters, my_sorters, my_curr_page, dispatch);
    }

    return (
        <div
            className="container mt-3 mb-3"
            style={{
                border: "2px solid black",
                textAlign: "center",
                width: "400px",
                padding: "15px",
            }}
        >
            {render_pagination(my_curr_page, nu_pages, handle_on_click)}
        </div>
    );
}
