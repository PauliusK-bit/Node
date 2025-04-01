import { BrowserRouter, Route, Routes } from "react-router";
import StudentsPage from "./pages/StudentsPage/StudentsPage";
import LecturersPage from "./pages/LecturersPage/LecturersPage";
import AssignmentsPage from "./pages/AssignmentsPage/AssignmentsPage";
import GroupsPage from "./pages/GroupsPage/GroupsPage";
import SubjectsPage from "./pages/SubjectsPage/SubjectsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="students" element={<StudentsPage />} />
          <Route path="lecturers" element={<LecturersPage />} />
          <Route path="assignments" element={<AssignmentsPage />} />
          <Route path="groups" element={<GroupsPage />} />
          <Route path="subjects" element={<SubjectsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
