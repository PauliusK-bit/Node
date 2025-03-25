import { BrowserRouter, Route, Routes } from "react-router";
import StudentsPage from "./pages/StudentsPage/StudentsPage";
import LecturersPage from "./pages/LecturersPage/LecturersPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="students" element={<StudentsPage />} />
          <Route path="lecturers" element={<LecturersPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
