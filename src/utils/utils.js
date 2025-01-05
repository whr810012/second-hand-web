// 计算两点间距离
export const space = ( lng1, lat1, lng2, lat2) => {
  // 转换经纬度为弧度
  var radLat1 = (lat1 * Math.PI) / 180.0;
  var radLat2 = (lat2 * Math.PI) / 180.0;
  var a = radLat1 - radLat2;
  var b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;

  // Haversine公式计算距离
  var c =
    Math.pow(Math.sin(a / 2), 2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2);
  c = Math.min(1, Math.max(c, -1)); // 防止浮动误差
  var s = 2 * Math.asin(Math.sqrt(c));

  // 地球半径，单位为千米
  s = s * 6371;

  // 四舍五入到小数点后四位
  s = Math.round(s * 10000) / 10000;

  return s; // 返回距离，单位千米
};
