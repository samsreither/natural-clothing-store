import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

export const AuthPage = () => {
  return (
    <div className="auth">
      <Register />
      <Login />
    </div>
  );
};

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/user/register", {
        username,
        password,
      });
      alert("registration complete. now login.");
    } catch (err) {
      alert("theres been an error");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2> Register </h2>

        <div className="form-group">
          <label htmlFor="username"> Username: </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            type="text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password"> Password: </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="text"
          />
        </div>

        <button type="submit"> Submit </button>
      </form>
    </div>
  );
};

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [_, setCookies] = useCookies(["access_token"]); // name of cookei is "access token", token is the value

  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:3001/user/login", {
        username,
        password,
      });
      setCookies("access_token", result.data.token);
      localStorage.setItem("userID", result.data.userID);
      navigate("/")
    } catch (err) {
      alert("theres been an error");
    }
  };


  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2> Login </h2>

        <div className="form-group">
          <label htmlFor="username"> Username: </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            type="text"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password"> Password: </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="text"
          />
        </div>

        <button type="submit"> Login </button>
      </form>
    </div>
  );
};
