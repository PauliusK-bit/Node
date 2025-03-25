import { AssignmentProps } from "./types";

const AssignmentItem = ({ data }: AssignmentProps) => {
  const { name, date, description } = data;

  return (
    <>
      <div className="assignment">
        <h3>{name}</h3>
        <p>{date}</p>
        <p>{description}</p>
      </div>
    </>
  );
};

export default AssignmentItem;
