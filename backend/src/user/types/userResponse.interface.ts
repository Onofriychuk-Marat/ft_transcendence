import { UserType } from './user.types'

export interface UserResponseInterface {
    user: {
        id: number,
        username: string,
        image: string,
        token: string
    }
}