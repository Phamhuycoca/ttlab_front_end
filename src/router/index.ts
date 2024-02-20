import { createRouter, createWebHistory, NavigationGuardWithThis, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import VueRouteMiddleware, { GLOBAL_MIDDLEWARE_NAME } from './middleware';
import AuthMiddleware from './authMiddleware';
import { PageName } from '@/common/constants';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
   
  },
  {
    path:'/login',
    name: PageName.LOGIN_PAGE,
    component:()=>import('../components/features/auth/page/LoginForm.vue'),
    meta: {
      public: true,
    }
  },
  {
    path:'/admin',
    name: PageName.DASHBOARD_PAGE ,
    component:()=>import('../views/AdminView.vue'),
    children:[
      {
        path:'sanpham',
        name: 'sanpham',
        component:()=>import('../components/features/product/page/Product.vue'),
      },
      {
        path:'user',
        name: 'user',
        component:()=>import('../components/features/user/page/User.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// router.beforeEach(
//   VueRouteMiddleware({
//     [GLOBAL_MIDDLEWARE_NAME]: AuthMiddleware,
//   }) as NavigationGuardWithThis<unknown>,
// );

export default router
