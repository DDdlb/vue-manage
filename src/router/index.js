import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Welcome from '../components/Welcome.vue'
import User from '../views/User.vue'

const routes = [
    {
        name: 'login',
        path: '/login',
        component: Login
    },
    {
        name: 'home',
        path: '/',
        component: Home,
        redirect: '/welcome',
        meta: {
            title: '首页'
        },
        children:[{
            name: 'welcome',
            path: '/welcome',
            component: Welcome,
            meta: {
                title: '欢迎页'
            }
        },{
            name: 'user',
            path: '/system/user',
            component: User,
            meta: {
                title: '用户管理'
            }
        }]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;