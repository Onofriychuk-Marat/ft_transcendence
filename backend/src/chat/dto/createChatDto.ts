import { IsNotEmpty } from 'class-validator'

export class CreateChatDto {
    @IsNotEmpty()
    readonly chatName: string

    @IsNotEmpty()
    readonly image: string

    readonly accessCode?: string
}