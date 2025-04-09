import { Navigate } from "react-router";
import { useAuth } from "../../components/AuthContext";

const ProfilePage = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Token: {token}</p>
    </div>
  );
};
export default ProfilePage;
