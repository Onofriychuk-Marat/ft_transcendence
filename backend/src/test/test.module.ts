import { Module } from '@nestjs/common'
import { TestGateway } from './test.gateway'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from 'src/user/user.module'
import { ConversationModule } from 'src/conversation/conversations.module'
import { ChatModule } from 'src/chat/chat.module'
import { MessageEntity } from 'src/chat/message.entity'
import { ChatEntity } from 'src/chat/chat.entity'

@Module({
    imports: [UserModule, ConversationModule, ChatModule],
    providers: [TestGateway]
})
export class TestModule {}
