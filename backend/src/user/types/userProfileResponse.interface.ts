import { UserType } from "./user.types"

export interface UserProfileResponseInterface {
    profile: UserType & {
        type: 'friend' | 'user' | 'userBlocked'
    }
}