import { Get, Body, Post, Param, Controller, UseGuards } from '@nestjs/common'
import { ChatService } from 'src/chat/chat.service'
import { ChatResponseInterface } from 'src/chat/interfaces/chatResponse.interface'
import { ChatsResponseInterface } from 'src/chat/interfaces/chatsResponse.interface'
import { ChatType } from 'src/chat/types/chat.type'
import { ConversationEntity } from 'src/conversation/conversation.entity'
import { ConversationService } from 'src/conversation/conversation.service'
import { User } from 'src/user/decorators/user.decorator'
import { AuthGuard } from 'src/user/guards/auth.quard'
import { ProfileSelectUserResponseInterface } from 'src/user/interfaces/profileSelectUserResponse.interface'
import { ProfileType } from 'src/user/types/profile.type'
import { ProfileSelectUserType } from 'src/user/types/profileSelectUser.type'
import { UserEntity } from 'src/user/user.entity'
import { UserService } from 'src/user/user.service'
import { WorldService } from './world.service'

@Controller('world')
export class WorldController {
    constructor(private worldService: WorldService,
                private userService: UserService,
                private conversationService: ConversationService,
                private chatService: ChatService) {}

    @Get()
    @UseGuards(AuthGuard)
    async watchWorld(@User() user: UserEntity): Promise<ChatsResponseInterface> {
        const users: UserEntity[] = await this.userService.findAll()
        const conversations: ConversationEntity[] = await this.conversationService.findAll()
        const chats: ChatType[] = this.worldService.getChatsPeopleAndConversations(user, users, conversations)
        return this.chatService.buildChatsResponse(chats)
    }

    @Post('/conversations/:conversationID/entrance')
    @UseGuards(AuthGuard)
    async enterConversationWithAccessCode(@User() user: UserEntity,
                                            @Param('conversationID') conversationID: number,
                                            @Body('accessCode') accessCode: string): Promise<ChatResponseInterface> {
        const conversation: ConversationEntity = await this.conversationService.findById(conversationID)
        if (accessCode) {
            await this.worldService.enterConversationWithAccessCode(user, conversation, accessCode)
        } else {
            await this.worldService.enterConveration(user, conversation)
        }
        const chat: ChatType = this.worldService.getChatConversation(user, conversation)
        return this.chatService.buildChatResponse(chat)
    }

    @Get('/users/:userID')
    @UseGuards(AuthGuard)
    async watchSelectProfile(@User() user: UserEntity,
                            @Param('userID') idSelectUser: number): Promise<ProfileSelectUserResponseInterface> {
        const selectUser = await this.userService.findById(idSelectUser)
        const profile: ProfileSelectUserType = this.worldService.getProfileSelectUser(user, selectUser)
        return this.userService.buildProfileSelectUserResponse(profile)
    }

    @Post('/users/:userID/add')
    @UseGuards(AuthGuard)
    async addSelectUserToFriends(@User() user: UserEntity,
                            @Param('userID') idSelectUser: number): Promise<ProfileSelectUserResponseInterface> {
        const selectUser = await this.userService.findById(idSelectUser)
        await this.worldService.addSelectUserToFriends(user, selectUser)
        const profile: ProfileSelectUserType = this.worldService.getProfileSelectUser(user, selectUser)
        return this.userService.buildProfileSelectUserResponse(profile)
    }

    @Post('/users/:userID/reject')
    @UseGuards(AuthGuard)
    async rejectFriendshipRequest(@User() user: UserEntity,
                                    @Param('userID') idSelectUser: number): Promise<ProfileSelectUserResponseInterface> {
        const selectUser = await this.userService.findById(idSelectUser)
        await this.worldService.rejectFriendshipRequest(user, selectUser)
        const profile: ProfileSelectUserType = this.worldService.getProfileSelectUser(user, selectUser)
        return this.userService.buildProfileSelectUserResponse(profile)
    }

    @Post('/users/:userID/accept')
    @UseGuards(AuthGuard)
    async acceptFriednshipRequest(@User() user: UserEntity,
                                    @Param('userID') idSelectUser: number): Promise<ProfileSelectUserResponseInterface> {
        const selectUser = await this.userService.findById(idSelectUser)
        await this.worldService.addSelectUserToFriends(user, selectUser)
        const profile: ProfileSelectUserType = this.worldService.getProfileSelectUser(user, selectUser)
        return this.userService.buildProfileSelectUserResponse(profile)
    }

    @Post('/users/:userID/delete')
    @UseGuards(AuthGuard)
    async removeSelectUserAsFriends(@User() user: UserEntity,
                                @Param('userID') idSelectUser: number): Promise<ProfileSelectUserResponseInterface> {
        const selectUser = await this.userService.findById(idSelectUser)
        await this.worldService.removeSelectUserAsFriends(user, selectUser)
        const profile: ProfileSelectUserType = this.worldService.getProfileSelectUser(user, selectUser)
        return this.userService.buildProfileSelectUserResponse(profile)
    }

    @Post('/users/:userID/blocked')
    @UseGuards(AuthGuard)
    async blockedUser(@User() user: UserEntity,
                        @Param('userID') idSelectUser: number): Promise<ProfileSelectUserResponseInterface> {
        const selectUser = await this.userService.findById(idSelectUser)
        await this.worldService.blockedUser(user, selectUser)
        const profile: ProfileSelectUserType = this.worldService.getProfileSelectUser(user, selectUser)
        return this.userService.buildProfileSelectUserResponse(profile)
    }

    @Post('/users/:userID/unblocked')
    @UseGuards(AuthGuard)
    async unblockedUser(@User() user: UserEntity,
                        @Param('userID') idSelectUser: number): Promise<ProfileSelectUserResponseInterface> {
        const selectUser = await this.userService.findById(idSelectUser)
        await this.worldService.unblockedUser(user, selectUser)
        const profile: ProfileSelectUserType = this.worldService.getProfileSelectUser(user, selectUser)
        return this.userService.buildProfileSelectUserResponse(profile)
    }

    @Post('/uesrs/:userId/blocked-account')
    @UseGuards(AuthGuard)
    async blockedAccountUser(@User() user: UserEntity,
                            @Param('userId') idSelectUser: number): Promise<ProfileSelectUserResponseInterface> {
        const selectUser = await this.userService.findById(idSelectUser)
        await this.worldService.blockedAccountSelectUser(user, selectUser)
        const profile: ProfileSelectUserType = this.worldService.getProfileSelectUser(user, selectUser)
        return this.userService.buildProfileSelectUserResponse(profile)
    }

    @Post('/uesrs/:userId/unblocked-account')
    @UseGuards(AuthGuard)
    async unblockedAccountUser(@User() user: UserEntity,
                            @Param('userId') idSelectUser: number): Promise<ProfileSelectUserResponseInterface> {
        const selectUser = await this.userService.findById(idSelectUser)
        await this.worldService.unblockedAccountSelectUser(user, selectUser)
        const profile: ProfileSelectUserType = this.worldService.getProfileSelectUser(user, selectUser)
        return this.userService.buildProfileSelectUserResponse(profile)
    }

    @Post('/users/:userID/make-owner')
    @UseGuards(AuthGuard)
    async makeSelectUserOwner(@User() user: UserEntity,
                                @Param('userID') idSelectUser: number): Promise<ProfileSelectUserResponseInterface> {
        const selectUser = await this.userService.findById(idSelectUser)
        await this.worldService.makeSelectUserOwner(user, selectUser)
        const profile: ProfileSelectUserType = this.worldService.getProfileSelectUser(user, selectUser)
        return this.userService.buildProfileSelectUserResponse(profile)
    }

    @Post('/users/:id/remove-owner')
    @UseGuards(AuthGuard)
    async takeAwayOwnerRightsFromSelectUser(@User() user: UserEntity,
                                            @Param('userID') idSelectUser): Promise<ProfileSelectUserResponseInterface> {
        const selectUser = await this.userService.findById(idSelectUser)
        await this.worldService.takeAwayOwnerRightsFromSelectUser(user, selectUser)
        const profile: ProfileSelectUserType = this.worldService.getProfileSelectUser(user, selectUser)
        return this.userService.buildProfileSelectUserResponse(profile)
    }
}
