import { useEffect, useState } from "react";
import { Group } from "./types";

import GroupItem from "./GroupItem";
import api from "../api";

const GroupsList = () => {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const fetchGroupsData = async () => {
      try {
        const { data } = await api.get("/groups");
        setGroups(data);
      } catch (err) {
        console.log("Failed fetching groups", err);
      }
    };
    fetchGroupsData();
  }, []);

  return (
    <>
      <div>
        {groups.map((group) => (
          <GroupItem key={group._id} data={group} />
        ))}
      </div>
    </>
  );
};
export default GroupsList;
