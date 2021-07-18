import { Controller, Get, Post, Body, UseGuards, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthGuard } from 'src/user/guards/auth.quard'
import { CreateBlockInformationDto } from './dto/createBlockInformation.dto'
import { BlockInformationEntity } from './blockInformation.entity'
import { BlockInformationService } from './blockInformation.service'

@Controller('information')
export class BlockInformationController {
    constructor(private readonly blockInformationService: BlockInformationService) {}

    @Post('create')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async createBlockInformation(@Body('block') createBlockInformationDto: CreateBlockInformationDto): Promise<{block: BlockInformationEntity}> {
        return await this.blockInformationService.createBlockInformation(createBlockInformationDto)
    }

    @Delete(':id/delete')
    @UseGuards(AuthGuard)
    async deleteBlockInformation(@Param('id') idBlockInformation: string): Promise<{blocks: BlockInformationEntity[]}> {
        return await this.blockInformationService.deleteBlockInformation(Number(idBlockInformation))
    }

    @Get()
    @UseGuards(AuthGuard)
    async findAll(): Promise<{blocks: BlockInformationEntity[]}> {
        return await this.blockInformationService.findAll()
    }
}