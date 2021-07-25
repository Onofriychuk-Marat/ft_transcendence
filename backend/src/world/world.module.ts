import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import { ChatModule } from 'src/chat/chat.module'
import { ConversationEntity } from 'src/conversation/conversation.entity'
import { ConversationModule } from 'src/conversation/conversations.module'
import { UserEntity } from 'src/user/user.entity'
import { UserModule } from 'src/user/user.module'
import {WorldController} from './world.controller'
import {WorldService} from './world.service'

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, ConversationEntity]), UserModule, ConversationModule, ChatModule],
    controllers: [WorldController],
    providers: [WorldService]
})
export class WorldModule {}