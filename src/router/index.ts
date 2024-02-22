import { createRouter, createWebHistory, NavigationGuardWithThis, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import authMiddleware from './authMiddleware';
import VueRouteMiddleware, { GLOBAL_MIDDLEWARE_NAME } from './middleware';
import { PageName, Role } from '@/common/constants';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: PageName.Home,
    component: HomeView,
    meta:{
      public:true,
    }
  },
  {
    path:'/login',
    name: PageName.LOGIN_PAGE,
    component:()=>import('../components/Page/Login/page/LoginForm.vue'),
    meta: {
      public: true,
    }
  },
  {
    path:'/admin',
    redirect:'/admin/sanpham',
    name: PageName.ADMIN ,
    component:()=>import('../views/AdminView.vue'),
    meta:{
      public:false,
      role:Role.ADMIN
    },
    children:[
      {
        path:'sanpham',
        name: PageName.PRODUCT,
        component:()=>import('../components/Admin/Product/page/ProductView.vue'),
      },
      {
        path:'user',
        name: PageName.USER,
        component:()=>import('../components/Admin/User/page/UserView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(
  VueRouteMiddleware({
    [GLOBAL_MIDDLEWARE_NAME]: authMiddleware,
  }) as NavigationGuardWithThis<unknown>,
);

export default router
