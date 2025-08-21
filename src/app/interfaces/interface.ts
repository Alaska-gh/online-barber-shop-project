//the footer model
export interface Footer{
  group: {
    title: string;
    items: string[]
  }
}

// styles model
export interface Styles{
  image?: string
  title: string
  price: number
}

// card details model
export interface CardDetails{
  image: string,
  name: string,
  comments: string
}
//stylist model
export interface User{
  id: number
  image?: string,
  shopName?: string;
  fullName: string
  password: string;
  confirmPassword: string,
  email: string;
  gender: string;
  serviceType?: string;
  role: string
 }