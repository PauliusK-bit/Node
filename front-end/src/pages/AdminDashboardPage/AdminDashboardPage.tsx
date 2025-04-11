import { useAuth } from "../../components/AuthContext";
import ROLES from "../../config/roles";

const AdminDashboardPage = () => {
  const { user } = useAuth();

  if (user?.role !== ROLES.ADMIN) {
    return <p>Access denied</p>;
  }

  return <div>AdminDashboard page</div>;
};

export default AdminDashboardPage;
