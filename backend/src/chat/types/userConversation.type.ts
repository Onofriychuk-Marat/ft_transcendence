import { ChatType } from "./chat.type";

export type UserConversationType = ChatType & {
    isAdministrator: boolean | undefined
}
