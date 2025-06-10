import Header from "./Header";
import Footer from "./Footer";
import "../../public/style.css";
import { useState, useEffect } from "react";
import UserPage from "./UserPage";
import Login from "./Login";
// import axios from "axios";

export default function App() {
  const [noteList, setNoteList] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const fetchAPI = async() => {
  //   const response = await axios.get("http://localhost:3000/");
  //   console.log(response.data.hello);
  // }

  // useEffect(() => {
  //   fetchAPI();
  // }, []);

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
      {isAuthenticated ? (
        <UserPage />
      ) : (
        <Login AuthenticationFlag={setIsAuthenticated} />
      )}
      <Footer />
    </div>
  );
}
