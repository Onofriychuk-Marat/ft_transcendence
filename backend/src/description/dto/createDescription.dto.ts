import { IsNotEmpty } from 'class-validator'

export class CreateDescriptionDto {
    @IsNotEmpty()
    readonly title: string

    @IsNotEmpty()
    readonly description: string
}
