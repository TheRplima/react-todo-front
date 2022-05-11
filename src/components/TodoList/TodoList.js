import React, { Component } from "react";
import { Button } from "reactstrap";
import TodoItem from "../TodoItem/TodoItem";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#F2AA4CFF",
    },
  },
});

export default class TodoList extends Component {
  render() {
    const {
      showTaskData,
      clearList,
      handleDelete,
      todoDeleteMsg,
      editTodo,
    } = this.props;
    let taskData = [];
    if (showTaskData.length) {
      taskData = showTaskData.map((task) => {
        return (
          <TodoItem
            key={task.id}
            title={task.title}
            description={task.description}
            handleDelete={() => {
              handleDelete(task.id);
            }}
            todoDeleteMsg={todoDeleteMsg}
            editTodo={() => {
              editTodo(task.id, task.title, task.description);
            }}
          />
        );
      });
    } else {
      taskData = (
        <ThemeProvider theme={theme}>
          <li className="list-group-item d-flex text-capitalize justify-content-between">
            <div className="row flex-fill">
              <div className="col-md-12 text-center">You have no assigned taks</div>
            </div>
          </li>
        </ThemeProvider>
      );
    }
    return (
      <ul className="list-group my-2">
        {todoDeleteMsg !== "" &&
        <div className="alert alert-danger mt-4" role="alert">{todoDeleteMsg}</div>}
        <h3 className="text-capitalize">Todo List </h3>
        <li className="list-group-item d-flex text-capitalize justify-content-between bg-dark bg-gradient text-light">
          <div className="row flex-fill">
            <div className="col-md-3">Task</div>
            <div className="col-md-7">Description</div>
            <div className="col-md-2">Actions</div>
          </div>
        </li>
        {taskData}
        <Button className="mt-2" color="danger" onClick={clearList}>
          Clear all
        </Button>
      </ul>
    );
  }
}