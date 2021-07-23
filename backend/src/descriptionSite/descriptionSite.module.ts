import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DescriptionSiteController } from './descriptionSite.controller'
import { DescriptionSiteService } from './descriptionSite.service'
import { DescriptionSiteEntity } from './descriptionSite.entity'

@Module({
    imports: [TypeOrmModule.forFeature([DescriptionSiteEntity])],
    controllers: [DescriptionSiteController],
    providers: [DescriptionSiteService]
})
export class DescriptionSiteModule {}