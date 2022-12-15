export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

// export interface SNButton {
//   id: number
//   icon: string
//   url: string
// }

export interface SNButton {
  id: number
  icon: string
  url: string
  name: string
}

export interface Announcement {
  name: number,
  url: string
  title: string
  description: string
  image: string
  color: string
}
