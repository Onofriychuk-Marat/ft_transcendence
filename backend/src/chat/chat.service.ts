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
import { UserConversationType } from './types/userConversation.type'
import { UsersConversationResponseInterface } from './interfaces/UsersConversationResponse.interface'
import { UserConversationResponseInterface } from './interfaces/UserConversatinResponse.interface'
import { hash } from 'bcrypt'

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(ConversationEntity)
        private readonly conversationRepository: Repository<ConversationEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private userService: UserService,
        private conversationService: ConversationService
    ) {}

    async setAcessCodeForConversation(password: number | undefined, user: UserEntity, conversation: ConversationEntity): Promise<ConversationEntity> {
        if (!conversation) {
            throw new HttpException('Conversation with such id does not exist', HttpStatus.NOT_FOUND)
        }
        const isNotAdmin = this.conversationService.isAdminConversation(user, conversation) === false
        if (isNotAdmin) {
            throw new HttpException('The use does not have permission to set a password', HttpStatus.FORBIDDEN)
        }
        conversation.accessCode = await hash(password, 10)
        this.conversationRepository.save(conversation)
        return conversation
    }

    async deleteAccessCodeForConversation(user: UserEntity, conversation: ConversationEntity): Promise<ConversationEntity> {
        if (!conversation) {
            throw new HttpException('Conversation with such id does not exist', HttpStatus.NOT_FOUND)
        }
        const isNotAdmin = this.conversationService.isAdminConversation(user, conversation) === false
        if (isNotAdmin) {
            throw new HttpException('The use does not have permission to set a password', HttpStatus.FORBIDDEN)
        }
        conversation.accessCode = ''
        this.conversationRepository.save(conversation)
        return conversation
    }

    async leaveConversation(user: UserEntity, newAdministrator: UserEntity, conversation: ConversationEntity): Promise<ConversationEntity> {
        if (!conversation) {
            throw new HttpException('Conversation with such id does not exist', HttpStatus.NOT_FOUND)
        }
        const isMainAdmin = conversation.mainAdministrator.id === user.id
        if (isMainAdmin && newAdministrator === undefined) {
            throw new HttpException('No new administrator specified!', 400)
        } else if (conversation.chat.users.length === 0) {
            this.conversationRepository.delete(conversation)
        } else {
            conversation.mainAdministrator = newAdministrator
            let index = conversation.administrators.findIndex(userItem => userItem.id === user.id)
            if (index !== -1) {
                conversation.administrators.splice(index, 1)
            }
            index = conversation.administrators.findIndex(userItem => userItem.id === newAdministrator.id)
            if (index === -1) {
                conversation.administrators.push(newAdministrator)
            }
        }
        let index = conversation.chat.users.findIndex(userItem => userItem.id === user.id)
        if (index !== -1) {
            conversation.chat.users.splice(index, 1)
        }
        index = user.conversations.findIndex(conversationItem => conversationItem.id === conversation.id)
        if (index !== -1) {
            user.conversations.splice(index, 1)
        }
        this.userRepository.save(user)
        this.conversationRepository.save(conversation)
        return conversation
    }

    async blockUserInConversation(user: UserEntity, selectUser: UserEntity, conversation: ConversationEntity): Promise<ConversationEntity> {
        if (!conversation) {
            throw new HttpException('Conversation with such id does not exist!', HttpStatus.NOT_FOUND)
        }
        const isNotAdmin = this.conversationService.isAdminConversation(user, conversation) === false
        if (isNotAdmin) {
            throw new HttpException('The use does not have permission to set a password!', HttpStatus.FORBIDDEN)
        }
        const isNotMainAdmin = conversation.mainAdministrator !== user
        const isSelectUserAdmin = conversation.administrators.findIndex(admin => admin.id === selectUser.id) !== -1
        if (isNotMainAdmin && isSelectUserAdmin) {
            throw new HttpException('Only the main administrator can remove other administrators!', HttpStatus.FORBIDDEN)
        }
        let index = selectUser.conversations.findIndex(conversationItem => conversationItem.id === conversation.id)
        if (index !== -1) {
            selectUser.conversations.splice(index, 1)
            this.userRepository.save(selectUser)
        }
        index = conversation.chat.users.findIndex(userItem => userItem.id === selectUser.id)
        if (index !== -1) {
            conversation.chat.users.splice(index, 1)
            this.conversationRepository.save(conversation)
        }
        conversation.blackListUsers.push(selectUser)
        this.conversationRepository.save(conversation)
        return conversation
    }

    async unblockUserInConversation(user: UserEntity, selectUser: UserEntity, conversation: ConversationEntity): Promise<ConversationEntity> {
        if (!conversation) {
            throw new HttpException('Conversation with such id does not exist!', HttpStatus.NOT_FOUND)
        }
        const isNotAdmin = this.conversationService.isAdminConversation(user, conversation) === false
        if (isNotAdmin) {
            throw new HttpException('The use does not have permission to set a password!', HttpStatus.FORBIDDEN)
        }
        const index = conversation.blackListUsers.findIndex(userItem => userItem.id === selectUser.id)
        if (index !== -1) {
            conversation.blackListUsers.splice(index, 1)
        }
        selectUser.conversations.push(conversation)
        conversation.chat.users.push(selectUser)
        this.conversationRepository.save(conversation)
        this.userRepository.save(selectUser)
        return conversation
    }

    async makeSelectUserAnAdministrator(user: UserEntity, selectUser: UserEntity, conversation: ConversationEntity): Promise<ConversationEntity> {
        if (!conversation) {
            throw new HttpException('Conversation with such id does not exist!', HttpStatus.NOT_FOUND)
        }
        let isNotAdmin = this.conversationService.isAdminConversation(user, conversation) === false
        if (isNotAdmin) {
            throw new HttpException('The use does not have permission to set a password!', HttpStatus.FORBIDDEN)
        }
        isNotAdmin = this.conversationService.isAdminConversation(user, conversation) === false
        if (isNotAdmin) {
            conversation.administrators.push(selectUser)
            this.conversationRepository.save(conversation)
        }
        return conversation
    }

    async takeAwayAdministratorRightsFromSelectedUser(user: UserEntity,
                                                        selectUser: UserEntity,
                                                        conversation: ConversationEntity): Promise<ConversationEntity> {
        if (!conversation) {
            throw new HttpException('Conversation with such id does not exist!', HttpStatus.NOT_FOUND)
        }
        const isNotAdmin = this.conversationService.isAdminConversation(user, conversation) === false
        if (isNotAdmin) {
            throw new HttpException('The use does not have permission to set a password!', HttpStatus.FORBIDDEN)
        }
        const isNotMainAdmin = conversation.mainAdministrator.id !== user.id
        if (isNotMainAdmin) {
            throw new HttpException('Only the main administrator can remove other administrators!', HttpStatus.FORBIDDEN)
        }
        let index = conversation.administrators.findIndex(admin => admin.id === selectUser.id)
        if (index !== -1) {
            conversation.administrators.splice(index, 1)
            this.conversationRepository.save(conversation)
        }
        return conversation
    }

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

    getUsersConversation(user: UserEntity, conversation: ConversationEntity): UserConversationType[] {
        const chats: UserConversationType[] = []

        conversation.chat.users.map(userConversation => {
            if (userConversation.id == user.id) {
                return
            }
            chats.push({
                id: userConversation.id,
                name: userConversation.username,
                image: userConversation.image,
                status: 'online',
                numberOfMissed: 0,
                type: this.userService.getTypeUser(user, userConversation),
                isAdministrator: this.conversationService.isAdminConversation(userConversation, conversation)
            })
        })
        return chats
    }

    getBlockedUsersConversation(user: UserEntity, conversation: ConversationEntity): UserConversationType[] {
        const chats: UserConversationType[] = []

        conversation.blackListUsers.map(userConversation => {
            if (userConversation.id == user.id) {
                return
            }
            chats.push({
                id: userConversation.id,
                name: userConversation.username,
                image: userConversation.image,
                status: 'online',
                numberOfMissed: 0,
                type: this.userService.getTypeUser(user, userConversation),
                isAdministrator: this.conversationService.isAdminConversation(userConversation, conversation)
            })
        })
        return chats
    }

    getUserConversation(user: UserEntity, selectUser: UserEntity, conversation: ConversationEntity): UserConversationType {
        let isAdmin = this.conversationService.isAdminConversation(selectUser, conversation)
        const userConversation: UserConversationType = {
            id: selectUser.id,
            name: selectUser.username,
            image: 'image',
            status: 'online',
            numberOfMissed: 0,
            type: this.userService.getTypeUser(user, selectUser),
            isAdministrator: isAdmin
        }
        return userConversation
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

    buildUsersConversationResponse(users: UserConversationType[]) : UsersConversationResponseInterface {
        return {
            usersConversation: users
        }
    }

    buildUserConversationResponse(user: UserConversationType): UserConversationResponseInterface {
        return {
            userConversation: user
        }
    }
}
