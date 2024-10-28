const { pool, executeQuery } = require("./db");
const express = require("express");
const multer = require("multer"); // 导入 multer 模块
const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // 设置最大文件大小为 5MB
    fieldSize: 2 * 1024 * 1024, // 设置最大字段大小为 2MB（可根据需要调整）
  },
  dest: "uploads/",
});
const fs = require("fs");
const path = require("path"); // 确保引入 path 模块
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
// const upload = multer({ dest: 'uploads/' }); // 指定文件上传目录
// app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // 使用 express.json() 中间件来解析 JSON 数据
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://192.168.0.169:8080");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.get("/getuser", async (req, res) => {
  try {
    const sql = `SELECT * FROM user;`; //sql语句 搜索test表所有数据
    const result = await executeQuery(sql); //执行sql语句

    res.send({
      result,
      code: 200,
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

// app.post("/register", async (req, res) => {
//   console.log("===", req.body.code);
//   console.log("===", req.body.username);
//   const username = req.body.username;
//   // const userid = req.body.code
//   axios
//     .get("https://api.weixin.qq.com/sns/jscode2session", {
//       params: {
//         appid: "wx09c849e5050a4ad0",
//         secret: "0122867f51a9f3de3ab2f8564cbae3a7",
//         js_code: req.body.code,
//         grant_type: "authorization_code",
//       },
//     })
//     .then(async (response) => {
//       console.log(response.data.openid);
//       const userid = response.data.openid;
//       if (!username) {
//         return res.status(400).json({ message: "用户名不能为空" });
//       }
//       // 检查一下数据库是否有这个id
//       const sql1 = `SELECT * FROM user WHERE userid = ?`;
//       const result1 = await executeQuery(sql1, [userid]);
//       if (result1.length > 0) {
//         // 只修改username
//         const sql2 = `UPDATE user SET username = ? WHERE userid = ?`;
//         const result2 = await executeQuery(sql2, [username, userid]);
//         let isadmin = false;
//         if (userid === "o_EnM6SJeA7DUdVkuKQZ5NmUNw-s") {
//           isadmin = true;
//         }

//         res.status(201).json({
//           message: "注册成功",
//           userId: result2,
//           userid: userid,
//           isadmin: isadmin,
//         });
//       } else {
//         // 在这里可以添加更多的验证逻辑，如检查用户名是否已经存在等
//         try {
//           const sql = `INSERT INTO user (userid,username) VALUES ( ?, ?)`;
//           const result = await executeQuery(sql, [userid, username]);
//           let isadmin = false;
//           if (userid === "o_EnM6SJeA7DUdVkuKQZ5NmUNw-s") {
//             isadmin = true;
//           }

//           res.status(201).json({
//             message: "注册成功",
//             userId: result,
//             userid: userid,
//             isadmin: isadmin,
//           });
//         } catch (error) {
//           console.error("Error executing query:", error);
//           res.status(500).json({ message: "注册失败" });
//         }
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// });

app.post("/addgoods", async (req, res) => {
  // console.log('===',req.body);
  const shopid = req.body.userid;
  const goodsname = req.body.goodsname;
  const username = req.body.shopname;
  const shopprice = req.body.goodsprice;
  const longitude = req.body.longitude;
  const latitude = req.body.latitude;
  const address = req.body.address;
  const goodsclass = req.body.goodsclass;
  const title = req.body.goodstitle;
  const img = req.body.goods_img;
  // 将一个字符串数组转换为字符串，中间用逗号隔开
  const imglist = img.join(",");
  console.log(imglist);

  // const userid = req.body.code
  // return

  // 在这里可以添加更多的验证逻辑，如检查用户名是否已经存在等
  try {
    const sql = `INSERT INTO goods (username,shopprice,longitude,latitude,address,class,title,img,userid,goodsname) VALUES ( ?, ?,?,?,?,?,?,?,?,?)`;
    const result = await executeQuery(sql, [
      username,
      shopprice,
      longitude,
      latitude,
      address,
      goodsclass,
      title,
      imglist,
      shopid,
      goodsname,
    ]);

    res.status(201).json({ message: "添加成功", data: result });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "注册失败" });
  }
});

app.get("/getgoods", async (req, res) => {
  try {
    const sql = `SELECT * FROM goods;`; //sql语句 搜索test表所有数据
    const result = await executeQuery(sql); //执行sql语句
    const data = result.map((row) => ({ ...row, img: row.img.split(",") }));

    res.send({
      data: data,
      code: 200,
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/getovergoods", async (req, res) => {
  try {
    const sql = "SELECT * FROM `over`"; //sql语句 搜索test表所有数据
    const result = await executeQuery(sql); //执行sql语句
    const data = result.map((row) => ({ ...row, img: row.img.split(",") }));

    res.send({
      data: data,
      code: 200,
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/addover", async (req, res) => {
  console.log(req.body);
  const shopid = req.body.shopid;
  const overtime = req.body.overtime;
  const buyid = req.body.buyid;
  // const userid = req.body.code
  // return;

  try {
    // 通过goodsid获取goods表中对应的一列数据
    const sql1 = `SELECT * FROM goods WHERE shopid = ?`;
    const result = await executeQuery(sql1, [shopid]);

    const sql2 =
      "INSERT INTO `over` (overtime, buyid, userid, img, shopid, shopprice, address, class, title, longitude, latitude, username, goodsname) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const result2 = await executeQuery(sql2, [
      overtime,
      buyid,
      result[0].userid,
      result[0].img,
      result[0].shopid,
      result[0].shopprice,
      result[0].address,
      result[0].class,
      result[0].title,
      result[0].longitude,
      result[0].latitude,
      result[0].username,
      result[0].goodsname,
    ]);

    const sql = "DELETE FROM goods WHERE shopid = ?";
    const result3 = await executeQuery(sql, [shopid]);

    res.status(200).json({ message: "交易成功", data: result2 });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "获取商品信息失败" });
  }
});

app.post("/getover", async (req, res) => {
  console.log(req.body);
  const userid = req.body.userid;
  // const userid = req.body.code
  // return;

  try {
    // 通过userid
    const sql1 = "SELECT * FROM `over` WHERE userid = ?";
    const result1 = await executeQuery(sql1, [userid]);
    const data1 = result1.map((row) => ({ ...row, img: row.img.split(",") }));

    const sql2 = "SELECT * FROM `over` WHERE buyid = ?";
    const result2 = await executeQuery(sql1, [userid]);
    const data2 = result2.map((row) => ({ ...row, img: row.img.split(",") }));

    res
      .status(200)
      .json({ message: "交易成功", buygoods: data1, maingoods: data2 });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "获取商品信息失败" });
  }
});

app.post("/deletegoods", async (req, res) => {
  const shopid = req.body.shopid;
  try {
    // 执行删除操作的SQL语句
    const sql = "DELETE FROM `goods` WHERE shopid = ?";
    // 执行SQL语句，并传入商品ID作为参数
    const result = await executeQuery(sql, [shopid]);
    // 检查受影响的行数，如果大于0则表示删除成功，否则表示删除失败
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "商品删除成功" });
    } else {
      res.status(404).json({ message: "未找到对应的商品" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "删除商品失败" });
  }
});

app.post("/deleteovergoods", async (req, res) => {
  const shopid = req.body.shopid;
  try {
    // 执行删除操作的SQL语句
    const sql = "DELETE FROM `over` WHERE shopid = ?";
    // 执行SQL语句，并传入商品ID作为参数
    const result = await executeQuery(sql, [shopid]);
    // 检查受影响的行数，如果大于0则表示删除成功，否则表示删除失败
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "商品删除成功" });
    } else {
      res.status(404).json({ message: "未找到对应的商品" });
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: "删除商品失败" });
  }
});

app.get("/getLocation/options", async (req, res) => {
  try {
    const sql = "SELECT * FROM `options`"; //sql语句 搜索test表所有数据
    const result = await executeQuery(sql); //执行sql语句
    // console.log("获取数据成功", result);
    res.send({
      data: result,
      code: 200,
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/Location/subOptions", async (req, res) => {
  try {
    const { lat, lng } = req.body;
    // 生成一个随机id
    const id = Math.floor(Math.random() * 1000000) + new Date().getTime();
    // console.log(lat, lng, id);
    const sql = `INSERT INTO options (id, lat, lng) VALUES (?, ?, ?)`;
    const result = await executeQuery(sql, [id, lat, lng]);
    res.status(200).json({ message: "添加成功", data: result });
    // const sql = "INSERT INTO `options` (name, price, location) VALUES (?, ?, ?)"; //sql语句 搜索test表所有数据
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/Location/changeOptions", async (req, res) => {
  try {
    const { id, lat, lng } = req.body;
    // console.log(id, lat, lng);
    const sql = `UPDATE options SET lat = ?, lng = ? WHERE id = ?`;
    const result = await executeQuery(sql, [lat, lng, id]); //执行sql语句
    res.status(200).json({ message: "修改成功", data: result });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/Location/deleteOptions", async (req, res) => {
  try {
    const { ids } = req.body;
    console.log(ids);
    // 遍历ids进行删除
    for (const id of ids) {
      if (id) {
        const sql = `DELETE FROM options WHERE id = ?`;
        const result = await executeQuery(sql, [id]); //执行sql语句
      }
    }
    res.status(200).json({ message: "删除成功", data: { status: "success" } });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/getLocation/markers", async (req, res) => {
  try {
    const sql = "SELECT * FROM `markers`"; //sql语句 搜索test表所有数据
    const result = await executeQuery(sql); //执行sql语句
    // console.log("获取数据成功", result);
    res.send({
      data: result,
      code: 200,
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/Location/subMarkers", upload.array("files"), async (req, res) => {
  try {
    // 生成一个随机id
    const markerid = Math.floor(Math.random() * 1000000) + new Date().getTime();
    // console.log(req.files);
    // console.log(req.body);
    const { name, lat, lng, icon, detail } = req.body;
    // 检查是否有文件上传
    const filesBase64 = req.files
      ? await Promise.all(
          req.files.map(async (file) => {
            const filePath = path.resolve(file.path);
            const fileBuffer = await fs.promises.readFile(filePath);
            return {
              originalname: file.originalname,
              base64: fileBuffer.toString("base64"),
              contentType: file.mimetype,
            };
          })
        )
      : [];
    // 将filesBase64转换为json
    const filesJson = JSON.stringify(filesBase64);
    const sql = `INSERT INTO markers (markerid, lat, lng,name,icon,detail, filesJson) VALUES (?, ?, ?, ?, ?, ?, ?)`; //sql语句 搜索test表所有数据
    const result = await executeQuery(sql, [
      markerid,
      lat,
      lng,
      name,
      icon,
      detail,
      filesJson,
    ]);
    // 清空uploads文件
    fs.readdirSync("uploads").forEach((file) => {
      fs.unlinkSync(`uploads/${file}`);
    });
    // 返回成功响应
    res.status(200).json({
      message: "添加成功",
      id: markerid,
      data: result,
      files: filesBase64,
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/Location/updateMarkers", upload.array("files"), async (req, res) => {
  try {
    // 生成一个随机id
    const { markerid, name, lat, lng, icon, detail, oldfilesJson } = req.body;
    // 检查是否有文件上传
    const filesBase64 = req.files
      ? await Promise.all(
          req.files.map(async (file) => {
            const filePath = path.resolve(file.path);
            const fileBuffer = await fs.promises.readFile(filePath);
            return {
              originalname: file.originalname,
              base64: fileBuffer.toString("base64"),
              contentType: file.mimetype,
            };
          })
        )
      : [];
    // 将filesBase64转换为json
    const filesJson = JSON.stringify(filesBase64);
    // 将oldfilesJson和filesJson合并
    const newFile = JSON.parse(filesJson);
    const oldFile = JSON.parse(oldfilesJson);
    const files = [...oldFile, ...newFile];
    const filesJson2 = JSON.stringify(files);
    const sql = `UPDATE markers SET lat = ?, lng = ?, name = ?, icon = ?, detail = ?, filesJson = ? WHERE markerid = ?`; //sql语句 搜索test表所有数据
    const result = await executeQuery(sql, [
      lat,
      lng,
      name,
      icon,
      detail,
      filesJson2,
      markerid,
    ]);
    // 清空uploads文件
    fs.readdirSync("uploads").forEach((file) => {
      fs.unlinkSync(`uploads/${file}`);
    });

    // 返回成功响应
    res.status(200).json({
      message: "添加成功",
      id: markerid,
      data: result,
      files: filesBase64,
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/Location/deletemarkers", async (req, res) => {
  try {
    const { ids } = req.body;
    console.log(ids);
    // 遍历ids进行删除
    for (const id of ids) {
      if (id) {
        const sql = `DELETE FROM markers WHERE markerid = ?`;
        const result = await executeQuery(sql, [id]); //执行sql语句
      }
    }
    res.status(200).json({ message: "删除成功", data: { status: "success" } });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.post("/login", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  const sql = `SELECT * FROM admin WHERE username = ? AND password = ?`;
  const result = await executeQuery(sql, [username, password]);
  console.log(result);
  if (result.length > 0) {
    res.status(200).json({ message: "登录成功", data: result[0] });
  } else {
    res.status(401).json({ message: "用户名或密码错误" });
  }
});
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    // 查询数据库是否有username相同的记录
    const sql = `SELECT * FROM admin WHERE username = ?`;
    const result = await executeQuery(sql, [username]);
    if (result.length > 0) {
      return res.status(409).json({ message: "用户已存在" });
    }
    const uid = Math.floor(Math.random() * 1000000) + new Date().getTime();
    const sql1 = `INSERT INTO admin (username, password, uid) VALUES (?, ?, ?)`;
    const result1 = await executeQuery(sql1, [username, password, uid]);
    res.status(200).json({ message: "注册成功", data: result1 });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen("3000", () => {
  console.log(`node服务已启动 端口号是：3000`);
});
