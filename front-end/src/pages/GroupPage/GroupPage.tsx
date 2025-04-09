import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../../api";
import { Group, Student } from "../../components/types";

const GroupPage = () => {
  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const groupData = await api.get(`/groups/${id}`);
        setGroup(groupData.data);
        const studentsData = await api.get(`/groups/${id}/students`);
        setStudents(studentsData.data);
      } catch (error) {
        console.log("Something went wrong", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!group) {
    return <div>No group found.</div>;
  }

  return (
    <div>
      <h1>{group.name}</h1>
      <h2>Students:</h2>
      {students.length > 0 ? (
        <ul>
          {students.map((student) => (
            <li key={student._id}>{student.name}</li>
          ))}
        </ul>
      ) : (
        <p>No students found for this group.</p>
      )}
    </div>
  );
};

export default GroupPage;
