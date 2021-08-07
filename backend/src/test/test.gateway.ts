import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
  } from '@nestjs/websockets';
  import { Logger } from '@nestjs/common';
  import { Socket, Server } from 'socket.io';
  import { InjectRepository } from '@nestjs/typeorm'
import { ConversationEntity } from 'src/conversation/conversation.entity';
import { verify } from 'jsonwebtoken'
import { JWT_SECRET } from 'src/ormconfig';
import { UserService } from 'src/user/user.service';
import { UserEntity } from 'src/user/user.entity';
import { User } from 'src/user/decorators/user.decorator';
import { ChatEntity } from 'src/chat/chat.entity';
import { ChatService } from 'src/chat/chat.service';
import { MessageEntity } from 'src/chat/message.entity';
import { Repository } from 'typeorm'

@WebSocketGateway()
export class TestGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server

  usersOnline: {
                socket: WebSocket,
                jwt: string,
                user: UserEntity
              }[]

  chats: {
          usersOnline: UserEntity[],
          chatEntity: ChatEntity
        }[]

  constructor(private userService: UserService,
              private chatService: ChatService) {
    this.usersOnline = []
    this.chats = []
    this.chatService.findAll()
      .then(chats => {
        chats.map(chat => {
          this.chats.push({
            usersOnline: [],
            chatEntity: chat
          })
        })
      })
  }

  @SubscribeMessage('msgToServer')
  async handleMessage(client: Socket, data: {
    userId: number,
    chatId: number,
    text: string
  }): Promise<void> {
    console.log('msgToServer', data)
    const chatEntity = await this.chatService.findById(data.chatId)
    let newMessage = new MessageEntity()
    newMessage.userId = data.userId
    newMessage.text = data.text
    console.log('flag1')
    newMessage = await this.chatService.saveMessageEntity(newMessage)
    console.log('flag2')
    chatEntity.messages.push(newMessage)
    await this.chatService.saveChatEntity(chatEntity)
    this.server.emit('msgToClient', newMessage)
  }

  // getChatById(id: number): {
  //   usersOnline: UserEntity[],
  //   chatEntity: ChatEntity
  // } {
  //   const index = this.chats.findIndex(chat => {
  //     return chat.chatEntity.id === id
  //   })
  //   if (index !== -1) {
  //     return this.chats[index]
  //   }
  //   return undefined
  // }

  @SubscribeMessage('init')
  async handlerInit(client: Socket, jwt: string): Promise<void> {
    const user = await this.authenticationGuard(jwt)
    console.log('init client', user)
    if (user) {
      this.usersOnline.push({
        jwt: jwt,
        user: user,
        socket: client
      })
      this.server.emit('init', {
        'status': 'success'
      })
    }
    this.server.emit('init', {
      'status': 'Invalid jwt'
    })
  }

  @SubscribeMessage('joinInChat')
  async handlerJoin(client: Socket, data: {
    jwt: string,
    chatId: number
  }): Promise<void> {
    console.log('joinInChat', data)
    const user = this.isAuthontication(data.jwt)
    // console.log("..", user)
    if (!user) {
      this.server.emit('openingChatForUser', {
        error: 'Invalid jwt'
      })
      return
    }
    // console.log('flag1')
    const chat = await this.chatService.findById(data.chatId)
    if (!chat) {
      this.server.emit('openingChatForUser', {
        error: 'Invalid chat id'
      })
    }
    // console.log('flag2')
    if (this.isChatUser(user, chat) === false) {
      this.server.emit('openingChatForUser', {
        error: 'No chat access'
      })
      return
    }
    // console.log('chat', chat)
    // let indexChat = this.chats.findIndex(chatItem => {
    //   return chatItem.chatEntity.id === data.chatId
    // })
    // // console.log('ljljljlj')
    // let messages: MessageEntity[]
    // if (indexChat !== -1) {
    //   console.log(this.chats, indexChat)
    //   messages = this.chats[indexChat].chatEntity.messages
    // } else {
    //   this.chats.push({
    //       usersOnline: [user],
    //       chatEntity: chat
    //   })
    //   messages = chat.messages
    //   indexChat = this.chats.length - 1
    // }
    // this.chats[indexChat].chatEntity.messages = [{
    //   id: 1,
    //   chat: undefined,
    //   user: undefined,
    //   text: "text 1",
    //   date: undefined
    // }, {
    //   id: 1,
    //   chat: undefined,
    //   user: undefined,
    //   text: "text 1",
    //   date: undefined
    // }]
    // console.log('chat>>>', this.chats[indexChat])
    const messages = (await this.chatService.findById(data.chatId)).messages
    client.emit('openingChatForUser', {messages: messages, userOnline: []})
  }

  isChatUser(user: UserEntity, chat: ChatEntity): boolean {
    const isChatUser = chat.users.findIndex(userItem => {
      return userItem.id === user.id
    })
    if (isChatUser === -1) {
      return false
    }
    return true
  }

  isAuthontication(jwt: string): UserEntity | undefined {
    const indexUser = this.usersOnline.findIndex(user => {
      return user.jwt === jwt
    })
    if (indexUser !== -1) {
      return this.usersOnline[indexUser].user
    }
    return undefined
  }

  async authenticationGuard(jwt: string): Promise<UserEntity | undefined> {
    const decode = verify(jwt, JWT_SECRET)
    const user = await this.userService.findById(decode.id)
    return user
  }

  afterInit(server: Server) {
    console.log('Init')
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`)
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: `, client.id)
  }
}
