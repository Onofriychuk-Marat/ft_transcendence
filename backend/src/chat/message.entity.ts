import { UserEntity } from 'src/user/user.entity'
import { Column, OneToOne, ManyToOne, Entity, JoinColumn, PrimaryGeneratedColumn } from 'typeorm'
import { ChatEntity } from './chat.entity'

@Entity({name: 'message'})
export class MessageEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => ChatEntity, chat => chat.messages)
    chat: ChatEntity

    @OneToOne(() => UserEntity)
    @JoinColumn()
    user: UserEntity

    @Column({default: ''})
    text: string

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    date: Date
}
