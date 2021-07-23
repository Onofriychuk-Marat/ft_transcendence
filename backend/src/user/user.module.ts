import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WorldModule } from 'src/world/world.module';
import { WorldService } from 'src/world/world.service';
import { AuthGuard } from './guards/auth.quard';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service'

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [UserController],
    providers: [UserService, AuthGuard],
    exports: [UserService]
})
export class UserModule {}