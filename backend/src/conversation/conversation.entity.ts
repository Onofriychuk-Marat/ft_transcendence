import { Entity, JoinColumn, OneToOne, Column, JoinTable, PrimaryGeneratedColumn, ManyToMany, OneToMany, BeforeInsert } from 'typeorm'
import { hash } from 'bcrypt'
import { UserEntity } from 'src/user/user.entity'
import { User } from 'src/user/decorators/user.decorator'
import { ChatEntity } from 'src/chat/chat.entity'

@Entity({name: 'conversation'})
export class ConversationEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    conversationName: string

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

    @OneToOne(() => UserEntity)
    @JoinColumn()
    mainAdministrator: UserEntity

    @ManyToMany(() => UserEntity)
    @JoinTable()
    administrators: UserEntity[]

    @ManyToMany(() => UserEntity)
    @JoinTable()
    blackListUsers: UserEntity[]

    @OneToOne(() => ChatEntity)
    @JoinColumn()
    chat: ChatEntity
}
