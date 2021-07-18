import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'blockInformation' })
export class BlockInformationEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string
}
