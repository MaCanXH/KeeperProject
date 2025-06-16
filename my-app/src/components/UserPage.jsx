import { useState, useEffect } from "react";
import CreateArea from "./CreateArea";
import Note from "./Note";
import axios from "axios";

export default function UserPage(props) {
  const [noteList, setNoteList] = useState([]);
  const [username, setUsername] = useState('');

  async function fetchUserNotes() {
    try {
      const response = await axios.get("http://localhost:3000/notes",
    );
      setUsername(response.data.username);
      setNoteList(response.data.notes);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchUserNotes();
  }, []);

  async function AddNotes(note) {
    // # the following commented approach will create an in-data note on react, not the actual note from the databse
    // const newNote = await axios.post("http://localhost:3000/add", { note });
    // setNoteList([...noteList, newNote.data[0]]);

    try {
      await axios.post("http://localhost:3000/add", { note });
      fetchUserNotes();
      console.log("successfully added note");
    } catch (err) {
      console.log(err);
    }
  }

  async function DeleteNotes(id) {
    // console.log("remove id :", id);
    // setNoteList(
    //   noteList.filter((note) => {
    //     console.log("currrent id:", note.id);
    //     return id !== note.id;
    //   })
    // );
    try {
      await axios.post("http://localhost:3000/delete", { id });
      fetchUserNotes();
      console.log("successfully deleted note id:", id);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h1 className="user-info">Welcome Back, </h1>
      <p className="user-info">{username}</p>
      <CreateArea
        AddNotes={AddNotes}
        currentPage={props.currentPage}
      />
      {noteList.map((content, keyId) => (
        <Note
          key={keyId}
          id={content.id}
          title={content.title}
          content={content.content}
          DeleteNotes={() => DeleteNotes(content.id)}
        />
      ))}
    </div>
  );
}
