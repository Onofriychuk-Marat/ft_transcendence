import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity({name: 'chats'})
export class ChatEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    chatName: string

    @Column()
    idAdmin: number

    @Column()
    image: string

    @Column({default: 0})
    accessCode?: number
}