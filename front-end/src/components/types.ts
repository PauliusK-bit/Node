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
