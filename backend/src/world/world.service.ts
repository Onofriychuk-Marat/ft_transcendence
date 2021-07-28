import {Injectable, HttpException, HttpStatus} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import { UserEntity } from 'src/user/user.entity'
import { ConversationEntity } from 'src/conversation/conversation.entity'
import { compare } from 'bcrypt'
import { ProfileSelectUserType } from 'src/user/types/profileSelectUser.type'
import { ChatType } from 'src/chat/types/chat.type'
import { UserService } from 'src/user/user.service'
import { ConversationService } from 'src/conversation/conversation.service'

@Injectable()
export class WorldService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        @InjectRepository(ConversationEntity) private conversationRepository: Repository<ConversationEntity>,
        private userService: UserService,
        private conversationService: ConversationService
    ) {}

    getChatsPeopleAndConversations(user: UserEntity, users: UserEntity[], conversations: ConversationEntity[]): ChatType[] {
        const chats: ChatType[] = []

        users.map(userItem => {
            if (user.id == userItem.id) {
                return
            }
            chats.push({
                id: userItem.id,
                name: userItem.username,
                image: userItem.image,
                numberOfMissed: 0,
                status: 'online',
                type: this.userService.getTypeUser(user, userItem)
            })
        })
        conversations.map(conversation => {
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

    getChatConversation(user: UserEntity, conversation: ConversationEntity): ChatType {
        const chat: ChatType = {
            id: conversation.id,
            name: conversation.conversationName,
            image: conversation.image,
            numberOfMissed: 0,
            status: 'online',
            type: this.conversationService.getTypeConversation(user, conversation)
        }
        return chat
    }

    getProfileSelectUser(user: UserEntity, selectUser: UserEntity): ProfileSelectUserType {
        const profile: ProfileSelectUserType = {
            id: selectUser.id,
            username: selectUser.username,
            image: selectUser.image,
            countGames: selectUser.countGames,
            countWin: selectUser.countWin,
            countLose: selectUser.countLose,
            bestWinStreak: selectUser.bestWinStreak,
            rating: selectUser.rating,
            minimalRating: selectUser.minimalRating,
            maximumRating: selectUser.maximumRating,
            bestWin: selectUser.bestWin,
            type: this.userService.getTypeUser(user, selectUser),
            numberOfMissed: 0,
            status: 'online',
            position: selectUser.position
        }
        return profile
    }

    async enterConveration(user: UserEntity, conversation: ConversationEntity): Promise<void> {
        user.conversations.push(conversation)
        conversation.chat.users.push(user)
        this.userRepository.save(user)
        this.conversationRepository.save(conversation)
    }

    async enterConversationWithAccessCode(user: UserEntity, conversation: ConversationEntity, accessCode: string): Promise<void> {
        if (user.position === 'GOD' || user.position === 'Owner') {
            this.enterConveration(user, conversation)
            return
        }
        const isAccessCodeCorrect = await compare(
            accessCode,
            conversation.accessCode
        )
        if (!isAccessCodeCorrect) {
            throw new HttpException({
                errors: {
                    accessCode: 'is invalid'
                }
            }, HttpStatus.UNPROCESSABLE_ENTITY)
        }  
        this.enterConveration(user, conversation)
    }

    async addSelectUserToFriends(user: UserEntity, selectUser: UserEntity): Promise<void> {
        const isFriend = user.friends.findIndex(friend => friend.id === selectUser.id) !== -1
        const isBlackList = selectUser.blackListUsers.findIndex(userItem => userItem.id === user.id) !== -1
        if (isFriend || isBlackList) {
            return
        }
        const isSelectedUserSentRequest = user.friendInvitation.findIndex(userItem => userItem.id === selectUser.id) !== -1
        if (isSelectedUserSentRequest) {
            user.friends.push(selectUser)
            selectUser.friends.push(user)
            let index = user.friendInvitation.findIndex(userItem => userItem.id === selectUser.id)
            user.friendInvitation.splice(index, 1)
            index = selectUser.myFriendshipRequests.findIndex(userItem => userItem.id === user.id)
            selectUser.myFriendshipRequests.splice(index, 1)
        } else {
            user.myFriendshipRequests.push(selectUser)
            selectUser.friendInvitation.push(user)
        }
        this.userRepository.save(user)
        this.userRepository.save(selectUser)
    }

    async removeSelectUserAsFriends(user: UserEntity, selectUser: UserEntity): Promise<void> {
        const isFriend = user.friends.findIndex(friend => friend.id === selectUser.id) !== -1
        const isBlackList = selectUser.blackListUsers.findIndex(userItem => userItem.id === user.id) !== -1
        if (!isFriend || isBlackList) {
            return
        }
        let index = user.friends.findIndex(userItem => userItem.id === selectUser.id)
        if (index !== -1) {
            user.friends.splice(index, 1)
            this.userRepository.save(user)
        }
        index = selectUser.friends.findIndex(userItem => userItem.id === user.id)
        if (index !== -1) {
            selectUser.friends.splice(index, 1)
            this.userRepository.save(selectUser)
        }
    }

    async rejectFriendshipRequest(user: UserEntity, selectUser: UserEntity): Promise<void> {
        const isFriendInvitation = user.friendInvitation.findIndex(userItem => userItem.id === selectUser.id) !== -1
        if (!isFriendInvitation) {
            return
        }
        let index = user.friendInvitation.findIndex(userItem => userItem.id === selectUser.id)
        if (index !== -1) {
            user.friendInvitation.splice(index, 1)
            this.userRepository.save(user)
        }
        index = selectUser.myFriendshipRequests.findIndex(userItem => userItem.id === user.id)
        if (index !== -1) {
            selectUser.myFriendshipRequests.splice(index, 1)
            this.userRepository.save(selectUser)
        }
    }

    async blockedUser(user: UserEntity, selectUser: UserEntity): Promise<void> {
        if (user.position === 'GOD') {
            throw new HttpException("Don't be angry with God!", HttpStatus.FORBIDDEN)
        } else if (user.position === 'Owner') {
            throw new HttpException("Don't be angry with owner site!", HttpStatus.FORBIDDEN)
        }
        this.rejectFriendshipRequest(user, selectUser)
        this.removeSelectUserAsFriends(user, selectUser)
        user.blackListUsers.push(selectUser)
        this.userRepository.save(user)
    }

    async unblockedUser(user: UserEntity, selectUser: UserEntity): Promise<void> {
        let index = user.blackListUsers.findIndex(userItem => userItem.id === selectUser.id)
        if (index !== -1) {
            user.blackListUsers.splice(index, 1)
            this.userRepository.save(user)
        }
    }

    async makeSelectUserOwner(user: UserEntity, selectUser: UserEntity) {
        if (user.position === 'GOD' || user.position === 'Owner') {
            throw new HttpException("You don't have access!", HttpStatus.FORBIDDEN)
        }
        selectUser.position = 'Owner'
    }

    async takeAwayOwnerRightsFromSelectUser(user: UserEntity, selectUser: UserEntity) {
        if (user.position === 'GOD') {
            throw new HttpException("You don't have access!", HttpStatus.FORBIDDEN)
        }
        selectUser.position = 'User'
    }

    async blockedAccountSelectUser(user: UserEntity, selectUser: UserEntity) {
        if (user.position !== 'GOD' && user.position !== 'Owner') {
            throw new HttpException("You don't have access!", HttpStatus.FORBIDDEN)
        }
        selectUser.position = 'BlockedUser'
    }

    async unblockedAccountSelectUser(user: UserEntity, selectUser: UserEntity) {
        if (user.position !== 'GOD' && user.position !== 'Owner') {
            throw new HttpException("You don't have access!", HttpStatus.FORBIDDEN)
        }
        selectUser.position = 'User'
    }
}