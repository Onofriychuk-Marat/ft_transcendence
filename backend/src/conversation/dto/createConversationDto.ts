import { IsNotEmpty } from 'class-validator'

export class CreateConversationDto {
    @IsNotEmpty()
    readonly conversationName: string

    @IsNotEmpty()
    readonly image: string

    readonly accessCode: string | undefined
}
