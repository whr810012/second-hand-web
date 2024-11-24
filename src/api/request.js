import axios from "axios";
import { request } from "./index";

// 地图多边形
// 获取点位
export function getOptions() {
  return request({
    url: "/getLocation/options",
    method: "GET",
  });
}
// 提交点位
export function subOptions(data) {
  return request({
    url: "/Location/subOptions",
    method: "POST",
    data
  });
}
// 修改点位
export function changeOptions(data) {
  return request({
    url: "/Location/changeOptions",
    method: "POST",
    data
  })
}
// 删除点位
export function deleteOptions(data) {
  return request({
    url: "/Location/deleteOptions",
    method: "POST",
    data
  })
}
// 数据点
// 获取数据点
export function getMarkers() {
  return request({
    url: "/getLocation/markers",
    method: "GET",
  });
}
// 提交数据点
export function subMarkers(data) {
  return axios({
    url: "http://localhost:3000/Location/subMarkers",
    method: "POST",
    data
  })
}
// 修改数据点
export function updateMarkers(data) {
  return axios({
    url: "http://localhost:3000/Location/updateMarkers",
    method: "POST",
    data
  })
}
// 删除数据点
export function deleteMarkers(data) {
  return request({
    url: "/Location/deletemarkers",
    method: "POST",
    data
  })
}
// 登录
export function Login (data) {
  return request({
    url:"/login",
    method:"POST",
    data
  })
}
// 注册
export function Register (data) {
  return request({
    url:"/register",
    method:"POST",
    data
  })
}
// 获取个人信息
export function getMyInfo (data) {
  return request({
    url:"/getMyInfo",
    method:"POST",
    data
  })
}
// 获取所有用户
export function getUser (data) {
  return request({
    url:"/getuser",
    method:"get",
    data
  })
}
// 修改用户信息
export function changeUser(data) {
  return request({
    url:"/changeuser",
    method:"POST",
    data
  })
}
// 删除用户
export function deleteUser(data) {
  return request({
    url:"/deleteuser",
    method:"POST",
    data
  })
}
// ai描述
export function sendAi(data){
  return request({
    url:"/ai/goods",
    method:"POST",
    data
  })
}
// 上传商品信息
export function uploadGoods (data) {
  return axios({
    url:"http://localhost:3000/goods/upload",
    method:"POST",
    data
  })
}
//  获取商品信息
export function getGoods () {
  return request({
    url:"/goods",
    method:"GET"
  })
}
// 删除商品
export function deleteGoods (data) {
  return request({
    url:"/goods/delete",
    method:"POST",
    data
  })
}
// 上架商品
export function putGoods (data) {
  return request({
    url:"/goods/put",
    method:"POST",
    data
  })
}
// 下架商品
export function downGoods (data) {
  return request({
    url:"/goods/down",
    method:"POST",
    data
  })
}
// 商品详情
export function getGoodsDetail (data) {
  return request({
    url:"/goods/detail",
    method:"POST",
    data
  })
}
// 编辑商品
export function editorGoods(data) {
  return axios({
    url: "http://localhost:3000/goods/updateGoods",
    method: "POST",
    data
  })
}
// 购买商品
export function buyGoods(data) {
  return request({
    url:"/goods/buy",
    method:"POST",
    data
  })
}
// 获取我的订单
export function getMyOrder(data) {
  return request({
    url:"/goods/sold",
    method:"POST",
    data
  })
}
// 获取我卖出的商品
export function getMyBuyGoods(data) {
  return request({
    url:"/goods/buyed",
    method:"POST",
    data
  })
}
// 同意交易
export function agreeOver(data) {
  return request({
    url:"/goods/over",
    method:"POST",
    data
  })
}
// 拒绝交易
export function refuseOver(data) {
  return request({
    url:"/goods/refuse",
    method:"POST",
    data
  })
}
// 完成交易
export function finishOver(data) {
  return request({
    url:"/goods/finish",
    method:"POST",
    data
  })
}

// 获取所有订单
export function getAllOrder(data) {
  return request({
    url:"/goods/allOrder",
    method:"POST",
    data
  })
}