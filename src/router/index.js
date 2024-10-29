import { createRouter, createWebHistory } from 'vue-router'
import menu from "../utils/menu";
import store from "../store";
import Login from '../pages/login.vue'
import Home from "@/pages/home.vue";
import mapManage from "@/pages/home/mapManmage.vue";
import Register from '../pages/register.vue'
import userMangae from "../pages/home/userMangae.vue"
import goodsManage from "../pages/home/goodsManage.vue"
import statisticsManage from "../pages/home/statisticsManage.vue"
import GoodsIndex from "@/pages/goods.vue"

// 定义路由
const routes = [
  {
    path: '/',
    name:'/',
    redirect: "/goods",
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/admin",
    name: "/admin",
    component: Home,
    meta: { requiresAuth: true },
    redirect: { name: "map" },
    children: [
      {
        path: "map",
        name: "map",
        component: mapManage,
        meta: { requiresAuth: true },
      },
      {
        path:'user',
        name:'user',
        component:userMangae,
        meta: { requiresAuth: true }
      },
      {
        path:'goods-manage',
        name:'goods-manage',
        component:goodsManage,
        meta: { requiresAuth: true }
      },{
        path:'statistics',
        name:'statistics',
        component:statisticsManage,
        meta: { requiresAuth: true }
      }
    ],
  },
  {
    path: "/goods",
    name: "/goods",
    component: GoodsIndex
  }
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});
router.afterEach((from) => {
  const title = menu.menu.filter((i) => i.index === from.name);
  console.log(title);
  store.commit("setBreadList", title);
});

// 导出路由实例
export default router;