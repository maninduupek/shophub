export interface User {
  fullName: string
  email: string
}

export interface UserRecord extends User {
  password: string
}
