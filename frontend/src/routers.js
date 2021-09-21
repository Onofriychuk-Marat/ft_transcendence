import {createRouter, createWebHistory} from 'vue-router'
import Registration from './pages/Registration.vue'
import Authorization from './pages/Authorization.vue'
import Ethers from './components/ethers/EthersModule.vue'
import Friends from './components/friends/FriendsModule.vue'
import Game from './components/Game/GameModule.vue'
import Info from './components/info/InfoModule.vue'
import Profile from './components/Profile/ProfileModule.vue'
import Setting from './components/settings/SettingsModule.vue'
import World from './components/world/WorldModule.vue'
import BlockButton from "./components/Profile/blockButton.vue"




export default createRouter({
    history: createWebHistory(),
    routes: [
        {path: "/reg", component: Registration},
        {path: "/auth", component: Authorization},
        {path: "/info", component: Info},
        {path: "/ethers", component: Ethers},
        {path: "/friends", component: Friends},
        {path: "/game", component: Game},
        {path: "/profile", component: Profile,
            children: [
                {
                    path: "user:id", component: BlockButton, props: true
                }
            ]},
        {path: "/setting", component: Setting},
        {path: "/world", component: World, props: true},
    ],
})

// export default router;