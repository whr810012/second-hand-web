# 项目说明文档

## 项目概述

本项目是一个基于Vue 2和Node.js的前后端一体化的二手商品交易网站。项目包含用户注册、登录、商品发布、浏览、购买等功能，并提供了后台管理界面，用于管理用户、商品和查看统计数据。此外，项目还集成了高德地图API，用于展示商品交易地点和地图管理功能。

## 技术栈

- 前端：Vue 2
- 后端：Node.js
- 数据库：MySQL
- 地图服务：高德地图API

## 目录结构

```
- babel.config.js
- gitignore
- jsconfig.json
- nodejs
  ├── db.js
  ├── index.js
  ├── package.json
  └── README.md
- package.json
- public
- README.md
- run.sh
- src
  ├── api
  │   ├── index.js
  │   └── request.js
  ├── App.vue
  ├── assets
  ├── components
  │   ├── breadCrumb.vue
  │   ├── goods
  │   │   ├── Goods.vue
  │   │   ├── myBuyGoods.vue
  │   │   └── MyOrder.vue
  │   ├── headerMenu.vue
  │   ├── mapmanage
  │   │   ├── MapContainer.vue
  │   │   ├── MarksManage.vue
  │   │   └── OptionsManage.vue
  │   ├── mapSelect.vue
  │   ├── menu.vue
  │   └── myInfo.vue
  ├── main.js
  ├── menu
  ├── pages
  │   ├── goods
  │   │   ├── buyGoods.vue
  │   │   ├── editorGoods.vue
  │   │   ├── myGoods.vue
  │   │   ├── shop.vue
  │   │   └── uploadGoods.vue
  │   ├── goods.vue
  │   ├── goodsDetail.vue
  │   ├── home
  │   │   ├── goodsManage.vue
  │   │   ├── mapManmage.vue
  │   │   ├── statisticsManage.vue
  │   │   └── userMangae.vue
  │   ├── home.vue
  │   ├── login.vue
  │   ├── myInfo.vue
  │   └── register.vue
  ├── router
  │   └── index.js
  ├── store
  │   └── index.js
  └── utils
      ├── menu.js
      └── utils.js
- vue.config.js
```

## 目录注释

- `babel.config.js`：Babel配置文件，用于设置JavaScript编译选项。
- `gitignore`：Git忽略文件，用于指定不需要版本控制的文件和目录。
- `jsconfig.json`：JavaScript项目配置文件，用于设置编辑器选项。
- `nodejs`：后端代码目录，包含数据库配置、API接口和服务器启动脚本。
- `package.json`：项目依赖和脚本配置文件。
- `public`：公共静态资源目录。
- `README.md`：项目说明文档。
- `run.sh`：项目启动脚本。
- `src`：前端代码目录，包含Vue组件、路由、状态管理和工具函数。
- `vue.config.js`：Vue项目配置文件。

## 高德地图API调用

- **高德地图API调用**：项目集成了高德地图API，用于展示商品交易地点和地图管理功能。在`MapContainer.vue`组件中，通过调用高德地图API，展示了地图界面，并实现了地图的缩放、拖动和标记功能。在`mapSelect.vue`组件中，通过调用高德地图API，实现了地点搜索和自动完成功能。

## 前端启动

1. 安装依赖：
   ```bash
   npm install
   ```
2. 启动项目：
   ```bash
   npm run serve
   ```

## 后端启动

1. 进入 `nodejs` 目录：
   ```bash
   cd nodejs
   ```
2. 安装依赖：
   ```bash
   npm install
   ```
3. 启动服务：
   ```bash
   node index.js
   ```

## 数据库配置

1. 在 `nodejs/db.js` 文件中配置MySQL数据库连接信息。
2. 确保MySQL服务正在运行。

## 功能描述

### 用户模块

- 用户注册
- 用户登录
- 获取用户信息
- 修改用户信息
- 删除用户
- 上传用户头像

### 商品模块

- 发布商品
- 获取商品列表
- 获取商品详情
- 编辑商品
- 删除商品
- 上架商品
- 下架商品
- 购买商品
- 获取我买到的商品
- 获取我卖出的商品
- 成交商品
- 拒绝商品
- 完成订单
- 获取所有订单

### 后台管理

- 管理用户
- 管理商品
- 查看统计数据

## 注意事项

- 请确保前后端服务同时运行。
- 数据库连接信息需要根据实际情况进行配置。
