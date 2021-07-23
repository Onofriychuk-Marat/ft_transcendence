import { IsNotEmpty } from 'class-validator'

export class CreateDescriptionSiteDto {
    @IsNotEmpty()
    readonly title: string

    @IsNotEmpty()
    readonly description: string
}
