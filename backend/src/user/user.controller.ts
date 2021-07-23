import { Controller, Post, Put, Get, Body, Param, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common'
import { User } from './decorators/user.decorator'
import { CreateUserDto } from './dto/createUserDto'
import { LoginUserDto } from './dto/loginUserDto'
import { UpdateUserDto } from './dto/updateUserDto'
import { AuthGuard } from './guards/auth.quard'
import { UserType } from './types/user.types'
import { UserResponseInterface } from './types/userResponse.interface'
import { SettingsResponseInterface } from './types/settingsResponse.interface'
import { UserEntity } from './user.entity'
import { UserService } from './user.service'
import { MyProfileResponseInterface } from './types/myProfileResponse.interface'
import { WorldService } from 'src/world/world.service'
import { UserProfileResponseInterface } from './types/userProfileResponse.interface'

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('registration')
    @UsePipes(new ValidationPipe())
    async registration(@Body('user') createUserDto: CreateUserDto): Promise<UserResponseInterface> {
        const user = await this.userService.registration(createUserDto)
        return this.userService.buildUserResponse(user)
    }

    @Post('login')
    async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserResponseInterface> {
        const user = await this.userService.login(loginUserDto)
        return this.userService.buildUserResponse(user)
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    async watchProfile(@User() user: UserEntity): Promise<MyProfileResponseInterface> {
        return this.userService.buildMyProfileResponse(user)
    }

    @Get('settings')
    @UseGuards(AuthGuard)
    async watchSettings(@User() user: UserEntity): Promise<SettingsResponseInterface> {
        return this.userService.buildSettingsUserResponse(user)
    }

    @Put('settings')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async updateSettings(@User() user: UserEntity, @Body('user') userDto: UpdateUserDto): Promise<SettingsResponseInterface> {
        const updatedUser = await this.userService.updateSettingsUser(user, userDto)
        return this.userService.buildSettingsUserResponse(updatedUser)
    }
}
