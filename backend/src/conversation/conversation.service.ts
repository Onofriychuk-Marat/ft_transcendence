import { Injectable, HttpStatus, HttpException } from '@nestjs/common'
import { ConversationEntity } from './conversation.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ConversationResponseInterface } from './types/conversationResponse.interface'
import { CreateConversationDto } from './dto/createConversationDto'
import { UserEntity } from 'src/user/user.entity'
import { hash } from 'bcrypt'

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
        newConversation.idAdmin = adminConversation.id
        newConversation.usersId = [adminConversation.id]
        newConversation = await this.conversationReposity.save(newConversation)
        adminConversation.conversationsId.push(newConversation.id)
        await this.userRepository.save(adminConversation)
        console.log('adminGroup: ', adminConversation)
        return newConversation
    }

    async setAcessCodeForConversation(password: number | undefined, idUser: number, idConversation: number): Promise<ConversationEntity> {
        const conversation = await this.conversationReposity.findOne(idConversation)
        if (!conversation) {
            throw new HttpException('Conversation with such id does not exist', HttpStatus.NOT_FOUND)
        }
        if (conversation.idAdmin !== idUser) {
            throw new HttpException('The use does not have permission to set a password', HttpStatus.FORBIDDEN)
        }
        conversation.accessCode = await hash(password, 10)
        return conversation
    }

    async findById(idConversation: number): Promise<ConversationEntity> {
        return await this.conversationReposity.findOne(idConversation)
    }

    getTypeConversation(user: UserEntity, conversation: ConversationEntity): 'chat' | 'chatOpen' | 'chatBlocked' {
        const isMyConversation = user.conversationsId.findIndex(id => id == conversation.id) !== -1
        if (isMyConversation) {
            return 'chat'
        }
        console.log('conversation>>', conversation)
        if (conversation.accessCode) {
            return 'chatBlocked'
        }
        return 'chatOpen'
    }

    buildConversationResponse(conversation: ConversationEntity): ConversationResponseInterface {
        delete conversation.idAdmin
        delete conversation.usersId
        delete conversation.accessCode
        delete conversation.blackListUsersId
        return {
            conversation: conversation
        }
    }
}
