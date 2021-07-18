import { Controller, Post, Get, UseGuards, Body, UsePipes, ValidationPipe } from '@nestjs/common'
import { ChatService } from './chat.service'
import { AuthGuard } from 'src/user/guards/auth.quard'
import { CreateChatDto } from './dto/createChatDto'
import { ChatResponseInterface } from './types/chatResponse.interface'
import { User } from 'src/user/decorators/user.decorator'
import { ChatsResponseInterface } from './types/chatsResponse.interface'

@Controller()
export class ChatController {
    constructor(private chatService: ChatService) {}

    @Post('/chat/create')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async createChat(@Body('chat') createChatDto: CreateChatDto, @User('id') idAdmin: number): Promise<ChatResponseInterface> {
        return this.chatService.createChat(createChatDto, idAdmin)
    }

    @Get('/chats')
    @UseGuards(AuthGuard)
    async watchAllChats(): Promise<ChatsResponseInterface> {
        return this.chatService.watchAllChats()
    }

    @Get('/chats/:chatID/users')
    watchChatUsers() {}

    @Post('/chats/:chatID/:userID/leave')
    kickUserOutOfChat() {}

    @Post('chats/:chatID/check')
    markChatAsRead() {}
}