import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'DescriptionSite' })
export class DescriptionSiteEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string
}
