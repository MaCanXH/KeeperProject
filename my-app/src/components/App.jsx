import Header from "./Header";
import Footer from "./Footer";
import "../../public/style.css";
import { useState, useEffect } from "react";
import UserPage from "./UserPage";
import Login from "./Login";
import Register from "./Register";
import axios from "axios";

export default function App() {
  const [currentPage, setCurrentPage] = useState("Login");
  const components = {
    Login,
    Register,
    UserPage,
  };
  const Main = components[currentPage];

  async function fetchHome() {
    try {
      // CHANGE TO LOCAL HOST FOR DEVELOPMENT
      const inUse = await axios.get("https://keeperproject-9m43.onrender.com/home", {
        withCredentials: true
      });
      if (inUse.data.inUse) {
        setCurrentPage('UserPage');
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchHome();
  }, []);

  return (
    <div>
      <Header />
      <Main currentPage={setCurrentPage} />
      <Footer />
    </div>
  );
}
