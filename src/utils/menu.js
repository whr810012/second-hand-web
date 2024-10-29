const menu = [
  {
    index: "map",
    title: "地图管理",
    icon: require('@/menu/home.png'),
    iconActive: require('@/menu/home-active.png'),
  },
  {
    index: "user",
    title: "用户管理",
    icon: require('@/menu/usercenter.png'),
    iconActive: require('@/menu/usercenter-active.png'),
  },
  {
    index:'goods-manage',
    title:'商品管理',
    icon:require('@/menu/product.png'),
    iconActive:require('@/menu/product-active.png'),
  },
  {
    index:'statistics',
    title:'统计管理',
    icon:require('@/menu/plan.png'),
    iconActive:require('@/menu/plan-active.png'),
  }
];

export default {
  menu,
};
