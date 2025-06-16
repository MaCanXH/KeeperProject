import { useState } from "react";
import axios from "axios";
import { Alert } from "@mui/material";

export default function Register(props) {
  const [registeBbuttonColor, setRegisterButtonColor] = useState({
    backgroundColor: "white",
    color: "#f5ba13",
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [match, setMatch] = useState(true);
  const [exist, setExist] = useState(true);

  async function handleRegister(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      setMatch(false);
      setExist(true);
    } else {
      try {
        const response = await axios.post("https://keeperproject-9m43.onrender.com//register", {
          username,
          password,
        });
        if (response.data.registered) {
          alert("Registerd success!");
          props.currentPage("Login");
        } else {
          setExist(false);
          setMatch(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <div>
      <form className="login-form" onSubmit={handleRegister}>
        <input
          className="login-field"
          type="text"
          name="username"
          placeholder="Email"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          className="login-field"
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="off"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          className="login-field"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          autoComplete="off"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <button
          style={registeBbuttonColor}
          onMouseOver={() => {
            setRegisterButtonColor({
              backgroundColor: "#f5ba13",
              color: "white",
            });
          }}
          onMouseOut={() => {
            setRegisterButtonColor({
              backgroundColor: "white",
              color: "#f5ba13",
            });
          }}
          className="login-button"
          type="submit"
        >
          Register
        </button>
      </form>
      <p className="login-warning" hidden={exist}>
        username already exist
      </p>
      <p className="login-warning" hidden={match}>
        password does not match
      </p>
    </div>
  );
}
