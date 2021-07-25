import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'Description' })
export class DescriptionEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string
}
