import { JoinTable, Column, PrimaryGeneratedColumn, Entity, BeforeInsert, ManyToMany, OneToMany } from 'typeorm'
import { hash } from 'bcrypt'
import { ConversationEntity } from 'src/conversation/conversation.entity'

@Entity({name: 'users'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    password: string

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 10)
    }

    @Column({default: ''})
    image: string

    @Column({default: 0})
    countGames: number

    @Column({default: 0})
    countWin: number

    @Column({default: 0})
    countLose: number

    @Column({default: 0})
    bestWinStreak: number

    @Column({default: 0})
    rating: number

    @Column({default: 0})
    minimalRating: number

    @Column({default: 0})
    maximumRating: number

    @Column({default: 0})
    bestWin: number

    @ManyToMany(() => ConversationEntity, conversation => conversation.users)
    @JoinTable()
    conversations: ConversationEntity[]

    @ManyToMany(() => UserEntity, user => user.friends)
    @JoinTable()
    friends: UserEntity[]

    @ManyToMany(() => UserEntity)
    @JoinTable()
    blackListUsers: UserEntity[]

    @ManyToMany(() => UserEntity)
    @JoinTable()
    friendInvitation: UserEntity[]

    @ManyToMany(() => UserEntity)
    @JoinTable()
    myFriendshipRequests: UserEntity[]

}