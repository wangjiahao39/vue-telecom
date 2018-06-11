import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/login'
import Home from '@/pages/home/home'
import Staff from '@/pages/admin/staff'
import Dictionaries from '@/pages/dict/dict'
import Apply from '@/pages/apply/apply'
import Institutional from '@/pages/institutional/institutional'
import Newdict from '@/pages/dict/newdict'

Vue.use(Router)

let router = new Router({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: Login,
            beforeEnter (to, from, next) {
                next()
            }
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            children:[
                {
                    path: 'staff',
                    name: 'staff',
                    component: Staff,
                },
                {
                    path: 'dictionaries',
                    name: 'dictionaries',
                    component: Dictionaries,
                },
                {
                    path: 'apply',
                    name: 'apply',
                    component: Apply,
                },
                {
                    path: 'institutional',
                    name: 'institutional',
                    component: Institutional,
                },
                {
                    path: 'newdict',
                    name: 'newdict',
                    component: Newdict,
                }
            ]
        }
    ]
})

// 导航守卫

router.beforeEach((to, from, next) => {
    if (to.name === 'Login') {
        next()
    } else {
        let islogin = sessionStorage.getItem('islogin')
        if (islogin) {
            next()
        } else {
            next('/login')
        }
    }
})
export default router
