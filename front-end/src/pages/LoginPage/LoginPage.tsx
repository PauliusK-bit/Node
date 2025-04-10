import { ChangeEvent, useState } from "react";
import { useAuth } from "../../components/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router";
import { API_URL } from "../../components/config";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const userEmailHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const userPasswordHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const loginHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const loginInfo = { email, password };
      const res = await axios.post(`${API_URL}/users/login`, loginInfo);

      const { token } = res.data;

      if (token) {
        login(token);
        navigate("/profile");
      }
    } catch (error) {
      console.log("Failed to login", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginHandler}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
