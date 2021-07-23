import {Injectable, HttpException, HttpStatus} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import { UserEntity } from 'src/user/user.entity'
import { WorldResponseInterface } from './types/worldResponse.interface'
import { ElementWorldType } from './types/elementWorld.types'
import { UserProfileResponseInterface } from 'src/user/types/userProfileResponse.interface'
import { ConversationEntity } from 'src/conversation/conversation.entity'
import { UserService } from 'src/user/user.service'
import { ConversationService } from 'src/conversation/conversation.service'
import { compare } from 'bcrypt'

@Injectable()
export class WorldService {
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        @InjectRepository(ConversationEntity) private conversationRepository: Repository<ConversationEntity>,
        private userService: UserService,
        private conversationService: ConversationService
    ) {}

    async findAllPeople(): Promise<UserEntity[]> {
        return await this.userRepository.find()
    }

    async findAllConversations(): Promise<ConversationEntity[]> {
        return await this.conversationRepository.find()
    }

    async enterConveration(user: UserEntity, conversation: ConversationEntity) {
        user.conversations.push(conversation)
        conversation.users.push(user)
        this.userRepository.save(user)
        this.conversationRepository.save(conversation)
    }

    async enterConversationWithAccessCode(user: UserEntity, conversation: ConversationEntity, accessCode: string) {
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

    async addUserToFriends(user: UserEntity, selectUser: UserEntity) {
        const isFriend = user.friends.findIndex(friend => friend.id === selectUser.id) !== -1
        const isBlackList = selectUser.blackListUsersId.findIndex(id => id === user.id) !== -1
        if (isFriend || isBlackList) {
            return 
        }
        const isSelectedUserSentRequest = user.userFriendRequestId.findIndex(id => id === selectUser.id) !== -1
        if (isSelectedUserSentRequest) {
            user.friends.push(selectUser)
            selectUser.friends.push(user)
            let index = user.userFriendRequestId.indexOf(selectUser.id)
            user.userFriendRequestId.splice(index, 1)
            index = selectUser.myFriendshipRequestsId.indexOf(user.id)
            selectUser.myFriendshipRequestsId.splice(index, 1)
        } else {
            user.myFriendshipRequestsId.push(selectUser.id)
            selectUser.userFriendRequestId.push(user.id)
        }
        this.userRepository.save(user)
        this.userRepository.save(selectUser)
    }

    async removeUserAsFriends(user: UserEntity, selectUser: UserEntity) {
        const isFriend = user.friends.findIndex(frind => frind.id === selectUser.id) !== -1
        const isBlackList = selectUser.blackListUsersId.findIndex(id => id === user.id) !== -1
        if (!isFriend || isBlackList) {
            return 
        }
        
    }

    async rejectFriendshipRequest(user: UserEntity, selectUser: UserEntity) {

    }

    async blockedUser(user: UserEntity, selectUser: UserEntity) {

    }

    async unblockedUser(user: UserEntity, selectUser: UserEntity) {

    }

    buildWorldResponse(user: UserEntity, people: UserEntity[], conversations: ConversationEntity[]): WorldResponseInterface {
        const world: ElementWorldType[] = []

        people.forEach(userItem => {
            if (user.id === userItem.id) {
                return
            }
            world.push({
                id: userItem.id,
                name: userItem.username,
                image: userItem.image,
                status: 'online',
                // type: 'user'
                type: this.userService.getTypeUser(user, userItem.id)
            })
        })
        conversations.forEach(conversation => {
            world.push({
                id: conversation.id,
                name: conversation.conversationName,
                image: conversation.image,
                status: 'online',
                // type: 'chat'
                type: this.conversationService.getTypeConversation(user, conversation)
            })
        })
        return {
            world: world
        }
    }

    async buildUserProfileResponse(user: UserEntity, idOfSelectedUser: number): Promise<UserProfileResponseInterface> {
        const typeUserInQuestion = await this.userService.getTypeUser(user, idOfSelectedUser)
        delete user.password
        return {
            profile: {
                ...user,
                type: typeUserInQuestion
            }
        }
    }
}