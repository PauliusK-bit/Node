import { SubjectProps } from "./types";

const SubjectItem = ({ data }: SubjectProps) => {
  const { name, lecturersData } = data;

  return (
    <>
      <h1>{name}</h1>
      <ul>
        {lecturersData.length > 0 ? (
          <ul>
            {lecturersData.map((lecturer) => (
              <li key={lecturer._id}>
                {lecturer.name} {lecturer.surname}
              </li>
            ))}
          </ul>
        ) : (
          "This subject doesn't have lecturer"
        )}
      </ul>
    </>
  );
};

export default SubjectItem;
