# To Do App (Front End)

A basic and simple To Do App. **This is just the front end part. The back end
will be later added on a different repository.**

## Try it yourself!

**_NOTE: It doesn't save any info. After restarting the page, all info will be
deleted._**

### Online

You can try this program online. Go to the following link:
[https://hisiste.github.io/ToDo-App-Front-End/](https://hisiste.github.io/ToDo-App-Front-End/)

### Locally

You need to have [Node](https://nodejs.org/en) installed on your computer. It is
recommended to use version 20.x or above.

You can run it locally using the following commands:

1. Clone this repository.

    ```
    git clone https://github.com/Hisiste/ToDo-App-Front-End.git
    ```

1. Enter the folder and install the dependencies.

    ```
    cd ToDo-App-Front-End && npm install
    ```

1. Run a server.

    ```
    npm run dev
    ```

    It will display an output similar to this:

    ```
    VITE v4.3.7  ready in 1080 ms

    ➜  Local:   http://localhost:5173/
    ➜  Network: use --host to expose
    ➜  press h to show help
    ```

    There you have your URL!

## Goals

The program currently has/lacks the following functionality:

-   [x] Create a "to do" specifying the name, a priority, and a due date.
-   [x] Ability to edit name, priority and due date for existing "to do" tasks.
    -   Be able to specify a due date or clear the due date (not interested in
        when to finish that "to do"?).
-   [ ] Be able to filter "to do's" specifying the name (or part of the name),
        the priority and if they are done/undone.
-   [x] Be able to sort the "to do's" by priority and/or due date.
    -   For example, be able to sort items where their due date is soon and sort
        them also by priority to see what tasks are more urgent or less urgent.
-   [x] Mark "to do's" as done (clicking in a checkbox) or to undone a "to do".
    -   The undone functionality is just there if there is a mistake. :D
-   [ ] Since it is possible that you can have a lot of "to do's", there's the
        need to paginate the list of "to do's".
-   [ ] Ability to know, in average, the time between creation and done for all
        "to do's". This should be shown in general for all done "to do's" and
        also grouped by priority.

## How to use

### Creating to do's

You will see a button with the text `+ New To Do`. After clicking it, a modal
should appear with the following inputs:

-   `ID` $\rightarrow$ The id it will be assigned. It is automatic and disabled
    by default.
-   `Text` $\rightarrow$ The name of the to do.
-   `Due date` $\rightarrow$ The date for which the to do is due. **It only
    accepts days and not hours, minutes nor seconds.**
-   `Completed` $\rightarrow$ If the to do is already completed or not.
-   `Priority` $\rightarrow$ The priority of the to do. It could be either
    _Low_, _Medium_ or _High_.

### Editing / deleting a to do

You can find a table where every to do is shown. Every row corresponds to a
single task. The last column (`Actions`) is where you can find two buttons for
each row:

-   `Edit` $\rightarrow$ A modal should appear in the same layout as if you
    where creating a new to do. Except that the fields are already filled with
    the corresponding info of the current to do. After accepting the new values,
    the to do will be updated.
-   `Delete` $\rightarrow$ After clicking this button, the to do will be
    instantly deleted. You won't be prompted before. **This is not reversible.**

### Sorting the to do's

On the table's heading you will find `Priority` and `Due Date`. Click on any of
those headings to start sorting the to do's. The symbol next to the column name
will start changing, telling the current way of sorting. The possible sorting's
symbols are as follows:

-   **<span>&#8283;</span>** $\rightarrow$ Currently not sorting.
-   **<span>&#8593;</span>** $\rightarrow$ Sorting in descending order. Highest
    goes top.
-   **<span>&#8595;</span>** $\rightarrow$ Sorting in ascending order. Lowest
    goes top.
