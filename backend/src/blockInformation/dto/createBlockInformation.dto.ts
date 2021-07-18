import { IsNotEmpty } from 'class-validator'

export class CreateBlockInformationDto {
    @IsNotEmpty()
    readonly title: string

    @IsNotEmpty()
    readonly description: string
}
