import { UserType } from './user.types'

export interface SettingsResponseInterface {
    user: {
        id: number,
        username: string,
        image: string
    }
}