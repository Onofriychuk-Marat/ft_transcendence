import { Injectable, HttpStatus, HttpException } from '@nestjs/common'
import { UserEntity } from './user.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/createUserDto'
import { sign } from 'jsonwebtoken'
import { JWT_SECRET } from 'src/ormconfig'
import { UserResponseInterface } from './interfaces/userResponse.interface'
import { LoginUserDto } from './dto/loginUserDto'
import { compare, hash } from 'bcrypt'
import { UserType } from './types/user.type'
import { UpdateUserDto } from './dto/updateUserDto'
import { TypeUserType } from 'src/chat/types/typeUser.type'
import { ProfileType } from './types/profile.type'
import { ProfileResponseInterface } from './interfaces/profileResponse.interface'
import { ProfileSelectUserType } from './types/profileSelectUser.type'
import { ProfileSelectUserResponseInterface } from './interfaces/profileSelectUserResponse.interface'

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
        newUser.position = 'User'
        return await this.userRepository.save(newUser)
    }

    async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            username: loginUserDto.username
        })
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
                    password: 'is invalid'
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
        return this.userRepository.findOne(id, { 
            relations: ['conversations', 'friends', 'blackListUsers', 'friendInvitation', 'myFriendshipRequests'] 
        })
    }

    async findAll(): Promise<UserEntity[]> {
        return this.userRepository.find()
    }

    generateJwt(user: UserEntity): string {
        return sign({
            id: user.id,
            username: user.username
        }, JWT_SECRET)
    }

    getTypeUser(user: UserEntity, selectUser: UserEntity): TypeUserType  {
        const isFriend = user.friends.findIndex(friend => friend.id === selectUser.id) !== -1
        if (isFriend) {
            return 'friend'
        }
        const isUserBlocked = user.blackListUsers.findIndex(userItem => userItem.id === selectUser.id) !== -1
        if (isUserBlocked) {
            return 'userBlocked'
        }
        const isFriendInvitation = user.friendInvitation.findIndex(userItem => userItem.id == selectUser.id) !== -1
        if (isFriendInvitation) {
            return 'friendInvitation'
        }
        const isFriendshipRequest = user.myFriendshipRequests.findIndex(userItem => userItem.id === selectUser.id) !== -1
        if (isFriendshipRequest) {
            return 'friendshipRequest'
        }
        return 'user'
    }

    getUser(userEntity: UserEntity): UserType {
        delete userEntity.password
        delete userEntity.conversations
        delete userEntity.friends
        delete userEntity.blackListUsers
        delete userEntity.friendInvitation
        delete userEntity.myFriendshipRequests
        return {
            ...userEntity,
            token: this.generateJwt(userEntity)
        }
    }

    getProfile(userEntity: UserEntity): ProfileType {
        delete userEntity.password
        delete userEntity.conversations
        delete userEntity.friends
        delete userEntity.blackListUsers
        delete userEntity.friendInvitation
        delete userEntity.myFriendshipRequests
        return {
            ...userEntity
        }
    }

    buildUserResponse(user: UserType): UserResponseInterface {
        return {
            user: user
        }
    }

    buildProfileResponse(profile: ProfileType): ProfileResponseInterface {
        return {
            profile: profile
        }
    }

    buildProfileSelectUserResponse(profile: ProfileSelectUserType): ProfileSelectUserResponseInterface {
        return {
            profileSelectUser: profile
        }
    }
}