export type ChatType = {
    id: number,
    name: string,
    image: string,
    numberOfMissed: number,
    status: 'online' | 'offline'
}