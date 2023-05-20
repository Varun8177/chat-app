import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const Login = () => {
  const [err, setError] = useState(false);
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);
    const email = e.target[0].value;
    const password = e.target[1].value;
    if (email && password) {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log(user);
        setLoad(false);
        navigate("/");
      } catch (error) {
        const errorMessage = error.message;
        setError(true);
        alert(errorMessage);
        setLoad(false);
      }
    } else {
      alert("Please fill details to continue");
      setLoad(false);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">My Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button disabled={load}>Sign in</button>
        </form>
        {err && <span>Something went wrong</span>}
        <p>
          You don't have an account? <Link to={"/register"}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
