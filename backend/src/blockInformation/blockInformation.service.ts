import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateBlockInformationDto } from './dto/createBlockInformation.dto'
import { BlockInformationEntity } from './blockInformation.entity'

@Injectable()
export class BlockInformationService {
    constructor(
        @InjectRepository(BlockInformationEntity)
        private readonly blockInformationRepository: Repository<BlockInformationEntity>
    ) {}

    async createBlockInformation(createBlockInformationDto: CreateBlockInformationDto): Promise<{block: BlockInformationEntity}> {
        const newBlockInformation = new BlockInformationEntity()
        Object.assign(newBlockInformation, createBlockInformationDto)
        return {
            block: await this.blockInformationRepository.save(newBlockInformation)
        }
    }

    async deleteBlockInformation(id: number): Promise<{blocks: BlockInformationEntity[]}> {
        const blockInformation = await this.blockInformationRepository.findOne(id)
    
        if (!blockInformation) {
            throw new HttpException('Block information does not exist', HttpStatus.NOT_FOUND)
        }
        await this.blockInformationRepository.delete(id)
        return {
            blocks: await this.blockInformationRepository.find()
        }
    }

    async findAll(): Promise<{blocks: BlockInformationEntity[]}> {
        return {
            blocks: await this.blockInformationRepository.find()
        }
    }
}
