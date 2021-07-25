import { Injectable, HttpStatus, HttpException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ChatsResponseInterface } from './interfaces/chatsResponse.interface'
import { UserEntity } from 'src/user/user.entity'
import { ConversationEntity } from 'src/conversation/conversation.entity'
import { ChatType } from './types/chat.type'
import { UserService } from 'src/user/user.service'
import { ConversationService } from 'src/conversation/conversation.service'
import { ChatResponseInterface } from './interfaces/chatResponse.interface'

@Injectable()
export class ChatService {
    constructor(
        private userService: UserService,
        private conversationService: ConversationService
    ) {}

    getUserConversations(user: UserEntity): ChatType[] {
        const chats: ChatType[] = []
        
        user.conversations.map(conversation => {
            chats.push({
                id: conversation.id,
                name: conversation.conversationName,
                image: conversation.image,
                numberOfMissed: 0,
                status: 'online',
                type: this.conversationService.getTypeConversation(user, conversation)
            })
        })
        return chats
    }

    getUserFriends(user: UserEntity): ChatType[] {
        const chats: ChatType[] = []

        user.friends.map(friend => {
            chats.push({
                id: friend.id,
                name: friend.username,
                image: friend.image,
                numberOfMissed: 0,
                status: 'online',
                type: this.userService.getTypeUser(user, friend)
            })
        })
        return chats
    }

    getUsersConversation(user: UserEntity, conversation: ConversationEntity): ChatType[] {
        const chats: ChatType[] = []

        conversation.users.map(userConversation => {
            if (userConversation.id == user.id) {
                return
            }
            chats.push({
                id: userConversation.id,
                name: userConversation.username,
                image: userConversation.image,
                status: 'online',
                numberOfMissed: 0,
                type: this.userService.getTypeUser(user, userConversation)
            })
        })
        return chats
    }

    buildChatsResponse(chats: ChatType[]): ChatsResponseInterface {
        return {
            chats: chats
        }
    }

    buildChatResponse(chat: ChatType): ChatResponseInterface {
        return {
            chat: chat
        }
    }
}
