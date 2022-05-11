import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrashAlt, faCheck } from '@fortawesome/free-solid-svg-icons'

const TodoItem = (props) => {
  const { title, description, completed, handleDelete, editTodo, handleCompleteTodo } = props;
  return (
    <li className="list-group-item d-flex text-capitalize justify-content-between">
      <div className={`row flex-fill align-items-center${completed ? ' text-decoration-line-through' : ''}`}>
        <div className="col-md-3">{title}</div>
        <div className="col-md-7">{description}</div>
        <div className="col-md-2 text-center">
          {!completed ?
            <>
              <span style={{ cursor: "pointer" }} className="mx-2 text-success" title="Mark task as completed" onClick={handleCompleteTodo}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span style={{ cursor: "pointer" }} className="mx-2 text-warning" title="Edit task" onClick={editTodo}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </>
            :
            <>
              <span style={{ cursor: "pointer" }} className="mx-2 text-muted" title="Mark task as uncompleted" onClick={handleCompleteTodo}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className="mx-2 text-muted" title="Edit task">
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </>
          }
          <span style={{ cursor: "pointer" }} className="mx-2 text-danger" title="Delete task" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </span>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;