import { ConversationEntity } from "../conversation.entity"

export type ConversationType = Omit<ConversationEntity, 'accessCode' | 'isAdmin'>