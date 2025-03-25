import { BrowserRouter } from "react-router";
import StudentsPage from "./pages/StudentsPage/StudentsPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <StudentsPage />
      </BrowserRouter>
    </>
  );
}

export default App;
