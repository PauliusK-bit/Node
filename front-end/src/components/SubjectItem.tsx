import { SubjectProps } from "./types";

const SubjectItem = ({ data }: SubjectProps) => {
  const { name } = data;

  return (
    <>
      <h1>{name}</h1>
    </>
  );
};

export default SubjectItem;
