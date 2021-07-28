import { UserEntity } from "../user.entity";

export type UserType = Omit<UserEntity, 'hashPassword' | 'password' |
                                        'conversations' | 'friends' |
                                        'blackListUsers' | 'friendInvitation' |
                                        'myFriendshipRequests' | 'friendChat'>
                                        & { token: string}