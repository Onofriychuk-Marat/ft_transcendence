import { ProfileType } from "./profile.type";

export type ProfileSelectUserType = ProfileType & {
    type: 'friend' | 'user' | 'userBlocked' | 'friendInvitation' | 'friendshipRequest',
    numberOfMissed: number,
	status: 'online' | 'offline'
}