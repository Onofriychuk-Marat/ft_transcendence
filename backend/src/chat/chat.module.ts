import { Module } from '@nestjs/common'
import { ChatController } from './chat.controller'
import { ChatService } from './chat.service'
import { ChatEntity } from './chat.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
    imports: [TypeOrmModule.forFeature([ChatEntity])],
    controllers: [ChatController],
    providers: [ChatService]
})
export class ChatModule {}