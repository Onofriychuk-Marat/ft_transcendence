import { Controller, Post, Put, Get, Body, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { User } from './decorators/user.decorator'
import { CreateUserDto } from './dto/createUserDto'
import { LoginUserDto } from './dto/loginUserDto'
import { UpdateUserDto } from './dto/updateUserDto'
import { AuthGuard } from './guards/auth.quard'
import { UserType } from './types/user.types'
import { UserResponseInterface } from './types/userResponse.interface'
import { SettingsResponseInterface } from './types/userSettings.interface'
import { UserEntity } from './user.entity'
import { UserService } from './user.service'

@Controller()
export class UserController {
    constructor(private userService: UserService) {}

    @Post('/user/registration')
    @UsePipes(new ValidationPipe())
    async registration(@Body('user') createUserDto: CreateUserDto): Promise<UserResponseInterface> {
        const user = await this.userService.registration(createUserDto)
        return this.userService.buildUserResponse(user)
    }

    @Post('/user/login')
    async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserResponseInterface> {
        const user = await this.userService.login(loginUserDto)
        return this.userService.buildUserResponse(user)
    }

    @Get('/user')
    @UseGuards(AuthGuard)
    async watchProfile(@User() user: UserEntity): Promise<UserType> {
        return this.userService.buildProfileResponse(user)
    }

    @Get('/user/settings')
    @UseGuards(AuthGuard)
    async watchSettings(@User() user: UserEntity): Promise<SettingsResponseInterface> {
        return this.userService.buildSettingsUserResponse(user)
    }

    @Put('/user/settings')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async updateSettings(@User() user: UserEntity, @Body('user') userDto: UpdateUserDto): Promise<SettingsResponseInterface> {
        const updatedUser = await this.userService.updateSettingsUser(user, userDto)
        return this.userService.buildSettingsUserResponse(updatedUser)
    }

    @Get('/users/:id')
    async watchSelectProfile() {

    }

    @Post('/users/:id/blocked')
    async blockedUser() {

    }

    @Post('/users/:id/unblocked')
    async unblockedUser() {

    }

    @Post('/users/:id/add')
    async addAsFriend() {

    }

    @Post('/users/:id/delete')
    async removeFromFriends() {

    }
}