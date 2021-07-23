import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, BeforeInsert } from 'typeorm'
import { hash } from 'bcrypt'
import { UserEntity } from 'src/user/user.entity'

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

    @ManyToMany(() => UserEntity, user => user.conversations)
    users: UserEntity[]

    // @Column('int', {array: true, default: []})
    // usersId: number[]

    // @ManyToMany(() => UserEntity, (user) => user.blackListChats)
    // @JoinTable()
    // blackListUsers: UserEntity[]

    @Column('int', {array: true, default: []})
    blackListUsersId: number[]
}
