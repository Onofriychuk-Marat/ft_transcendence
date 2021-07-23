// import { UserEntity } from "src/user/user.entity"


// export getTypeUser(user: UserEntity, idFriend: number): 'friend' | 'user' | 'userBlocked' {
//     const isFriend = user.friendsId.findIndex((id) => id === user.id) !== -1
//     if (isFriend) {
//         return 'friend'
//     }
//     const isUserBlocked = user.blackListUsersId.findIndex((id) => id === user.id) !== -1
//     if (isUserBlocked) {
//         return 'userBlocked'
//     }
//     return 'user'
// }

// getTypeChat(user: UserEntity, chat: ChatEntity): 'chat' | 'chatOpen' | 'chatBlocked' {
//     const isMyChat = user.chats.findIndex(id => id == chat.id) !== -1
//     if (isMyChat) {
//         return 'chat'
//     }
//     if (chat.accessCode !== 0) {
//         return 'chatBlocked'
//     }
//     return 'chatOpen'
// }