import { BrowserRouter, Route, Routes } from "react-router";
import StudentsPage from "./pages/StudentsPage/StudentsPage";
import LecturersPage from "./pages/LecturersPage/LecturersPage";
import AssignmentsPage from "./pages/AssignmentsPage/AssignmentsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="students" element={<StudentsPage />} />
          <Route path="lecturers" element={<LecturersPage />} />
          <Route path="assignments" element={<AssignmentsPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
