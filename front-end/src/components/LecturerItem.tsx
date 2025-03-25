import { LecturerProps } from "./types";
import "./LecturerItem.css";

const LecturerItem = ({ data }: LecturerProps) => {
  const { name, surname, age, phone, email, subjects } = data;

  return (
    <>
      <div className="lecturer-card">
        <p>
          Name: {name} <span>{surname}</span>{" "}
        </p>
        <p>Age: {age}</p>
        <p>Phone: {phone}</p>
        <p>Email: {email}</p>
        <div className="subjects">
          <h4>Subjects:</h4>
          {subjects.map((subject, index) => (
            <li key={index}>{subject.name}</li>
          ))}
        </div>
      </div>
    </>
  );
};

export default LecturerItem;
