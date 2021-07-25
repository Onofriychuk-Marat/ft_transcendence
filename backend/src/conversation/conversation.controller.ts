import { Controller, Post, UseGuards, UsePipes, ValidationPipe, Body } from '@nestjs/common'
import { ChatResponseInterface } from 'src/chat/interfaces/chatResponse.interface'
import { User } from 'src/user/decorators/user.decorator'
import { AuthGuard } from 'src/user/guards/auth.quard'
import { UserEntity } from 'src/user/user.entity'
import { ConversationService } from './conversation.service'
import { CreateConversationDto } from './dto/createConversationDto'

@Controller('conversation')
export class ConversationController {
    constructor(private conversationService: ConversationService) {}

    @Post('create')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async createConversation(@User() user: UserEntity,
                                @Body('conversation') createConversationDto: CreateConversationDto): Promise<ChatResponseInterface> {
        const conversation = await this.conversationService.createConversation(createConversationDto, user)
        const chat = this.conversationService.getConversation(user, conversation)
        return this.conversationService.buildConversationResponse(chat)
    }
}