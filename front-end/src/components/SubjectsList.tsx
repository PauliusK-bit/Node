import { useEffect, useState } from "react";
import { Subject } from "./types";
import SubjectItem from "./SubjectItem";
import api from "../api";

const SubjectsList = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);

  useEffect(() => {
    const fetchSubjectsData = async () => {
      try {
        const { data } = await api.get(`/subjects`);
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
