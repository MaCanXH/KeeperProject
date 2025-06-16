import { useState } from "react";
import axios from "axios";

export default function Login(props) {
  const [loginButtonColor, setLoginButtonColor] = useState({
    backgroundColor: "white",
    color: "#f5ba13",
  });

  const [registeBbuttonColor, setRegisterButtonColor] = useState({
    backgroundColor: "white",
    color: "#f5ba13",
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState(true);

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://keeperproject-9m43.onrender.com//login",
        {
          username,
          password,
        },
        { withCredentials: true }
      );
      if (response.data.validation) {
        props.currentPage("UserPage");
      } else {
        setWarning(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleRegister(event) {
    event.preventDefault();
    props.currentPage("Register");
  }

  return (
    <div>
      <form className="login-form" onSubmit={handleLogin}>
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
        <button
          style={loginButtonColor}
          onMouseOver={() => {
            setLoginButtonColor({ backgroundColor: "#f5ba13", color: "white" });
          }}
          onMouseOut={() => {
            setLoginButtonColor({ backgroundColor: "white", color: "#f5ba13" });
          }}
          className="login-button"
          type="submit"
        >
          Login
        </button>
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
          type="button"
          onClick={handleRegister}
        >
          Register
        </button>
      </form>
      <p className="login-warning" hidden={warning}>
        Incorrect username or password
      </p>
    </div>
  );
}
