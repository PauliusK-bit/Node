import { LecturerProps } from "./types";
import "./LecturerItem.css";

const LecturerItem = ({ data }: LecturerProps) => {
  const { name, surname, age, phone, email, subjectsData } = data;

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
          <ul>
            {subjectsData.length > 0 ? (
              <ul>
                {subjectsData.map((subject) => (
                  <li key={subject._id}>{subject.name}</li>
                ))}
              </ul>
            ) : (
              "There are no current subjects"
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default LecturerItem;
