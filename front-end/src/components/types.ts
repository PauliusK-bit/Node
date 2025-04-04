export interface Student {
  name: string;
  surname: string;
  age: string;
  interests: string[];
  phone: string;
  email: string;
  _id: string;
  groupId: string;
  group?: {
    _id: string;
    name: string;
  };
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
  _id: string;
  subjectsData: {
    _id: string;
    name: string;
  }[];
}

export interface LecturerProps {
  data: Lecturer;
}

export interface Subject {
  name: string;
  _id: string;
  lecturersData: {
    _id: string;
    name: string;
    surname: string;
  }[];
}

export interface SubjectProps {
  data: Subject;
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

export interface Group {
  name: string;
  _id: string;
  studentsData: {
    _id: string;
    name: string;
    surname: string;
    email: string;
  }[];
}

export interface GroupProps {
  data: Group;
}
