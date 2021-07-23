import { Module } from '@nestjs/common'
import { ChatController } from './chat.controller'
import { ChatService } from './chat.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from 'src/user/user.entity'
import { ConversationEntity } from 'src/conversation/conversation.entity'
import { ConversationModule } from 'src/conversation/conversations.module'

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, ConversationEntity]), ConversationModule],
    // imports: [TypeOrmModule.forFeature([UserEntity, ConversationEntity])],
    controllers: [ChatController],
    providers: [ChatService]
})
export class ChatModule {}