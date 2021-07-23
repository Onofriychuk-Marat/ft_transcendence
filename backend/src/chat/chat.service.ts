import { Injectable, HttpStatus, HttpException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ChatsResponseInterface } from './types/chatsResponse.interface'
import { UserEntity } from 'src/user/user.entity'
import { ConversationEntity } from 'src/conversation/conversation.entity'
import { ChatType } from './types/chat.types'


@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(ConversationEntity)
        private readonly conversationRepository: Repository<ConversationEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async watchUserConversations(user: UserEntity): Promise<ChatType[]> {
        const chats: ChatType[] = []
        for (let i = 0; i < user.conversationsId.length; i++) {
            const conversation = await this.conversationRepository.findOne(user.conversationsId[i])
            chats.push({
                id: conversation.id,
                name: conversation.conversationName,
                image: conversation.image,
                numberOfMissed: 0,
                status: 'online'
            })
        }
        return chats
    }

    async watchUserFriends(user: UserEntity): Promise<ChatType[]> {
        const chats: ChatType[] = []
        for (let i = 0; i < user.friendsId.length; i++) {
            const friend = await this.userRepository.findOne(user.friendsId[i])
            chats.push({
                id: friend.id,
                name: friend.username,
                image: friend.image,
                numberOfMissed: 0,
                status: 'online'
            })
        }
        return chats
    }

    buildChatsResponse(chats: ChatType[]): ChatsResponseInterface {
        const chatsResponse = chats.map((chatEntity) => {
            return {
                id: chatEntity.id,
                name: chatEntity.name,
                image: chatEntity.image,
                numberOfMissed: 0,
                status: 'online' as 'online'
            }
        })
        return {
            chats: chatsResponse
        }
    }
}
