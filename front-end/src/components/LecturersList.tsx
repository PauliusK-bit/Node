import { useEffect, useState } from "react";
import { Lecturer } from "./types";
import axios from "axios";
import { API_URL } from "../api/config";
import LecturerItem from "./LecturerItem";

const LecturersList = () => {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);

  useEffect(() => {
    const fetchLecturersData = async () => {
      try {
        const { data } = await axios(`${API_URL}/lecturers`);
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
        {lecturers.map((lecturer, index) => (
          <LecturerItem key={index} data={lecturer} />
        ))}
      </div>
    </>
  );
};

export default LecturersList;
