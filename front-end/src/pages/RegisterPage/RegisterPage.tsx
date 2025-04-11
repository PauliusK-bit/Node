import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";
import { API_URL } from "../../config/config";
import { toast, ToastContainer } from "react-toastify";

const isPasswordStrong = (password: string) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChars
  );
};

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [phone, setPhone] = useState("");

  const navigate = useNavigate();

  const userNameHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);
  const userEmailHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const userPasswordHandler = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);
  // const userPhoneHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   setPhone(event.target.value);
  // };

  const registerHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isPasswordStrong(password)) {
      toast.error(
        "Password must be at least 8 characters long, contain upper and lower case letters, numbers, and special characters."
      );
      return;
    }

    try {
      const userInfo = { username, email, password };
      console.log(username, email, password);
      await axios.post(`${API_URL}/users/register`, userInfo);
      navigate("/login");
    } catch (error) {
      console.log("Failed to register user:", error);
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
        {/* <div className="form-control">
          <label htmlFor="phoneNumber">Phone number:</label>
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            value={phone}
            onChange={userPhoneHandler}
          />
        </div> */}

        <button type="submit">Register User</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default RegisterPage;
