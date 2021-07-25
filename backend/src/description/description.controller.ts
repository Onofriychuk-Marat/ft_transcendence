import { Controller, Get, Post, Body, UseGuards, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthGuard } from 'src/user/guards/auth.quard'
import { CreateDescriptionDto } from './dto/createDescription.dto'
import { DescriptionService } from './description.service'
import { DescriptionResponseInterface } from './interfaces/descriptonResponse.interface'
import { DescriptionsResponseInterface } from './interfaces/descriptionsResponse.interface'

@Controller()
export class DescriptionController {
    constructor(private readonly descriptionService: DescriptionService) {}

    @Post('/description/create')
    @UseGuards(AuthGuard)
    @UsePipes(new ValidationPipe())
    async createDescription(@Body('description') createDescriptionDto: CreateDescriptionDto): Promise<DescriptionResponseInterface> {
        const description = await this.descriptionService.createDescription(createDescriptionDto)
        return this.descriptionService.buildDescriptionResponse(description)
    }

    @Delete('/descriptions/:id/delete')
    @UseGuards(AuthGuard)
    async deleteDescription(@Param('id') idDescription: number): Promise<DescriptionResponseInterface> {
        const description = await this.descriptionService.deleteDescription(idDescription)
        return this.descriptionService.buildDescriptionResponse(description)
    }

    @Get('descriptions')
    @UseGuards(AuthGuard)
    async findAll(): Promise<DescriptionsResponseInterface> {
        const descriptions = await this.descriptionService.findAll()
        return this.descriptionService.buildDescriptionsResponse(descriptions)
    }
}
