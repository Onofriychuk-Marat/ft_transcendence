import { Column, Entity, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn } from 'typeorm'
import { ChatEntity } from 'src/chat/chat.entity'
import { UserEntity } from './user.entity'

@Entity({name: 'friend'})
export class FriendEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => UserEntity)
    @JoinColumn()
    profile: UserEntity

    @ManyToOne(() => ChatEntity)
    @JoinColumn()
    chat: ChatEntity
}
