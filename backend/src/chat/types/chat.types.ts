export type ChatType = {
    id: number,
    chatName: string,
    image: string,
    numberOfMissed: number,
    status: 'online' | 'offline'
}