//stylist model
export interface User{
  id: number
  image?: string,
  bussinessName?: string;
  firstName: string
  lastName: string
  password: string;
  confirmPassword: string,
  email: string;
  gender: string;
  serviceType?: string;
  role: string
  region?: string
  city?:string
  phone?:number
 }