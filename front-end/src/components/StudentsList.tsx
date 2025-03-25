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

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const { data } = await axios(`${API_URL}/students`);

        setStudents(data);
      } catch (err) {
        console.log("Something went wrong fetching students", err);
      }
    };
    fetchStudentsData();
  }, []);

  return (
    <CardContainer>
      {students.map((student, index) => (
        <StudentItem key={index} data={student} />
      ))}
    </CardContainer>
  );
};

export default StudentsList;
