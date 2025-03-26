import { useEffect, useState } from "react";
import { Student } from "./types";
import axios from "axios";
import { API_URL } from "../api/config";
import StudentItem from "./StudentItem";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StudentsList = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [limit, setLimit] = useState(2);

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const { data } = await axios(`${API_URL}/students?_limit=${limit}`);

        setStudents(data);
      } catch (err) {
        console.log("Something went wrong fetching students", err);
      }
    };
    fetchStudentsData();
  }, [limit]);

  return (
    <div>
      <label>
        Rodyti studentų:
        <select
          value={limit}
          onChange={(event) => setLimit(Number(event.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </label>
      <CardContainer>
        {students.map((student, index) => (
          <StudentItem key={index} data={student} />
        ))}
      </CardContainer>
    </div>
  );
};

export default StudentsList;
