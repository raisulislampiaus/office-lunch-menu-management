import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      history.push("/home");
      
    } catch (error) {
      alert("Error logging in");
    }
  };

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button className="btn22" type="submit">
        Login
      </button>
      <div>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </form>
     
  </div>
  );
};

export default Login;
