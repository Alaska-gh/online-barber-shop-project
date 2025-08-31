export interface Appointment{
  id: number;
  fullName: string;
  phoneNum: number;
  email: string;
  stylist: string;
  service: string;
  date: string;
  time: string;
  duration: number
  notes?: string
  status?: 'pending' | 'confirmed' | 'rejected'
}