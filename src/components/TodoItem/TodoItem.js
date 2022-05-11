import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const TodoItem = (props) => {
  const { title, description, handleDelete, editTodo } = props;
  return (
    <li className="list-group-item d-flex text-capitalize justify-content-between my-2">
      <div className="d-flex">
        <b style={{ marginRight: "100px" }}>{title}</b>
        <h6>{description}</h6>
      </div>
      <div className="todo-icons">
        <span className="mx-2 text-success" onClick={editTodo}>
          <FontAwesomeIcon icon={faPencilAlt} />
        </span>
        <span className="mx-2 text-danger" onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </span>
      </div>
    </li>
  );
};

export default TodoItem;