import { Injectable, HttpStatus, HttpException } from '@nestjs/common'
import { ConversationEntity } from './conversation.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateConversationDto } from './dto/createConversationDto'
import { UserEntity } from 'src/user/user.entity'

import { ChatType } from 'src/chat/types/chat.type'
import { ChatResponseInterface } from 'src/chat/interfaces/chatResponse.interface'
import { ChatEntity } from 'src/chat/chat.entity'

@Injectable()
export class ConversationService {
    constructor(
        @InjectRepository(ConversationEntity)
        private readonly conversationReposity: Repository<ConversationEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(ChatEntity)
        private readonly chatRepository: Repository<ChatEntity>
    ) {}

    async createConversation(createConversationDto: CreateConversationDto, adminConversation: UserEntity): Promise<ConversationEntity> {
        const conversation = await this.conversationReposity.findOne({
            conversationName: createConversationDto.conversationName
        })
        if (conversation) {
            throw new HttpException({
                errors: {
                    conversationName: 'has already been taken'
                }
            }, HttpStatus.UNPROCESSABLE_ENTITY)
        }
        let newConversation = new ConversationEntity()
        Object.assign(newConversation, createConversationDto)
        newConversation.mainAdministrator = adminConversation
        newConversation.administrators = [adminConversation]
        let newChat = new ChatEntity()
        newChat.users = [adminConversation]
        newConversation.chat = newChat
        await this.chatRepository.save(newChat)
        newConversation = await this.conversationReposity.save(newConversation)
        adminConversation.conversations.push(newConversation)
        await this.userRepository.save(adminConversation)
        return newConversation
    }

    isAdminConversation(user: UserEntity, conversation: ConversationEntity): boolean {
        if (user.position === 'GOD') {
            return true
        }
        if (user.position === 'Owner') {
            return true
        }
        let index = conversation.administrators.findIndex(admin => admin.id === user.id)
        if (index === -1) {
            return false
        }
        return true
    }

    async findById(conversationID: number): Promise<ConversationEntity> {
        return await this.conversationReposity.findOne(conversationID, {
            relations: ['blackListUsers', 'administrators']
        })
    }

    async findAll(): Promise<ConversationEntity[]> {
        return await this.conversationReposity.find()
    }

    getTypeConversation(user: UserEntity, conversation: ConversationEntity): 'chat' | 'chatOpen' | 'chatBlocked' {
        const isMyConversation = user.conversations.findIndex(conversationItem => conversationItem.id === conversation.id) !== -1
        if (isMyConversation) {
            return 'chat'
        }
        if (conversation.accessCode) {
            return 'chatBlocked'
        }
        return 'chatOpen'
    }

    getConversation(user: UserEntity, conversation: ConversationEntity): ChatType {
        const chat: ChatType = {
            id: conversation.id,
            name: conversation.conversationName,
            image: conversation.image,
            numberOfMissed: 0,
            status: 'online',
            type: this.getTypeConversation(user, conversation)
        }
        return chat
    }

    buildConversationResponse(chat: ChatType): ChatResponseInterface {
        return {
            chat: chat
        }
    }
}
