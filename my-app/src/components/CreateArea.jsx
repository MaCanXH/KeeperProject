import { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Zoom from "@mui/material/Zoom";

function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
  // const [noteTitle, setTitle] = useState("");
  // const [noteContent, setContent] = useState("");

  // function handleChange(event) {
  //   event.target.name === "title"
  //     ? setTitle(event.target.value)
  //     : setContent(event.target.value);
  // }

  const [isExpanded, setIsExpanded] = useState(false);

  function handleChange(event) {
    setNote({ ...note, [event.target.name]: event.target.value });
  }

  function handleClick(event) {
    // setTitle("");
    // setContent("");
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
