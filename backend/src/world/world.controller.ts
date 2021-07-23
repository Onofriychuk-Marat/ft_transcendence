import { Get, Body, Post, Param, Controller, UseGuards } from '@nestjs/common'
import { ConversationService } from 'src/conversation/conversation.service'
import { ConversationResponseInterface } from 'src/conversation/types/conversationResponse.interface'
import { User } from 'src/user/decorators/user.decorator'
import { AuthGuard } from 'src/user/guards/auth.quard'
import { UserProfileResponseInterface } from 'src/user/types/userProfileResponse.interface'
import { UserEntity } from 'src/user/user.entity'
import { UserService } from 'src/user/user.service'
import { WorldResponseInterface } from './types/worldResponse.interface'
import { WorldService } from './world.service'

@Controller('world')
export class WorldController {
    constructor(private worldService: WorldService,
                private userService: UserService,
                private conversationService: ConversationService) {}

    @Get()
    @UseGuards(AuthGuard)
    async watchWorld(@User() user: UserEntity): Promise<WorldResponseInterface> {
        const people = await this.worldService.findAllPeople()
        const chats = await this.worldService.findAllConversations()
        return this.worldService.buildWorldResponse(user, people, chats)
    }

    @Post('/conversations/:idConversation/entrance')
    @UseGuards(AuthGuard)
    async enterConversationWithAccessCode(@User() user: UserEntity, @Param('idConversation') idConversation: number, @Body('accessCode') accessCode: string) {
        const conversation = await this.conversationService.findById(idConversation)
        if (accessCode) {
            await this.worldService.enterConversationWithAccessCode(user, conversation, accessCode)
        } else {
            await this.worldService.enterConveration(user, conversation)
        }
        return this.conversationService.buildConversationResponse(conversation)
    }

    @Get('/users/:idUser')
    @UseGuards(AuthGuard)
    async watchSelectProfile(@User() user: UserEntity, @Param('idUser') idOfSelectedUser): Promise<UserProfileResponseInterface> {
        const selectUser = await this.userService.findById(idOfSelectedUser)
        return this.worldService.buildUserProfileResponse(selectUser, idOfSelectedUser)
    }

    @Post('/users/:idUser/add')
    async addUserToFriends(@User() user: UserEntity, @Param('idUser') idOfSelectedUser): Promise<UserProfileResponseInterface> {
        const selectUser = await this.userService.findById(idOfSelectedUser)
        await this.worldService.addUserToFriends(user, selectUser)
        return this.worldService.buildUserProfileResponse(selectUser, idOfSelectedUser)
    }

    @Post('/users/:idUser/reject')
    async rejectFriendshipRequest(@User() user: UserEntity, @Param('idUser') idOfSelectedUser): Promise<UserProfileResponseInterface> {
        const selectUser = await this.userService.findById(idOfSelectedUser)
        await this.worldService.rejectFriendshipRequest(user, selectUser)
        return this.worldService.buildUserProfileResponse(selectUser, idOfSelectedUser)
    }

    @Post('/users/:idUser/delete')
    async removeUserAsFriends(@User() user: UserEntity, @Param('idUser') idOfSelectedUser: number): Promise<UserProfileResponseInterface> {
        const selectUser = await this.userService.findById(idOfSelectedUser)
        await this.worldService.removeUserAsFriends(user, selectUser)
        return this.worldService.buildUserProfileResponse(selectUser, idOfSelectedUser)
    }

    @Post('/users/:idUser/blocked')
    async blockedUser(@User() user: UserEntity, @Param('idUser') idOfSelectedUser: number): Promise<UserProfileResponseInterface> {
        const selectUser = await this.userService.findById(idOfSelectedUser)
        await this.worldService.blockedUser(user, selectUser)
        return this.worldService.buildUserProfileResponse(selectUser, idOfSelectedUser)
    }

    @Post('/users/:idUser/unblocked')
    async unblockedUser(@User() user: UserEntity, @Param('idUser') idOfSelectedUser: number): Promise<UserProfileResponseInterface> {
        const selectUser = await this.userService.findById(idOfSelectedUser)
        await this.worldService.unblockedUser(user, selectUser)
        return this.worldService.buildUserProfileResponse(selectUser, idOfSelectedUser)
    }
}