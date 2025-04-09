import { BrowserRouter, Route, Routes } from "react-router";
import StudentsPage from "./pages/StudentsPage/StudentsPage";
import LecturersPage from "./pages/LecturersPage/LecturersPage";
import AssignmentsPage from "./pages/AssignmentsPage/AssignmentsPage";
import GroupsPage from "./pages/GroupsPage/GroupsPage";
import SubjectsPage from "./pages/SubjectsPage/SubjectsPage";
import { AuthProvider } from "./components/AuthContext";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import HomePage from "./pages/HomePage/HomePage";
import Navigation from "./components/Navigation";
import GroupPage from "./pages/GroupPage/GroupPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="students" element={<StudentsPage />} />

            <Route path="lecturers" element={<LecturersPage />} />
            <Route path="assignments" element={<AssignmentsPage />} />
            <Route path="groups" element={<GroupsPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="groups/:id" element={<GroupPage />} />
            </Route>

            <Route path="subjects" element={<SubjectsPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
