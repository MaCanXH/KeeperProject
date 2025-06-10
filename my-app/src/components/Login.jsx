import { useState } from "react";
import axios from "axios";

function Login(props) {
  const [buttonColor, setButtonColor] = useState({
    backgroundColor: "white",
    color: "#f5ba13",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState(true);

  function OnButton() {
    setButtonColor({ backgroundColor: "#f5ba13", color: "white" });
  }

  function OutButton() {
    setButtonColor({ backgroundColor: "white", color: "#f5ba13" });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      if (response.data.validation) {
        props.AuthenticationFlag(true);
      } else {
        setWarning(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          className="login-field"
          type="text"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
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
          style={buttonColor}
          onMouseOver={OnButton}
          onMouseOut={OutButton}
          className="login-button"
          type="submit"
        >
          Login
        </button>
        <p className="login-warning" hidden={warning}>
          Incorrect email or password
        </p>
      </form>
    </div>
  );
}

export default Login;
