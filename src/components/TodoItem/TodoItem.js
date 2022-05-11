import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const TodoItem = (props) => {
  const { title, description, handleDelete, editTodo } = props;
  return (
    <li className="list-group-item d-flex text-capitalize justify-content-between">
      <div className="row flex-fill align-items-center">
        <div className="col-md-3">{title}</div>
        <div className="col-md-7">{description}</div>
        <div className="col-md-2 text-center">
          <span style={{cursor:"pointer"}} className="mx-2 text-success" onClick={editTodo}>
            <FontAwesomeIcon icon={faPencilAlt} />
          </span>
          <span style={{cursor:"pointer"}} className="mx-2 text-danger" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </span>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;