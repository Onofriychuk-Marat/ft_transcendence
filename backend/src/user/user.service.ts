import { Injectable, HttpStatus, HttpException } from '@nestjs/common'
import { UserEntity } from './user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/createUserDto'
import { sign } from 'jsonwebtoken'
import { JWT_SECRET } from 'src/ormconfig'
import { UserResponseInterface } from './types/userResponse.interface'
import { LoginUserDto } from './dto/loginUserDto'
import { compare, hash } from 'bcrypt'
import { UserType } from './types/user.types'
import { SettingsResponseInterface } from './types/userSettings.interface'
import { UpdateUserDto } from './dto/updateUserDto'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {}

    async registration(createUserDto: CreateUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            username: createUserDto.username
        })
        if (user) {
            throw new HttpException({
                errors: {
                    username: 'has already been taken'
                }
            }, HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const newUser = new UserEntity()
        Object.assign(newUser, createUserDto)
        return await this.userRepository.save(newUser)
    }

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            username: loginUserDto.username
        }, { select: ['id', 'username', 'image', 'password'] })
        if (!user) {
            throw new HttpException({
                errors: {
                    'username': 'is invalid'
                }
            }, HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const isPasswordCorrect = await compare(
            loginUserDto.password,
            user.password
        )
        if (!isPasswordCorrect) {
            throw new HttpException({
                errors: {
                    'password': 'is invalid'
                }
            }, HttpStatus.UNPROCESSABLE_ENTITY)
        }
        return user
    }

    async updateSettingsUser(user: UserEntity, updateUserDto: UpdateUserDto): Promise<UserEntity> {
        
        if (updateUserDto.username) {
            user.username = updateUserDto.username
        }
        if (updateUserDto.password) {
            user.password = await hash(updateUserDto.password, 10)
        }
        if (updateUserDto.image) {
            user.username = updateUserDto.image
        }
        return this.userRepository.save(user)
    }

    async findById(id: number): Promise<UserEntity> {
        return await this.userRepository.findOne(id, { 
            select: ['id', 'username', 'image', 'countGames', 'countWin', 'countLose',
                    'bestWinStreak', 'rating', 'minimalRating', 'maximumRating', 'bestWin'] 
        })
    }

    generateJwt(user: UserEntity): string {
        return sign({
            id: user.id,
            username: user.username
        }, JWT_SECRET)
    }

    buildUserResponse(user: UserEntity): UserResponseInterface {
        delete user.password
        return {
            user: {
                id: user.id,
                username: user.username,
                image: user.image,
                token: this.generateJwt(user)
            }
            
        }
    }

    buildProfileResponse(user: UserEntity): UserType {
        delete user.password
        return user
    }

    buildSettingsUserResponse(user: UserEntity): SettingsResponseInterface {
        return {
            user: {
                id: user.id,
                username: user.username,
                image: user.image
            }
        }
    }
}