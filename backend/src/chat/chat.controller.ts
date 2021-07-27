import { Controller, Delete, Post, Get, UseGuards, Param, Body, UsePipes, ValidationPipe, HttpException } from '@nestjs/common'
import { ChatService } from './chat.service'
import { AuthGuard } from 'src/user/guards/auth.quard'
import { User } from 'src/user/decorators/user.decorator'
import { ChatsResponseInterface } from './interfaces/chatsResponse.interface'
import { UserEntity } from 'src/user/user.entity'
import { password } from 'src/configuration'
import { ConversationService } from 'src/conversation/conversation.service'
import { UserService } from 'src/user/user.service'
import { ChatResponseInterface } from './interfaces/chatResponse.interface'
import { UsersConversationResponseInterface } from './interfaces/UsersConversationResponse.interface'
import { UserConversationResponseInterface } from './interfaces/UserConversatinResponse.interface'

@Controller('chats')
export class ChatController {
    constructor(private chatService: ChatService,
                private conversationService: ConversationService,
                private userService: UserService) {}

    @Get('conversations')
    @UseGuards(AuthGuard)
    async watchUserConversations(@User() user: UserEntity): Promise<ChatsResponseInterface> {
        const conversations = this.chatService.getUserConversations(user)
        return this.chatService.buildChatsResponse(conversations)
    }

    @Get('friends')
    @UseGuards(AuthGuard)
    async watchUserFriends(@User() user: UserEntity): Promise<ChatsResponseInterface> {
        const friends = this.chatService.getUserFriends(user)
        return this.chatService.buildChatsResponse(friends)
    }

    @Get('conversations/:conversationID/users')
    @UseGuards(AuthGuard)
    async watchUsersConversation(@User() user: UserEntity,
                                @Param('conversationID') conversationID: number): Promise<UsersConversationResponseInterface> {
        const conversation = await this.conversationService.findById(conversationID)
        const users = this.chatService.getUsersConversation(user, conversation)
        return this.chatService.buildUsersConversationResponse(users)
    }

    @Get('conversations/:conversationID/blocked-users')
    @UseGuards(AuthGuard)
    async watchBlockedUsersConversation(@User() user: UserEntity,
                                        @Param('conversationID') conversationID: number): Promise<UsersConversationResponseInterface> {
        const conversation = await this.conversationService.findById(conversationID)
        const users = this.chatService.getBlockedUsersConversation(user, conversation)
        return this.chatService.buildUsersConversationResponse(users)
    }

    @Post('conversations/:conversationID/access-code/add')
    @UseGuards(AuthGuard)
    async setAccessCode(@Body('accessCode') accessCode: number | undefined,
                        @User() user: UserEntity,
                        @Param('conversationID') conversationID: number): Promise<ChatResponseInterface> {
        let conversation = await this.conversationService.findById(conversationID)
        conversation = await this.chatService.setAcessCodeForConversation(accessCode, user, conversation)
        const chat = this.conversationService.getConversation(user, conversation)
        return this.chatService.buildChatResponse(chat)
    }

    @Delete('conversations/:conversationID/access-code/delete')
    @UseGuards(AuthGuard)
    async deleteAccessCode(@User() user: UserEntity,
                            @Param('conversationID') conversationID: number): Promise<ChatResponseInterface> {
        let conversation = await this.conversationService.findById(conversationID)
        conversation = await this.chatService.deleteAccessCodeForConversation(user, conversation)
        const chat = this.conversationService.getConversation(user, conversation)
        return this.chatService.buildChatResponse(chat)
    }

    @Post('conversations/:conversationID/leave')
    @UseGuards(AuthGuard)
    async leaveConversation(@User() user: UserEntity,
                            @Param('conversationID') conversationID: number,
                            @Body('newAdmin') newAdminId: number | number): Promise<ChatResponseInterface> {
        let conversation = await this.conversationService.findById(conversationID)
        let newAdmin: UserEntity | undefined = undefined
        if (newAdminId !== undefined) {
            newAdmin = await this.userService.findById(newAdminId)
        }
        conversation = await this.chatService.leaveConversation(user, newAdmin, conversation)
        const chat = this.conversationService.getConversation(user, conversation)
        return this.chatService.buildChatResponse(chat)
    }

    @Post('conversations/:conversationID/users/:userID/blocked')
    @UseGuards(AuthGuard)
    async blockUserInConversation(@User() user: UserEntity,
                        @Param('conversationID') conversationID: number,
                        @Param('userID') selectUserID: number,
                        @Body('time') time: string | Date): Promise<UserConversationResponseInterface> {
        if (time === undefined) {
            throw new HttpException('No time specified!', 400)
        }
        let conversation = await this.conversationService.findById(conversationID)
        const selectUser = await this.userService.findById(selectUserID)
        conversation = await this.chatService.blockUserInConversation(user, selectUser, conversation)
        const userConversation = this.chatService.getUserConversation(user, selectUser, conversation)
        return this.chatService.buildUserConversationResponse(userConversation)
    }

    @Post('conversations/:conversationID/users/:userID/unblocked')
    @UseGuards(AuthGuard)
    async unblockUserInConversation(@User() user: UserEntity,
                        @Param('conversationID') conversationID: number,
                        @Param('userID') selectUserID: number,
                        @Body('time') time: string | Date): Promise<UserConversationResponseInterface> {
        let conversation = await this.conversationService.findById(conversationID)
        const selectUser = await this.userService.findById(selectUserID)
        conversation = await this.chatService.unblockUserInConversation(user, selectUser, conversation)
        const userConversation = this.chatService.getUserConversation(user, selectUser, conversation)
        return this.chatService.buildUserConversationResponse(userConversation)
    }

    @Post('/chats/conversations/:conversationID/users/:userID/make-admin')
    @UseGuards(AuthGuard)
    async makeSelectUserAnAdministrator(@User() user: UserEntity,
                                        @Param('conversationID') conversationID: number,
                                        @Param('userID') selectUserID: number): Promise<UserConversationResponseInterface> {
        let covnersation = await this.conversationService.findById(conversationID)
        const selectUser = await this.userService.findById(selectUserID)
        covnersation = await this.chatService.makeSelectUserAnAdministrator(user, selectUser, covnersation)
        const userConversation = this.chatService.getUserConversation(user, selectUser, covnersation)
        return this.chatService.buildUserConversationResponse(userConversation)
    }

    @Post('/chats/conversations/:conversationID/users/:userID/remove-admin')
    @UseGuards(AuthGuard)
    async takeAwayAdministratorRightsFromSelectedUser(@User() user: UserEntity,
                                                        @Param('conversationID') conversationID: number,
                                                        @Param('userID') selectUserID: number): Promise<UserConversationResponseInterface> {
        let covnersation = await this.conversationService.findById(conversationID)
        const selectUser = await this.userService.findById(selectUserID)
        covnersation = await this.chatService.takeAwayAdministratorRightsFromSelectedUser(user, selectUser, covnersation)
        const userConversation = this.chatService.getUserConversation(user, selectUser, covnersation)
        return this.chatService.buildUserConversationResponse(userConversation)
    }

    
    // @Post('conversations/:conversationID/check')
    // markChatAsRead() {}

    // @Post('friends/:idFriend/check')
    // markFriendAsRead() {}
}
