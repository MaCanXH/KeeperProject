import { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [isExpanded, setIsExpanded] = useState(false);

  function handleChange(event) {
    setNote({ ...note, [event.target.name]: event.target.value });
  }

  function handleClick(event) {
    props.AddNotes(note);
    setNote({ title: "", content: "" });
    event.preventDefault();
  }

  function Expand() {
    setIsExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={note.title}
          hidden={!isExpanded}
        />
        <textarea
          name="content"
          placeholder="Take a note..."
          rows= {isExpanded? "3": "1"}
          onChange={handleChange}
          value={note.content}
          onClick={Expand}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={handleClick}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
