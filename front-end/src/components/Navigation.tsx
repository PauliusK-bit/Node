import { NavLink } from "react-router";
import LogoutButton from "./LogoutButton";
import { useAuth } from "./AuthContext";

const Navigation = () => {
  const { user } = useAuth();

  return (
    <>
      <nav>
        <ul>
          {!user ? (
            <>
              <li>
                <NavLink to={"/"}>Home Page</NavLink>
              </li>
              <li>
                <NavLink to={"/students"}>Students</NavLink>
              </li>
              <li>
                <NavLink to={"/assignments"}>Assignments</NavLink>
              </li>
              <li>
                <NavLink to={"/groups"}>Groups</NavLink>
              </li>
              <li>
                <NavLink to={"/lecturers"}>Lecturers</NavLink>
              </li>
              <li>
                <NavLink to={"/subjects"}>Subjects</NavLink>
              </li>
              <li>
                <NavLink to={"/login"}>Login</NavLink>
              </li>
              <li>
                <NavLink to={"/register"}>Register</NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to={"/profile"}>Profile</NavLink>
              </li>
              <li>
                <NavLink to={"/"}>Home Page</NavLink>
              </li>
              <li>
                <NavLink to={"/students"}>Students</NavLink>
              </li>
              <li>
                <NavLink to={"/assignments"}>Assignments</NavLink>
              </li>
              <li>
                <NavLink to={"/groups"}>Groups</NavLink>
              </li>
              <li>
                <NavLink to={"/lecturers"}>Lecturers</NavLink>
              </li>
              <li>
                <NavLink to={"/subjects"}>Subjects</NavLink>
              </li>

              <LogoutButton />
            </>
          )}
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
