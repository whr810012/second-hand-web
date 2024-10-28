import { createRouter, createWebHistory } from 'vue-router'
import menu from "../utils/menu";
import store from "../store";
import Login from '../pages/login.vue'
import Home from "@/pages/home.vue";
import mapManage from "@/pages/home/mapManmage.vue";
import Register from '../pages/register.vue'

// 定义路由
const routes = [
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
    path: "/",
    name: "/",
    component: Home,
    meta: { requiresAuth: true },
    redirect: { name: "map" },
    children: [
      {
        path: "map",
        name: "map",
        component: mapManage,
        meta: { requiresAuth: true },
      }
    ],
  },
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