import { useState } from "react";
import CreateArea from "./CreateArea";
import Note from "./Note";

function UserPage() {
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

export default UserPage;
