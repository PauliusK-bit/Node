import { useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

const LogoutButton = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const logoutHandler = () => {
    logout();
    navigate("/login");
  };

  return <button onClick={logoutHandler}>Logout</button>;
};

export default LogoutButton;
