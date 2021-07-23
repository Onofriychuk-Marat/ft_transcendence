import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, BeforeInsert } from 'typeorm'
import { hash } from 'bcrypt'

@Entity({name: 'conversation'})
export class ConversationEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    conversationName: string

    @Column()
    idAdmin: number

    @Column()
    image: string

    @Column({default: ''})
    accessCode: string

    @BeforeInsert()
    async hashPassword() {
        if (this.accessCode) {
            this.accessCode = await hash(this.accessCode, 10)
        }
    }

    // @ManyToMany(() => UserEntity, (user) => user.chats)
    // @JoinTable()
    // users: UserEntity[]

    @Column('int', {array: true, default: []})
    usersId: number[]

    // @ManyToMany(() => UserEntity, (user) => user.blackListChats)
    // @JoinTable()
    // blackListUsers: UserEntity[]

    @Column('int', {array: true, default: []})
    blackListUsersId: number[]
}
