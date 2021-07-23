import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateDescriptionSiteDto } from './dto/createDescriptionSite.dto'
import { DescriptionSiteEntity } from './descriptionSite.entity'

@Injectable()
export class DescriptionSiteService {
    constructor(
        @InjectRepository(DescriptionSiteEntity)
        private readonly DescriptionSiteRepository: Repository<DescriptionSiteEntity>
    ) {}

    async createDescriptionSite(createDescriptionSite: CreateDescriptionSiteDto): Promise<{block: DescriptionSiteEntity}> {
        const newDescriptionSite = new DescriptionSiteEntity()
        Object.assign(newDescriptionSite, createDescriptionSite)
        return {
            block: await this.DescriptionSiteRepository.save(newDescriptionSite)
        }
    }

    async deleteDescriptionSite(id: number): Promise<{blocks: DescriptionSiteEntity[]}> {
        const DescriptionSite = await this.DescriptionSiteRepository.findOne(id)
        if (!DescriptionSite) {
            throw new HttpException('Block information does not exist', HttpStatus.NOT_FOUND)
        }
        await this.DescriptionSiteRepository.delete(id)
        return {
            blocks: await this.DescriptionSiteRepository.find()
        }
    }

    async findAll(): Promise<{blocks: DescriptionSiteEntity[]}> {
        return {
            blocks: await this.DescriptionSiteRepository.find()
        }
    }
}
