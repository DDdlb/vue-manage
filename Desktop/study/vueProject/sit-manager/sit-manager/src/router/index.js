import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome.vue'
import Sit from '../views/Sit'
import SitList from '../components/SitList'
import SitOrder from '../components/SitOrder'
import Room from '../components/Room'
import Region from '../components/Region'
import SitDetail from '../components/SitDetail'
import User from '../views/User.vue'
import UserInfo from '../components/UserInfo'
import Message from '../components/Message'
import Register from '../views/register'

const routes = [
    {
        name: 'login',
        path: '/login',
        component: Login
    },{
        name: 'register',
        path: '/register',
        component: Register
    },{
        name: 'home',
        path: '/',
        component: Home,
        redirect: '/welcome',
        meta: {
            title: '首页'
        },
        children: [{
            name: 'welcome',
            path: '/welcome',
            component: Welcome,
            meta: {
                title: '欢迎页'
            }
        },{
            name: 'sit',
            path: '/sit',
            component: Sit,
            meta: {
                title: '座位信息'
            },
            children:[{
                name: 'sitSearch',
                path: '/sit/search',
                component: SitList,
                meta: {
                    title: '座位查询'
                }
            },{
                name: 'sitOrder',
                path: '/sit/order/:room?/:region?/:number?',
                component: SitOrder,
                meta: {
                    title: '座位预定'
                }
            },{
                name: 'sitRoom',
                path: '/sit/room',
                component: Room,
                meta: {
                    title: '自习室'
                }
            },{
                name: 'sitRegion',
                path: '/sit/region/:room?',
                component: Region,
                meta: {
                    title: '自习室/分区'
                }
            },{
                name: 'sitDetail',
                path: '/sit/detail/:room?/:region?',
                component: SitDetail,
                meta: {
                    title: '自习室/分区/座位'
                }
            }],

        },{
            name: 'user',
            path: '/user',
            component: User,
            meta: {
                title: '用户信息'
            },
            children:[{
                name: 'userInfo',
                path: '/user/info',
                component: UserInfo,
                meta: {
                    title: '个人信息'
                }
            },{
                name: 'userMessage',
                path: '/user/message',
                component: Message,
                meta:{
                    title: '我的消息'
                }
            }]
        }]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;