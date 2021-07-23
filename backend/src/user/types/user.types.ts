import { UserEntity } from "../user.entity";

export type UserType = Omit<UserEntity, 'hashPassword' | 'chats' | 'blackListchats' | 
                                        'friendsId' | 'blackListUsersId' | 'friendsRequests'>