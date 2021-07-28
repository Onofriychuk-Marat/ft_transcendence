import { Module } from '@nestjs/common'
import { AppGateway } from './test.gateway';

@Module({
    providers: [AppTest]
})
export class AppTest {}