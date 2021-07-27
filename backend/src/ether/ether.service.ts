import { EtherType } from "./types/ether.type";


export class EthersService {

    async getAllEthers(): Promise<EtherType[]> {
        return [
            {
                id: 123,
                firstFighter: 'utoomey',
                secondFighter: 'qmarowak',
                duration: '00:11:24',
                numberOfWatching: 14
            },
            {
                id: 123,
                firstFighter: 'utoomey',
                secondFighter: 'qmarowak',
                duration: '00:11:24',
                numberOfWatching: 14
            },
            {
                id: 123,
                firstFighter: 'utoomey',
                secondFighter: 'qmarowak',
                duration: '00:11:24',
                numberOfWatching: 14
            },
            {
                id: 123,
                firstFighter: 'utoomey',
                secondFighter: 'qmarowak',
                duration: '00:11:24',
                numberOfWatching: 14
            }
        ]
    }

    buildEthersResponse(ethers: EtherType[]) {
        return {
            ethers: ethers
        }
    }
}