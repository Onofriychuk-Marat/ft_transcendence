export type ElementWorldType = {
    id: number,
    name: string,
    image: string,
    status: 'offline' | 'online',
    type: 'friend' | 'user' | 'userBlocked' | 'chat' | 'chatOpen' | 'chatBlocked'
}