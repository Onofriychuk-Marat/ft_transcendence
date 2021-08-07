import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChatEntity } from 'src/chat/chat.entity'
import { ChatModule } from 'src/chat/chat.module'
import { ChatService } from 'src/chat/chat.service'
import { UserEntity } from 'src/user/user.entity'
import { UserModule } from 'src/user/user.module'
import { ConversationController } from './conversation.controller'
import { ConversationEntity } from './conversation.entity'
import { ConversationService } from './conversation.service'

@Module({
    imports: [TypeOrmModule.forFeature([ConversationEntity, UserEntity, ChatEntity])],
    controllers: [ConversationController],
    providers: [ConversationService],
    exports: [ConversationService]
})
export class ConversationModule {}
