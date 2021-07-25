import { Injectable, HttpStatus, HttpException } from '@nestjs/common'
import { ConversationEntity } from './conversation.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateConversationDto } from './dto/createConversationDto'
import { UserEntity } from 'src/user/user.entity'
import { hash } from 'bcrypt'
import { ChatType } from 'src/chat/types/chat.type'
import { ChatResponseInterface } from 'src/chat/interfaces/chatResponse.interface'

@Injectable()
export class ConversationService {
    constructor(
        @InjectRepository(ConversationEntity)
        private readonly conversationReposity: Repository<ConversationEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
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
        newConversation.adminId = adminConversation.id
        newConversation.users = [adminConversation]
        newConversation = await this.conversationReposity.save(newConversation)
        adminConversation.conversations.push(newConversation)
        await this.userRepository.save(adminConversation)
        return newConversation
    }

    async setAcessCodeForConversation(password: number | undefined, user: UserEntity, conversation: ConversationEntity): Promise<ConversationEntity> {
        if (!conversation) {
            throw new HttpException('Conversation with such id does not exist', HttpStatus.NOT_FOUND)
        }
        if (conversation.adminId !== user.id) {
            throw new HttpException('The use does not have permission to set a password', HttpStatus.FORBIDDEN)
        }
        conversation.accessCode = await hash(password, 10)
        this.conversationReposity.save(conversation)
        return conversation
    }

    async deleteAccessCodeForConversation(user: UserEntity, conversation: ConversationEntity): Promise<ConversationEntity> {
        if (!conversation) {
            throw new HttpException('Conversation with such id does not exist', HttpStatus.NOT_FOUND)
        }
        if (conversation.adminId !== user.id) {
            throw new HttpException('The use does not have permission to set a password', HttpStatus.FORBIDDEN)
        }
        conversation.accessCode = ''
        this.conversationReposity.save(conversation)
        return conversation
    }

    async leaveConversation(user: UserEntity, conversation: ConversationEntity): Promise<ConversationEntity> {
        if (!conversation) {
            throw new HttpException('Conversation with such id does not exist', HttpStatus.NOT_FOUND)
        }
        let index = conversation.users.findIndex(userItem => userItem.id === user.id)
        if (index !== -1) {
            conversation.users.splice(index, 1)
            this.conversationReposity.save(conversation)
        }
        index = user.conversations.findIndex(conversationItem => conversationItem.id === conversation.id)
        if (index !== -1) {
            user.conversations.splice(index, 1)
            this.userRepository.save(user)
        }
        if (conversation.adminId !== user.id) {
            return conversation
        }
        if (conversation.users.length === 0) {
            this.conversationReposity.delete(conversation)
        } else {
            conversation.adminId = conversation.users[0].id
        }
        this.conversationReposity.save(conversation)
        return conversation
    }

    async kickUserOutOfChat(user: UserEntity, selectUser: UserEntity, conversation: ConversationEntity): Promise<ConversationEntity> {
        if (!conversation) {
            throw new HttpException('Conversation with such id does not exist', HttpStatus.NOT_FOUND)
        }
        if (conversation.adminId !== user.id) {
            throw new HttpException('The use does not have permission to set a password', HttpStatus.FORBIDDEN)
        }
        let index = selectUser.conversations.findIndex(conversationItem => conversationItem.id === conversation.id)
        if (index !== -1) {
            selectUser.conversations.splice(index, 1)
            this.userRepository.save(selectUser)
        }
        index = conversation.users.findIndex(userItem => userItem.id === selectUser.id)
        if (index !== -1) {
            conversation.users.splice(index, 1)
            this.conversationReposity.save(conversation)
        }
        conversation.blackListUsers.push(selectUser)
        this.conversationReposity.save(conversation)
        return conversation
    }

    async findById(conversationID: number): Promise<ConversationEntity> {
        return await this.conversationReposity.findOne(conversationID, {
            relations: ['users', 'blackListUsers']
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
