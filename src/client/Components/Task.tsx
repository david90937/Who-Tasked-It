import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Task = ({id, taskText, toDoListItemClicked}) => {
    return (
        <li><FontAwesomeIcon icon={faCheck} style={{cursor: "pointer"}}
        onClick={() => toDoListItemClicked(id)}/> {taskText}</li>
    );
}

export default Task;