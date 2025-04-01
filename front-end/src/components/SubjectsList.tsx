import { useEffect, useState } from "react";
import { Subject } from "./types";
import axios from "axios";
import { API_URL } from "../api/config";
import SubjectItem from "./SubjectItem";

const SubjectsList = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const fetchSubjectsData = async () => {
      try {
        const { data } = await axios(`${API_URL}/subjects`);
        setSubjects(data);
      } catch (err) {
        console.log("Failed fetching subjects", err);
      }
    };
    fetchSubjectsData();
  }, []);

  return (
    <>
      <div>
        {subjects.map((subject) => (
          <SubjectItem key={subject._id} data={subject} />
        ))}
      </div>
    </>
  );
};

export default SubjectsList;
