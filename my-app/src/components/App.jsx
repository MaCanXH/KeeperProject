import Header from "./Header";
import Footer from "./Footer";
import "../../public/style.css";
import { useState } from "react";
import UserPage from "./UserPage";
import Login from "./Login";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState('');

  return (
    <div>
      <Header />
      {isAuthenticated ? (
        <UserPage user={currentUser}/>
      ) : (
        <Login AuthenticationFlag={setIsAuthenticated} LoginUser={setCurrentUser}/>
      )}
      <Footer />
    </div>
  );
}
