export interface Appointment {
  id?: string;
  fullName: string;
  phoneNum: number;
  email: string;
  stylist: string;
  service: string;
  dateTime: string;
  duration: number;
  notes?: string;
  price: number;
  status?: 'pending' | 'confirmed' | 'rejected';
}
