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