import axios from "axios";
import { useState } from "react";

const Adminlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!email) {
      alert("Username or Email ID cannot be empty!");
    } else if (!password) {
      alert("Password cannot be empty!");
    } else if (re.test(String(email).toLowerCase)) {
      const login = {
        email: email,
        password: password,
      };
      try {
        await axios.post("http://localhost:4000/app/adminlogin", login);
      } catch (err) {
        alert(err);
      }
    } else {
      const login = {
        email: email,
        password: password,
      };
      try {
        console.log(login);
        const k = await axios.post(
          "http://localhost:4000/app/adminlogin",
          login
        );
        setEmail("");
        window.location = "/events";
      } catch (err) {
        alert(err);
      }
    }
    setPassword("");
  }

  return (
    <div className="container">
      <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
          <h1 align="center">ADMIN LOGIN PAGE</h1>
          <label>VIT Email-ID</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <input className="btn btn-block" type="submit" value="Log In"></input>
          <a href="/">Return to Home Page</a>
          <br />
          <a href="/adminreg">New User? Register Here</a>
        </div>
      </form>
    </div>
  );
};

export default Adminlogin;
