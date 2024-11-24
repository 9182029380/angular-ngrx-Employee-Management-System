export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  salary: number;
  joiningDate: Date;
  address: string;
  skills: string[];
  photo: string;
  about: string;
  reportingManagerId: number | null;
}