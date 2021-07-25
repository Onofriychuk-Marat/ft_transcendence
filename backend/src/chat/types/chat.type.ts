import { TypeConversationType } from "./typeConversation.type";
import { TypeUserType } from "./typeUser.type";

export type ChatType = {
    id: number,
    name: string,
    image: string,
    numberOfMissed: number,
    status: 'online' | 'offline',
    type: TypeUserType | TypeConversationType
}