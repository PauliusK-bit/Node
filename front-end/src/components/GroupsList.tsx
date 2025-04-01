import { useEffect, useState } from "react";
import { Group } from "./types";
import axios from "axios";
import { API_URL } from "../api/config";
import GroupItem from "./GroupItem";

const GroupsList = () => {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    const fetchGroupsData = async () => {
      try {
        const { data } = await axios(`${API_URL}/groups`);
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
