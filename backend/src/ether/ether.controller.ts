import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/user/guards/auth.quard';
import { EthersService } from './ether.service';
import { EtherType } from './types/ether.type';
import { EthersResponseInterface } from './interfaces/ethersResponse.interface';

@Controller('ethers')
export class EthersController {
    constructor(private readonly ethersService: EthersService) {}

    @Get()
    @UseGuards(AuthGuard)
    async watchAllEthers(): Promise<EthersResponseInterface>{
        const ethers = await this.ethersService.getAllEthers()
        return this.ethersService.buildEthersResponse(ethers)
    }
}