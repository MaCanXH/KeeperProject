import DeleteIcon from "@mui/icons-material/Delete";

export default function Note(prop) {
  return (
    <div className="note">
      <h1>{prop.title}</h1>
      <p>{prop.content}</p>
      <button onClick={prop.DeleteNotes}>
        <DeleteIcon />
      </button>
    </div>
  );
}
