import React, { useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";

const Login: React.FC = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        history.push("/");
      })
      .catch((e: Error) => alert(e.message));
  };

  const register = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        if(auth){
          history.push("/");
        }
      })
      .catch((e: Error) => {
        alert(e.message);
      });
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="amazon logo"
        />
      </Link>

      <div className="login__container">
        <h1>Sign in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button className="login__signinButton" type="submit" onClick={login}>
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to Amazon's Conditions of Use & Sale. Please
          see our Privacy Notice, our Cookies Notice and our internet-Based Ads
          Notice.
        </p>
        <button className="login__registerButton" onClick={register}>
          Create Your Amazon Account
        </button>
      </div>
    </div>
  );
};

export default Login;
