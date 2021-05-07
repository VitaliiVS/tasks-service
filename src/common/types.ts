interface IUser {
  _id: string
  username: string
  password: string
  userId: string
}

export interface IJwtPayload {
  user: IUser
  iat?: number
  exp?: number
}

export interface IJwt {
  payload: IJwtPayload
}
