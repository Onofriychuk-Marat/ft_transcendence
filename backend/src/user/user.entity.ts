import { JoinTable, Column, PrimaryGeneratedColumn, Entity, BeforeInsert, ManyToMany, OneToMany } from 'typeorm'
import { hash } from 'bcrypt'

@Entity({name: 'users'})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column({select: false})
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

    // @ManyToMany(() => ChatEntity, (chat) => chat.users)
    // @JoinTable()
    // chats: ChatEntity[]

    @Column('int', {array: true, default: []})
    conversationsId: number[]

    // @ManyToMany(() => ChatEntity, (chat) => chat.blackListUsers)
    // @JoinTable()
    // blackListChats: ChatEntity[]

    // @Column('int', {array: true, default: []})
    // blackListchats: number[]

    // @ManyToMany(() => UserEntity)
    // @JoinTable()
    // friends: UserEntity[]

    @Column('int', {array: true, default: []})
    friendsId: number[]

    // @ManyToMany(() => UserEntity, (user) => user.blackListUsers)
    // @JoinTable()
    // blackListUsers: UserEntity[]

    @Column('int', {array: true, default: []})
    blackListUsersId: number[]

    @Column('int', {array: true, default: []})
    userFriendRequestId: number[]

    @Column('int', {array: true, default: []})
    myFriendshipRequestsId: number[]
}