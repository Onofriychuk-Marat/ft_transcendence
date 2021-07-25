import { Module } from '@nestjs/common'
import { EthersController } from './ether.controller';
import { EthersService } from './ether.service';

@Module({
    imports: [],
    controllers: [EthersController],
    providers: [EthersService]
})
export class EtherModule {}