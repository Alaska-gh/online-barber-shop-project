export interface Footer{
  group: {
    title: string;
    items: string[]
  }
}

export interface Styles{
  image?: string
  title: string
  price: number
  link: string
}
export interface CardDetails{
  image: string,
  name: string,
  comments: string
}

export interface Card {
  image: string,
  name: string,
  disc: string
}

export interface Stylist{
  id: number
  image?: string,
  shopName?: string;
  fullName: string
  password: string;
  confirmPassword: string,
  email: string;
  gender: string;
  serviceType: string
 }