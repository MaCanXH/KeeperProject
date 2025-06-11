import { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from '@mui/icons-material/Logout';
import Zoom from "@mui/material/Zoom";

export default function CreateArea(props) {
  const [note, setNote] = useState({
    title: "",
    content: "",
  });

  const [isExpanded, setIsExpanded] = useState(false);

  function handleChange(event) {
    setNote({ ...note, [event.target.name]: event.target.value });
  }

  function handleClick() {
    props.AddNotes(note);
    setNote({ title: "", content: "" });
  }

  function handleLogout() {
    props.AuthenticationFlag(false);
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
          rows={isExpanded ? "3" : "1"}
          onChange={handleChange}
          value={note.content}
          onClick={Expand}
        />
        <Zoom in={isExpanded} className="add-button">
          <Fab onClick={handleClick}>
            <AddIcon />
          </Fab>
        </Zoom>

        <Zoom in={isExpanded} className="logout-button">
          <Fab onClick={handleLogout}>
            <LogoutIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}
