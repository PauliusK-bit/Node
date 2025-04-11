import { useState } from "react";
import { useAuth } from "../../components/AuthContext";
import { Navigate } from "react-router";
import api from "../../api";

const ProfilePage = () => {
  const { user, loading, logout, updateUser } = useAuth();

  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);

  if (loading) {
    return <p>Laoding...</p>;
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  const isExpired = user.exp * 1000 < Date.now();

  if (isExpired) {
    logout();
    return <Navigate to={"/login"} />;
  }

  const usernameHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value);
  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { data } = await api.put("/users/update", { username, email });
      const { user } = data;
      updateUser(user);
    } catch (err) {
      console.log("Something went wrong with update...", err);
    }
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <p>{user.username}</p>
      <p>{user.email}</p>
      <p>Role: {user.role}</p>

      <form onSubmit={submitHandler}>
        <div className="form-control">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={usernameHandler}
          />
        </div>
        <div className="form-control">
          <label htmlFor="username">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={emailHandler}
          />
        </div>
        <button type="submit">Edit User</button>
      </form>
    </div>
  );
};
export default ProfilePage;
