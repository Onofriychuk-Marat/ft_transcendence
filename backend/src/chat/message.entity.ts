import { UserEntity } from 'src/user/user.entity'
import { Column, OneToOne, JoinTable, ManyToOne, ManyToMany, Entity, JoinColumn, PrimaryGeneratedColumn } from 'typeorm'
import { ChatEntity } from './chat.entity'

@Entity({name: 'message'})
export class MessageEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number

    @Column({default: ''})
    text: string

    @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    date: Date

    // @ManyToMany()
    // @JoinTable()
    // usersWhoHaveRead: UserEntity[]
}
