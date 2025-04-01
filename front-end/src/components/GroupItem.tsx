import { GroupProps } from "./types";

const GroupItem = ({ data }: GroupProps) => {
  const { name, studentsData } = data;

  return (
    <>
      <div>
        <h3>{name}</h3>
        <h4>Students:</h4>
        <ul>
          {studentsData.length > 0 ? (
            <ul>
              {studentsData.map((student) => (
                <li key={student._id}>
                  {student.name} {student.surname} {student.email}
                </li>
              ))}
            </ul>
          ) : (
            "There are no students in this group"
          )}
        </ul>
      </div>
    </>
  );
};

export default GroupItem;
