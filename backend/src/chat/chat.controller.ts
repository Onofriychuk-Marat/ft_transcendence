import { Controller, Delete, Post, Get, UseGuards, Param, Body, UsePipes, ValidationPipe } from '@nestjs/common'
import { ChatService } from './chat.service'
import { AuthGuard } from 'src/user/guards/auth.quard'
import { User } from 'src/user/decorators/user.decorator'
import { ChatsResponseInterface } from './interfaces/chatsResponse.interface'
import { UserEntity } from 'src/user/user.entity'
import { password } from 'src/configuration'
import { ConversationService } from 'src/conversation/conversation.service'
import { UserService } from 'src/user/user.service'
import { ChatResponseInterface } from './interfaces/chatResponse.interface'

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
                                @Param('conversationID') conversationID: number): Promise<ChatsResponseInterface> {
        const conversation = await this.conversationService.findById(conversationID)
        const users = this.chatService.getUsersConversation(user, conversation)
        return this.chatService.buildChatsResponse(users)
    }

    @Post('conversations/:conversationID/accessCode/add')
    @UseGuards(AuthGuard)
    async setAccessCode(@Body('accessCode') accessCode: number | undefined,
                        @User() user: UserEntity,
                        @Param('conversationID') conversationID: number): Promise<ChatResponseInterface> {
        let conversation = await this.conversationService.findById(conversationID)
        conversation = await this.conversationService.setAcessCodeForConversation(accessCode, user, conversation)
        const chat = this.conversationService.getConversation(user, conversation)
        return this.chatService.buildChatResponse(chat)
    }

    @Delete('conversations/:conversationID/accessCode/delete')
    @UseGuards(AuthGuard)
    async deleteAccessCode(@User() user: UserEntity,
                            @Param('conversationID') conversationID: number): Promise<ChatResponseInterface> {
        let conversation = await this.conversationService.findById(conversationID)
        conversation = await this.conversationService.deleteAccessCodeForConversation(user, conversation)
        const chat = this.conversationService.getConversation(user, conversation)
        return this.chatService.buildChatResponse(chat)
    }

    @Post('conversations/:conversationID/leave')
    @UseGuards(AuthGuard)
    async leaveConversation(@User() user: UserEntity,
                            @Param('conversationID') conversationID: number): Promise<ChatResponseInterface> {
        let conversation = await this.conversationService.findById(conversationID)
        conversation = await this.conversationService.leaveConversation(user, conversation)
        const chat = this.conversationService.getConversation(user, conversation)
        return this.chatService.buildChatResponse(chat)
    }

    @Post('conversations/:conversationID/users/:userID/leave')
    async kickUserOutOfChat(@User() user: UserEntity,
                        @Param('conversationID') conversationID: number,
                        @Param('userID') selectUserID: number): Promise<ChatsResponseInterface> {
        let conversation = await this.conversationService.findById(conversationID)
        const selectUser = await this.userService.findById(selectUserID)
        conversation = await this.conversationService.kickUserOutOfChat(user, selectUser, conversation)
        const users = this.chatService.getUsersConversation(user, conversation)
        return this.chatService.buildChatsResponse(users)
    }

    // @Post('conversations/:conversationID/check')
    // markChatAsRead() {}

    // @Post('friends/:idFriend/check')
    // markFriendAsRead() {}
}
