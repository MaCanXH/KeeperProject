import { useState, useEffect } from "react";
import CreateArea from "./CreateArea";
import Note from "./Note";
import axios from "axios";

export default function UserPage(props) {
  const [noteList, setNoteList] = useState([]);
  async function fetchUserNotes() {
    const response = await axios.get("http://localhost:3000/notes", {
      params: {
        user : props.user,
      }
    });
    // console.log(response.data);
    setNoteList(response.data);
  }

  useEffect(() => {
    fetchUserNotes();
  }, []);

  function AddNotes(note) {
    setNoteList([...noteList, note]);
  }

  function DeleteNotes(id) {
    setNoteList(
      noteList.filter((note, curIdx) => {
        return id !== curIdx;
      })
    );
  }

  return (
    <div>
      <CreateArea AddNotes={AddNotes} />
      {noteList.map((content, id) => (
        <Note
          key={id}
          title={content.title}
          content={content.content}
          DeleteNotes={() => DeleteNotes(id)}
        />
      ))}
    </div>
  );
}
