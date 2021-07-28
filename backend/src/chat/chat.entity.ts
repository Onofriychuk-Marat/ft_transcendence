import { UserEntity } from 'src/user/user.entity'
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, JoinTable } from 'typeorm'
import { MessageEntity } from './message.entity'

@Entity({name: 'chat'})
export class ChatEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToMany(() => UserEntity)
    @JoinTable()
    users: UserEntity[]

    @OneToMany(() => MessageEntity, message => message.chat)
    messages: MessageEntity[]
}