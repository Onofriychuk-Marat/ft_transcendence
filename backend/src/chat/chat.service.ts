import { Injectable, HttpStatus, HttpException } from '@nestjs/common'
import { ChatEntity } from './chat.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateChatDto } from './dto/createChatDto'
import { ChatResponseInterface } from './types/chatResponse.interface'
import { ChatsResponseInterface } from './types/chatsResponse.interface'
import { ChatType } from './types/chat.types'


@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(ChatEntity)
        private readonly chatRepository: Repository<ChatEntity>
    ) {}

    async createChat(createChatDto: CreateChatDto, idAdmin: number): Promise<ChatResponseInterface> {
        const chat = await this.chatRepository.findOne({
            chatName: createChatDto.chatName
        })
        if (chat) {
            throw new HttpException({
                errors: {
                    chatName: 'has already been taken'
                }
            }, HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const newChat = new ChatEntity()
        Object.assign(newChat, createChatDto)
        newChat.idAdmin = idAdmin
        await this.chatRepository.save(newChat)
        return {
            chat: {
                id: newChat.id,
                chatName: newChat.chatName,
                image: newChat.image,
                numberOfMissed: 0,
                status: 'online'
            }
        }
    }

    async watchAllChats(): Promise<ChatsResponseInterface> {

        const chats: ChatType[] = (await this.chatRepository.find()).map((chatEntity) => {
            return {
                id: chatEntity.id,
                chatName: chatEntity.chatName,
                image: chatEntity.image,
                numberOfMissed: 0,
                status: 'online' as 'online'
            }
        })
        console.log('chats', chats)
        return {
            chats: chats
        }
    }
}
