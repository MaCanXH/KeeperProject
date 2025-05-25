import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import "../../public/style.css";
import { useState } from "react";
import CreateArea from "./CreateArea";

export default function App() {
  const [noteList, setNoteList] = useState([]);

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
