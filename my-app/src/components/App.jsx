import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import "../../public/style.css";
import { useState, useEffect } from "react";
import CreateArea from "./CreateArea";
import axios from 'axios';

export default function App() {
  const [noteList, setNoteList] = useState([]);

  const fetchAPI = async() => {
    const response = await axios.get("http://localhost:3000/");
    console.log(response.data.hello);
  }

  useEffect(() => {
    fetchAPI();
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
      <Header />
      <CreateArea AddNotes={AddNotes} />
      {noteList.map((content, id) => (
        <Note
          key={id}
          title={content.title}
          content={content.content}
          DeleteNotes={() => DeleteNotes(id)}
        />
      ))}
      <Footer />
    </div>
  );
}
