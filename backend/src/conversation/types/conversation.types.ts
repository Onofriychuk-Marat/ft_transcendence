import { ConversationEntity } from "../conversation.entity"

export type ConversationType = Omit<ConversationEntity, 'accessCode' | 'userId' | 'blackListUsersId' | 'isAdmin'>