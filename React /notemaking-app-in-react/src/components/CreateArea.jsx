import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Slide from "@material-ui/core/Slide";
// Designing part

function CreateArea(props) {
  // Designing part
  const [checked, setChecked] = React.useState(false);

  // For hiding everything on the start
  const [isHidden, hiddenStatus] = React.useState(true);

  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  function handleChange(event) {
    // Get the name and the value of the input element
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    setChecked(false);
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }

  return (
    <div>
      <form className="create-note">
        <input
          autoComplete="off"
          name="title"
          onClick={() => {
            setChecked(true);
            // Show Everything now the user has clicked on title
            hiddenStatus(false);
          }}
          onChange={handleChange}
          value={note.title}
          placeholder={isHidden ? "Take a note..." : "title"}
        />
        <textarea
          name="content"
          style={{ display: isHidden && "none" }}
          onClick={() => setChecked(true)}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <Slide direction="up" in={checked} mountOnEnter unmountOnExit>
          <Fab style={{ display: isHidden && "none" }} onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Slide>
      </form>
    </div>
  );
}

export default CreateArea;
