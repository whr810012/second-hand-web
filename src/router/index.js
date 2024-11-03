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
import MyInfo from "@/pages/myInfo.vue";
import Shop from "../pages/goods/shop.vue"
import uploadGoods from "../pages/goods/uploadGoods.vue"
import myGoods from "../pages/goods/myGoods.vue"
import schoolMap from "../components/mapmanage/MapContainer.vue"
import goodsDetail from '../pages/goodsDetail.vue';

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
      },
      {
        path: "myInfo",
        name: "myInfo",
        component: MyInfo
      },
      {
        path:"goodsAdminDetail",
        name:"goodsAdminDetail",
        component:goodsDetail,
      }
    ],
  },
  {
    path: "/goods",
    name: "goods",
    component: GoodsIndex,
    redirect: { name: "shop" },
    children:[
      {
        path: "myInfo",
        name: "myInfo",
        component: MyInfo
      },
      {
        path:"shop",
        name:"shop",
        component:Shop,
      },
      {
        path:"uploadGoods",
        name:"uploadGoods",
        component:uploadGoods,
      },
      {
        path:"myGoods",
        name:"myGoods",
        component:myGoods,
      },
      {
        path:"schoolMap",
        name:"schoolMap",
        component:schoolMap,
      },
      {
        path:"goodsDetail",
        name:"goodsDetail",
        component:goodsDetail,
      }
    ]
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