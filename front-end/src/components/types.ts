export interface Student {
  name: string;
  surname: string;
  age: string;
  group: string;
  interests: string[];
  phone: string;
  email: string;
  id: string;
}

export interface StudentProps {
  data: Student;
}

export interface Lecturer {
  name: string;
  surname: string;
  age: string;
  phone: string;
  email: string;
  subjects: Subject[];
  id: string;
}

export interface LecturerProps {
  data: Lecturer;
}

export interface Subject {
  name: string;
  id: string;
}

export interface Assignment {
  name: string;
  date: string;
  description: string;
  id: string;
}

export interface AssignmentProps {
  data: Assignment;
}
