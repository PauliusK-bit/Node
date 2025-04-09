import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const userNameHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);
  const userEmailHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const userPasswordHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const registerHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const userInfo = { username, email, password };
      await axios.post(`http://localhost:3007/api/users/register`, userInfo);
      navigate("/login");
    } catch (error) {
      console.log("Failed to register", error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerHandler}>
        <div className="form-control">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={userNameHandler}
          />
        </div>

        <div className="form-control">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={userEmailHandler}
          />
        </div>

        <div className="form-control">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={userPasswordHandler}
          />
        </div>

        <button type="submit">Register User</button>
      </form>
    </div>
  );
};

export default RegisterPage;
