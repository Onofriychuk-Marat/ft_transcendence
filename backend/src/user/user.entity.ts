import { Column, PrimaryGeneratedColumn, Entity, BeforeInsert } from 'typeorm'
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
}