import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateDescriptionDto } from './dto/createDescription.dto'
import { DescriptionEntity } from './description.entity'
import { DescriptionType } from './types/description.type'
import { DescriptionResponseInterface } from './interfaces/descriptonResponse.interface'
import { DescriptionsResponseInterface } from './interfaces/descriptionsResponse.interface'

@Injectable()
export class DescriptionService {
    constructor(
        @InjectRepository(DescriptionEntity)
        private readonly descriptionRepository: Repository<DescriptionEntity>
    ) {}

    async createDescription(createDescription: CreateDescriptionDto): Promise<DescriptionEntity> {
        const newDescription = new DescriptionEntity()
        Object.assign(newDescription, createDescription)
        return await this.descriptionRepository.save(newDescription)
    }

    async deleteDescription(id: number): Promise<DescriptionEntity> {
        const description = await this.descriptionRepository.findOne(id)
        if (!description) {
            throw new HttpException('Block information does not exist', HttpStatus.NOT_FOUND)
        }
        await this.descriptionRepository.delete(id)
        return description
    }

    async findAll(): Promise<DescriptionEntity[]> {
        return await this.descriptionRepository.find()
    }

    buildDescriptionResponse(description: DescriptionType): DescriptionResponseInterface {
        return {
            description: description
        }
    }

    buildDescriptionsResponse(descriptions: DescriptionType[]): DescriptionsResponseInterface {
        return {
            descriptions: descriptions
        }
    }
}
