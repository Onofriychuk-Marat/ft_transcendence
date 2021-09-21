import { createApp } from 'vue'
import App from './App.vue'
import "./theme.css"
import router from './routers'


const app = createApp(App)

// app.component('EtherModule', defineAsyncComponent(() => {
//     return import('./components/ethers/EthersModule.vue')
// }))
// app.component('InfoModule', defineAsyncComponent(() => {
//     return import('./components/info/InfoModule.vue')
// }))
// app.component('FriendModule', defineAsyncComponent(() => {
//     return import('./components/friends/FriendsModule.vue')
// }))
// app.component('ProfileModule', defineAsyncComponent(() => {
//     return import('./components/Profile/ProfileModule.vue')
// }))
// app.component('SettingModule', defineAsyncComponent(() => {
//     return import('./components/settings/SettingsModule.vue')
// }))
// app.component('WorldModule', defineAsyncComponent(() => {
//     return import('./components/world/WorldModule.vue')
// }))

// app.component('GameModule', defineAsyncComponent(() => {
//     return import('./components/Game/GameModule.vue')
// }))

app.use(router)
app.mount('#app')
