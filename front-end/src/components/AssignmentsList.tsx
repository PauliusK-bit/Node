import { useEffect, useState } from "react";
import { Assignment } from "./types";

import AssignmentItem from "./AssignmentItem";
import api from "../api";

const AssignmentsList = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    const fetchAssignmentsData = async () => {
      try {
        const { data } = await api.get("/assignments");
        setAssignments(data);
      } catch (err) {
        console.log("Failed fetching assignments", err);
      }
    };
    fetchAssignmentsData();
  }, []);

  return (
    <>
      <div>
        {assignments.map((assignment, index) => (
          <AssignmentItem key={index} data={assignment} />
        ))}
      </div>
    </>
  );
};

export default AssignmentsList;
