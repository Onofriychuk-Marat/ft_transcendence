import { EtherType } from "./types/ether.types";


export class EthersService {

    async watchAllEthers(): Promise<EtherType[]> {
        return [
            {
                id: 123,
                rivals: 'utoomey:qmarowak',
                duration: '00:11:24',
                numberOfWatching: 14
            },
            {
                id: 123,
                rivals: 'utoomey:qmarowak',
                duration: '00:11:24',
                numberOfWatching: 14
            },
            {
                id: 123,
                rivals: 'utoomey:qmarowak',
                duration: '00:11:24',
                numberOfWatching: 14
            },
            {
                id: 123,
                rivals: 'utoomey:qmarowak',
                duration: '00:11:24',
                numberOfWatching: 14
            }
        ]
    }
}