import React, { Component } from "react";
import { Button } from "reactstrap";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F2AA4CFF",
    },
  },
});

export default class EditTodo extends Component {
  render() {
    return (
      <div>
        <Dialog
          fullWidth
          open={this.props.editTaskDataModal}
          onClose={this.props.onChangeEditTodoHandler}
          modal="false"
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Update Todo</DialogTitle>
          <DialogContent>
            <div className="input-field-container py-2">
              <ThemeProvider theme={theme}>
                <TextField
                  autoFocus
                  type="text"
                  name="title"
                  label="Task Title"
                  placeholder="Task Title"
                  value={this.props.editTaskData.title}
                  onChange={this.props.onChangeEditTodoHandler}
                  className="task-title"
                  color="primary"
                  variant="outlined"
                  style={{ width: "35%" }}
                />
                <TextField
                  type="text"
                  name="description"
                  label="Task description"
                  placeholder="Task description"
                  value={this.props.editTaskData.description}
                  onChange={this.props.onChangeEditTodoHandler}
                  color="primary"
                  variant="outlined"
                  style={{ width: "60%" }}
                />
              </ThemeProvider>
            </div>
          </DialogContent>
          {this.props.successTodoUpdatedMsg !== "" &&
            <div className="alert alert-success mt-4" role="alert">{this.props.successTodoUpdatedMsg}</div>}
          <DialogActions>
            <Button onClick={this.props.toggleEditTaskModal} color="primary">
              Cancel
            </Button>
            <Button
              onClick={this.props.updateTodo}
              color="success"
              className="font-weight-bold add-task"
            >
              UPDATE
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}