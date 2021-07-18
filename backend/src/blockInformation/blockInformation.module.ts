import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BlockInformationController } from './blockInformation.controller'
import { BlockInformationService } from './blockInformation.service'
import { BlockInformationEntity } from './blockInformation.entity'

@Module({
    imports: [TypeOrmModule.forFeature([BlockInformationEntity])],
    controllers: [BlockInformationController],
    providers: [BlockInformationService]
})
export class BlockInformationModule {}