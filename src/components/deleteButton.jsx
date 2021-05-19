import React from "react";
import { useHistory } from "react-router-dom";
import { deleteGuide } from "../tools";

let confirm = false;

const DeleteButton = (props) => {
  let history = useHistory();
  function onDelete(e) {
    if (confirm) {
      deleteGuide(props.id, props.token.jwtToken, window);
      history.push("/");
      history.go();
      confirm = false;
    } else {
      e.target.innerHTML = "Confirm Delete";
      confirm = true;
    }
    // console.log(props.id)
  }

  return (
    <div className="deleteButton" onClick={onDelete}>
        {props.prompt ? props.prompt : "Delete Guide"}
      </div>
  );
};

export default DeleteButton;
