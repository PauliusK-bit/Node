import { useEffect, useState } from "react";
import { Assignment } from "./types";
import axios from "axios";
import { API_URL } from "../api/config";
import AssignmentItem from "./AssignmentItem";

const AssignmentsList = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    const fetchAssignmentsData = async () => {
      try {
        const { data } = await axios(`${API_URL}/assignments`);
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
