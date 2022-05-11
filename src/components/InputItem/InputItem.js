import React, { Component } from "react";
import { Button, Container } from "reactstrap";
import TextField from "@mui/material/TextField";
import { Navigate } from "react-router-dom";
import TodoList from "../TodoList/TodoList";
import "./InputItemStyle.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import EditTodo from "../EditTodo/EditTodo";
const theme = createTheme({
  palette: {
    primary: {
      main: "#F2AA4CFF",
    },
  },
});

export default class InputItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskData: {
        title: "",
        description: "",
        status: "",
      },
      showTaskData: [],
      successAlertMsg: "",
      todoDeleteMsg: "",
      editTaskDataModal: false,
      editTaskData: {
        title: "",
        description: "",
      },
      successTodoUpdatedMsg: "",
      successCompletedMsg: "",
    };
  }
  componentDidMount() {
    this.getTaskData();
  }

  addItem = () => {
    let token = sessionStorage.getItem("token");
    var formdata = new FormData();
    formdata.append("title", this.state.taskData.title);
    formdata.append("description", this.state.taskData.description);
    var requestOptions = {
      method: "POST",
      body: formdata,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    fetch("https://young-earth-00064.herokuapp.com/api/user/todos", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          this.setState({ successAlertMsg: result.message }, () =>
            this.getTaskData()
          );
          setTimeout(() => {
            this.setState({ successAlertMsg: "" });
          }, 1500);
        }
        if (result.error === false) {
          this.setState({
            taskData: {
              title: "",
              description: "",
            },
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getTaskData() {
    let token = sessionStorage.getItem("token");
    var requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    fetch("https://young-earth-00064.herokuapp.com/api/user/todos", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          this.setState({
            showTaskData: result.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  onChangehandler = (e) => {
    const { taskData } = this.state;
    taskData[e.target.name] = e.target.value;
    console.log((taskData[e.target.name] = e.target.value));
    this.setState({ taskData });
  };
  clearList = () => {
    this.setState({
      showTaskData: [],
    });
  };
  handleDelete = (id) => {
    let token = sessionStorage.getItem("token");
    var requestOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    fetch(
      "https://young-earth-00064.herokuapp.com/api/user/todos/" + id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          this.setState(
            {
              todoDeleteMsg: result.message,
            },
            () => this.getTaskData()
          );
          setTimeout(() => {
            this.setState({ todoDeleteMsg: "" });
          }, 1500);
        }
      });
  };
  toggleEditTaskModal = () => {
    this.setState({
      editTaskDataModal: !this.state.editTaskDataModal,
    });
  };
  onChangeEditTodoHandler = (e) => {
    let { editTaskData } = this.state;
    editTaskData[e.target.name] = e.target.value;
    this.setState({ editTaskData });
  };

  editTodo = (id, title, description) => {
    this.setState({
      editTaskData: { id, title, description },
      editTaskDataModal: !this.state.editTaskDataModal,
    });
  };

  updateTodo = () => {
    let { id, title, description } = this.state.editTaskData;
    let token = sessionStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("title", title);
    urlencoded.append("description", description);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
    };

    fetch(
      "https://young-earth-00064.herokuapp.com/api/user/todos/" + id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          this.setState(
            {
              editTaskDataModal: false,
              editTaskData: { title, description },
              successTodoUpdatedMsg: result.message,
            },
            () => this.getTaskData()
          );
          setTimeout(() => {
            this.setState({
              editTaskDataModal: false,
              successTodoUpdatedMsg: ""
            });
          }, 1500);
        }
      })
      .catch((error) => console.log("error", error));
  };
  handleCompleteTodo = (task) => {
    let { id, title, description, completed } = task;
    let token = sessionStorage.getItem("token");
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("title", title);
    urlencoded.append("description", description);
    urlencoded.append("completed", !completed);

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: urlencoded,
    };

    fetch(
      "https://young-earth-00064.herokuapp.com/api/user/todos/" + id,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          this.setState(
            {
              successCompletedMsg: result.message,
            },
            () => this.getTaskData()
          );
          setTimeout(() => {
            this.setState({
              successCompletedMsg: ""
            });
          }, 1500);
        }
      })
      .catch((error) => console.log("error", error));
  };
  render() {
    const { title, description } = this.state.taskData;
    if (this.state.isLoggedIn === false) {
      return <Navigate to="/log-in" />;
    }
    return (
      <Container className="themed-container mt-5" fluid="md">
        <div className="input-field-container">
          <ThemeProvider theme={theme}>
            <div className="row flex-fill">
              <div className="col-sm-3 mb-2">
                <TextField
                  type="text"
                  name="title"
                  label="Task Title"
                  placeholder="Task Title"
                  value={title}
                  onChange={this.onChangehandler}
                  color="primary"
                  variant="outlined"
                  style={{ width: "100%" }}
                />
              </div>
              <div className="col-sm-7 mb-2">
                <TextField
                  type="text"
                  name="description"
                  label="Task description"
                  placeholder="Task description"
                  value={description}
                  onChange={this.onChangehandler}
                  color="primary"
                  variant="outlined"
                  style={{ width: "100%" }}
                />
              </div>
              <div className="col-sm-2 mb-2">
                <Button
                  color="success"
                  className="font-weight-bold add-task py-3"
                  onClick={this.addItem}
                  style={{ width: "100%" }}
                >
                  New Task
                </Button>
              </div>
            </div>
          </ThemeProvider>
        </div>
        {this.state.successAlertMsg !== "" &&
          <div className="alert alert-success mt-4" role="alert">{this.state.successAlertMsg}</div>}
        {this.state.successTodoUpdatedMsg !== "" &&
          <div className="alert alert-success mt-4" role="alert">{this.state.successTodoUpdatedMsg}</div>}
        {this.state.successCompletedMsg !== "" &&
          <div className="alert alert-success mt-4" role="alert">{this.state.successCompletedMsg}</div>}
        {/*TODO list  */}
        <TodoList
          showTaskData={this.state.showTaskData}
          clearList={this.clearList}
          handleDelete={this.handleDelete}
          todoDeleteMsg={this.state.todoDeleteMsg}
          editTodo={this.editTodo}
          toggleEditTaskModal={this.toggleEditTaskModal}
          handleCompleteTodo={this.handleCompleteTodo}
        />
        {/* Model for Edit Todo */}
        <EditTodo
          toggleEditTaskModal={this.toggleEditTaskModal}
          editTaskDataModal={this.state.editTaskDataModal}
          onChangeEditTodoHandler={this.onChangeEditTodoHandler}
          editTodo={this.editTodo}
          editTaskData={this.state.editTaskData}
          updateTodo={this.updateTodo}
          successTodoUpdatedMsg={this.state.successTodoUpdatedMsg}
        />
      </Container>
    );
  }
}