import React from "react";
import DeleteSharpIcon from "@material-ui/icons/DeleteSharp";
import Fab from "@material-ui/core/Fab";
import Slide from "@material-ui/core/Slide";
//

function Note(props) {
  const [checked, handleCheck] = React.useState(true);
  function handleClick() {
    props.onDelete(props.id);
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Fab onClick={handleClick}>
          {/* Delete button */}
          <DeleteSharpIcon />
        </Fab>
      </Slide>
    </div>
  );
}

export default Note;
