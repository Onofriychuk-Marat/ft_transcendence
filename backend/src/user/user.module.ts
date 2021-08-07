import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WorldModule } from 'src/world/world.module';
import { WorldService } from 'src/world/world.service';
import { FriendEntity } from './friend.entity';
import { AuthGuard } from './guards/auth.quard';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service'

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, FriendEntity])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}