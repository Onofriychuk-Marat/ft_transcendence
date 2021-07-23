import { Controller, Get, Post, Body, UseGuards, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthGuard } from 'src/user/guards/auth.quard'
import { CreateDescriptionSiteDto } from './dto/createDescriptionSite.dto'
import { DescriptionSiteEntity } from './descriptionSite.entity'
import { DescriptionSiteService } from './descriptionSite.service'

@Controller('description')
export class DescriptionSiteController {
    constructor(private readonly DescriptionSiteService: DescriptionSiteService) {}

    @Post('create')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async createDescriptionSite(@Body('block') createDescriptionSiteDto: CreateDescriptionSiteDto): Promise<{block: DescriptionSiteEntity}> {
        return await this.DescriptionSiteService.createDescriptionSite(createDescriptionSiteDto)
    }

    @Delete(':id/delete')
    @UseGuards(AuthGuard)
    async deleteDescriptionSite(@Param('id') idDescriptionSite: string): Promise<{blocks: DescriptionSiteEntity[]}> {
        return await this.DescriptionSiteService.deleteDescriptionSite(Number(idDescriptionSite))
    }

    @Get()
    @UseGuards(AuthGuard)
    async findAll(): Promise<{blocks: DescriptionSiteEntity[]}> {
        return await this.DescriptionSiteService.findAll()
    }
}