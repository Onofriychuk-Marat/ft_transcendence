import { Controller, Post, Put, Get, Body, Param, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { User } from './decorators/user.decorator'
import { CreateUserDto } from './dto/createUserDto'
import { LoginUserDto } from './dto/loginUserDto'
import { UpdateUserDto } from './dto/updateUserDto'
import { AuthGuard } from './guards/auth.quard'
import { ProfileResponseInterface } from './interfaces/profileResponse.interface'
import { UserResponseInterface } from './interfaces/userResponse.interface'
import { ProfileType } from './types/profile.type'
import { UserType } from './types/user.type'
import { UserEntity } from './user.entity'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('registration')
    @UsePipes(new ValidationPipe())
    async registration(@Body('user') createUserDto: CreateUserDto): Promise<UserResponseInterface> {
        const userEntity: UserEntity = await this.userService.registration(createUserDto)
        const user: UserType = this.userService.getUser(userEntity)
        return this.userService.buildUserResponse(user)
    }

    @Post('login')
    async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserResponseInterface> {
        const userEntity: UserEntity = await this.userService.login(loginUserDto)
        const user: UserType = this.userService.getUser(userEntity)
        return this.userService.buildUserResponse(user)
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    async watchProfile(@User() user: UserEntity): Promise<ProfileResponseInterface> {
        const profile: ProfileType = this.userService.getProfile(user)
        return this.userService.buildProfileResponse(profile)
    }

    @Get('settings')
    @UseGuards(AuthGuard)
    async watchSettings(@User() userEntity: UserEntity): Promise<ProfileResponseInterface> {
        const user: ProfileType = this.userService.getProfile(userEntity)
        return this.userService.buildProfileResponse(user)
    }

    @Put('settings')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async updateSettings(@User() currentUser: UserEntity, @Body('user') userDto: UpdateUserDto): Promise<ProfileResponseInterface> {
        const userEntity: UserEntity = await this.userService.updateSettingsUser(currentUser, userDto)
        const user: ProfileType = this.userService.getProfile(userEntity)
        return this.userService.buildProfileResponse(user)
    }
}
