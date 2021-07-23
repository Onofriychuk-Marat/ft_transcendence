import { Controller, Post, Get, UseGuards, Param, Body, UsePipes, ValidationPipe } from '@nestjs/common'
import { ChatService } from './chat.service'
import { AuthGuard } from 'src/user/guards/auth.quard'
import { User } from 'src/user/decorators/user.decorator'
import { ChatsResponseInterface } from './types/chatsResponse.interface'
import { UserEntity } from 'src/user/user.entity'
import { password } from 'src/configuration'
import { ConversationResponseInterface } from 'src/conversation/types/conversationResponse.interface'
import { ConversationService } from 'src/conversation/conversation.service'

@Controller('chats')
export class ChatController {
    constructor(private chatService: ChatService,
                private conversationService: ConversationService) {}
    // constructor(private chatService: ChatService) {}

    @Get('conversations')
    @UseGuards(AuthGuard)
    async watchUserConversations(@User() user: UserEntity): Promise<ChatsResponseInterface> {
        const conversations = await this.chatService.watchUserConversations(user)
        return this.chatService.buildChatsResponse(conversations)
    }

    @Get('friends')
    @UseGuards(AuthGuard)
    async watchUserFriends(@User() user: UserEntity): Promise<ChatsResponseInterface> {
        const friends = await this.chatService.watchUserFriends(user)
        return this.chatService.buildChatsResponse(friends)
    }

    @Post('friends/:idFriend/check')
    markFriendAsRead() {}

    @Get('conversations/:idConversation/users')
    @UseGuards(AuthGuard)
    async watchUsersConservetion(@User() user: UserEntity, @Param('idConversation') idConversation: number) {
        const conversation = await this.conversationService.findById(idConversation)

    }

    @Post('conversations/:idConversation/password')
    @UseGuards(AuthGuard)
    async setPasssord(@Body('accessCode') accessCode: number | undefined,
                        @User('idUser') idUser: number, @Param('idConversation') idConversation: number): Promise<ConversationResponseInterface> {
        const chat = await this.conversationService.setAcessCodeForConversation(accessCode, idUser, idConversation)
        return this.conversationService.buildConversationResponse(chat)
    }

    @Post('conversations/:idConversation/leave')
    leaveConversation() {}

    @Post('conversations/:idConversation/:userID/leave')
    kickUserOutOfChat() {}

    @Post('conversations/:idConversation/check')
    markChatAsRead() {}
}
