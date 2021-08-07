import {Module} from '@nestjs/common'
import {TypeOrmModule} from '@nestjs/typeorm'
import { ChatEntity } from 'src/chat/chat.entity'
import { ChatModule } from 'src/chat/chat.module'
import { ConversationEntity } from 'src/conversation/conversation.entity'
import { ConversationModule } from 'src/conversation/conversations.module'
import { FriendEntity } from 'src/user/friend.entity'
import { UserEntity } from 'src/user/user.entity'
import { UserModule } from 'src/user/user.module'
import {WorldController} from './world.controller'
import {WorldService} from './world.service'

@Module({
    imports: [UserModule, ConversationModule, ChatModule],
    controllers: [WorldController],
    providers: [WorldService]
})
export class WorldModule {}
