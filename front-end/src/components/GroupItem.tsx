import { Link } from "react-router";
import { GroupProps } from "./types";

const GroupItem: React.FC<GroupProps> = ({ data }) => {
  const { name, _id } = data;

  return (
    <>
      <div>
        <h3>{name}</h3>
        <Link to={`/groups/${_id}`}>Grupes informacija</Link>
      </div>
    </>
  );
};

export default GroupItem;
