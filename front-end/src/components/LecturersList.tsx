import { useEffect, useState } from "react";
import { Lecturer } from "./types";

import LecturerItem from "./LecturerItem";
import api from "../api";

const LecturersList = () => {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);

  useEffect(() => {
    const fetchLecturersData = async () => {
      try {
        const { data } = await api.get("/lecturers");
        setLecturers(data);
      } catch (err) {
        console.log("Failed fetching lecturers", err);
      }
    };
    fetchLecturersData();
  }, []);

  return (
    <>
      <div className="lecturer">
        {lecturers.map((lecturer) => (
          <LecturerItem key={lecturer._id} data={lecturer} />
        ))}
      </div>
    </>
  );
};

export default LecturersList;
