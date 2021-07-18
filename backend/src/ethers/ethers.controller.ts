import { Controller, Get, UseGuards } from '@nestjs/common'
import { AuthGuard } from 'src/user/guards/auth.quard';
import { EthersService } from './ethers.service';
import { EtherType } from './types/ether.types';

@Controller('ethers')
export class EthersController {
    constructor(private readonly ethersService: EthersService) {}

    @Get()
    @UseGuards(AuthGuard)
    async watchAllEthers(): Promise<EtherType[]>{
        return this.ethersService.watchAllEthers()
    }
}