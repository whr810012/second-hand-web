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
  res.setHeader("Access-Control-Allow-Origin", "https://localhost:8080");
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
  const sql = `SELECT * FROM user WHERE username = ? AND password = ?`;
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
    const sql = `SELECT * FROM user WHERE username = ?`;
    const result = await executeQuery(sql, [username]);
    if (result.length > 0) {
      return res.status(409).json({ message: "用户已存在" });
    }
    const uid = Math.floor(Math.random() * 1000000) + new Date().getTime();
    const time = new Date();
    const sql1 = `INSERT INTO user (username, password, uid, name, img, time) VALUES (?, ?, ?, ?, ?, ?)`;
    const result1 = await executeQuery(sql1, [
      username,
      password,
      uid,
      "用户",
      null,
      time,
    ]);
    res.status(200).json({ message: "注册成功", data: result1 });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/getMyInfo", async (req, res) => {
  try {
    const { uid } = req.body;
    const sql = `SELECT * FROM user WHERE uid = ?`;
    const result = await executeQuery(sql, [uid]);
    res.status(200).json({ message: "获取成功", data: result });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/changeuser", async (req, res) => {
  try {
    const { username, password, name, age, xingbie, telephone, isadmin, uid } =
      req.body;
    console.log(
      username,
      password,
      name,
      age,
      xingbie,
      telephone,
      isadmin,
      uid
    );
    const sql = `UPDATE user SET username = ?, password = ?, name = ?, age = ?, xingbie = ?, telephone = ?, isadmin = ? WHERE uid = ?`;
    const result = await executeQuery(sql, [
      username,
      password,
      name,
      age,
      xingbie,
      telephone,
      isadmin,
      uid,
    ]);
    res.status(200).json({ message: "修改成功", data: result });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/deleteuser", async (req, res) => {
  try {
    const { uid } = req.body;
    const sql = `DELETE FROM user WHERE uid = ?`;
    const result = await executeQuery(sql, [uid]);
    res.status(200).json({ message: "删除成功", data: result });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/upLoadImage", upload.array("file"), async (req, res) => {
  try {
    const file = req.files[0];
    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    const sql = `UPDATE user SET img = ? WHERE uid = ?`;
    const filePath = path.resolve(file.path);
    const fileBuffer = await fs.promises.readFile(filePath);

    const img = {
      originalname: file.originalname,
      base64: fileBuffer.toString("base64"),
      contentType: file.mimetype,
    };
    const imgJson = JSON.stringify(img);
    const result = await executeQuery(sql, [imgJson, req.body.uid]);
    // 清空uploads文件
    fs.readdirSync("uploads").forEach((file) => {
      fs.unlinkSync(`uploads/${file}`);
    });
    res.status(200).json({ message: "上传成功", data: result });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/ai/goods", async (req, res) => {
  const form = req.body;
  console.log(req.body);

  // 检查 form 对象是否存在以及必要字段是否有效
  if (
    !form ||
    !form.name ||
    !form.price ||
    !form.discount ||
    !form.category ||
    !form.condition
  ) {
    return res.status(400).json({ error: "请求数据不完整" });
  }
  const options = [
    { label: "书籍", value: "book" },
    { label: "电子产品", value: "electronics" },
    { label: "食品", value: "food" },
    { label: "衣物", value: "clothes" },
    { label: "家具", value: "furniture" },
    { label: "化妆品", value: "cosmetics" },
    { label: "运动器材", value: "sports" },
    { label: "乐器", value: "instrument" },
    { label: "其他", value: "other" },
  ];
  form.classLabel =
    options.find((option) => option.value === form.category)?.label || "其他";

  try {
    const response = await axios.post(
      "https://spark-api-open.xf-yun.com/v1/chat/completions",
      {
        model: "4.0Ultra",
        messages: [
          {
            role: "user",
            content: `现在有一件二手商品是${form.name},他的原价是${
              form.price
            },他的折扣是${(form.discount * 100) / 10}折,他的成色是${
              form.condition
            },他的分类是${
              form.classLabel
            },请帮我生成一段商品描述,只给我返回一段文字`,
          },
        ],
      },
      {
        headers: {
          Authorization:
            "Bearer " + "ygeZveEAgsJNMpuONGxs:MSHuBcWaCEjLIdAdGhkZ",
        },
      }
    );

    console.log(response.data.choices[0].message.content);
    res
      .status(200)
      .json({ message: "获取成功", data: response.data.choices[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "内部服务器错误" });
  }
});

app.post("/goods/upload", upload.array("files"), async (req, res) => {
  try {
    // 生成一个随机id
    const goodsId = Math.floor(Math.random() * 1000000) + new Date().getTime();
    const createTime = new Date().getTime();
    const {
      name,
      price,
      discount,
      category,
      condition,
      description,
      uid,
      address,
      lat,
      lng,
    } = req.body;
    const status = 0;
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
    const sql = `INSERT INTO goods (goodsId, name, status, price, discount, category, \`condition\`, description, uid, filesJson, createTime, address, lat, lng) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`; //sql语句 搜索test表所有数据
    const result = await executeQuery(sql, [
      goodsId,
      name,
      status,
      price,
      discount,
      category,
      condition,
      description,
      uid,
      filesJson,
      createTime,
      address,
      lat,
      lng,
    ]);
    // 清空uploads文件
    fs.readdirSync("uploads").forEach((file) => {
      fs.unlinkSync(`uploads/${file}`);
    });
    // 返回成功响应
    res.status(200).json({
      message: "添加成功",
      data: result,
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/goods", async (req, res) => {
  try {
    const sql = `SELECT * FROM goods`; //sql语句 搜索test表所有数据
    const result = await executeQuery(sql);
    res.status(200).json({
      message: "获取成功",
      data: result,
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/goods/delete", async (req, res) => {
  try {
    const { ids } = req.body;
    // 遍历ids进行删除
    for (const id of ids) {
      if (id) {
        const sql = `DELETE FROM goods WHERE goodsId = ?`;
        const result = await executeQuery(sql, [id]); //执行sql语句
      }
    }
    res.status(200).json({ message: "删除成功", data: { status: "success" } });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/goods/put", async (req, res) => {
  try {
    const { ids } = req.body;
    // 遍历ids进行删除
    for (const id of ids) {
      if (id) {
        // 将status 变为1
        const sql = `UPDATE goods SET status = 1 WHERE goodsId = ?`;
        const result = await executeQuery(sql, [id]); //执行sql语句
      }
    }
    res.status(200).json({ message: "上架成功", data: { status: "success" } });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

// 下架
app.post("/goods/down", async (req, res) => {
  try {
    const { ids } = req.body;
    // 遍历ids进行删除
    for (const id of ids) {
      if (id) {
        // 将status 变为1
        const sql = `UPDATE goods SET status = 2 WHERE goodsId = ?`;
        const result = await executeQuery(sql, [id]); //执行sql语句
      }
    }
    res.status(200).json({ message: "下架成功", data: { status: "success" } });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

// 修改商品名称
app.post("/goods/updateGoods", upload.array("files"), async (req, res) => {
  try {
    // 生成一个随机id
    const {
      address,
      category,
      condition,
      createTime,
      description,
      discount,
      goodsId,
      lat,
      lng,
      name,
      oldImg,
      price,
      status,
      uid,
    } = req.body;
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
    const oldFile = JSON.parse(oldImg);
    const files = [...oldFile, ...newFile];
    const filesJson2 = JSON.stringify(files);
    const sql = `UPDATE goods SET  name = ?, status = ?, price = ?, discount = ?, category = ?, \`condition\` = ?, description = ?, uid = ?, filesJson = ?, createTime = ?, address = ?, lat = ?, lng=? WHERE goodsId = ?`; //sql语句 搜索test表所有数据
    const result = await executeQuery(sql, [
      name,
      status,
      price,
      discount,
      category,
      condition,
      description,
      uid,
      filesJson2,
      createTime,
      address,
      lat,
      lng,
      goodsId,
    ]);
    // 清空uploads文件
    fs.readdirSync("uploads").forEach((file) => {
      fs.unlinkSync(`uploads/${file}`);
    });

    // 返回成功响应
    res.status(200).json({
      message: "修改成功",
      data: result,
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

// 商品详情
app.post("/goods/detail", async (req, res) => {
  try {
    const { goodsId } = req.body;
    const sql = `SELECT * FROM goods WHERE goodsId = ?`; //sql语句 搜索test表所有数据
    const result = await executeQuery(sql, [goodsId]);
    res.status(200).json({
      message: "查询成功",
      data: result[0],
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

// 购买
app.post("/goods/buy", async (req, res) => {
  const overId = Math.floor(Math.random() * 1000000) + new Date().getTime();
  console.log(req.body);
  const { goodsId, time, uid, form, change, shopId } = req.body;

  // 获取当前时间戳
  const createTime = new Date().getTime();
  // 如果 `time` 参数为空，处理为当前时间
  const orderTime = time ? new Date(time).getTime() : createTime;
  console.log(createTime);

  const status = 0; // 购买状态
  // 如果 change 为真，保存表单数据，否则为空字符串
  const orderAddress = change ? JSON.stringify(form) : "";

  try {
    const sql1 = `UPDATE goods SET status = 3 WHERE goodsId = ?`;
    const result1 = await executeQuery(sql1, [goodsId]); // 使用 sql1 来执行更新
    // 插入订单记录
    const sql =
      "INSERT INTO `over` (createTime, orderTime, orderAddress, status, userId, goodsId, shopId, overId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const result = await executeQuery(sql, [
      createTime,
      orderTime,
      orderAddress,
      status,
      uid,
      goodsId,
      shopId,
      overId,
    ]);

    res.status(200).json({
      message: "购买成功",
      data: result,
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

// 获取我买到的
app.post("/goods/buyed", async (req, res) => {
  try {
    const { uid } = req.body;
    const sql = "SELECT * FROM `over` WHERE userId = ?"; //sql语句 搜索test表所有数据
    const result = await executeQuery(sql, [uid]);
    // 通过查到的goodsId获取商品信息
    for (let i = 0; i < result.length; i++) {
      const goodsId = result[i].goodsId;
      const sql2 = "SELECT * FROM `goods` WHERE goodsId = ?"; //sql语句 搜索test表所有数据
      const result2 = await executeQuery(sql2, [goodsId]);
      result[i].goods = result2[0];
    }
    res.status(200).json({
      message: "查询成功",
      data: result,
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});
// 获取我卖出的
app.post("/goods/sold", async (req, res) => {
  try {
    const { uid } = req.body;
    const sql = "SELECT * FROM `over` WHERE shopId = ?"; //sql语句 搜索test表所有数据
    const result = await executeQuery(sql, [uid]);
    // 通过查到的goodsId获取商品信息
    for (let i = 0; i < result.length; i++) {
      const goodsId = result[i].goodsId;
      const sql2 = "SELECT * FROM `goods` WHERE goodsId = ?"; //sql语句 搜索test表所有数据
      const result2 = await executeQuery(sql2, [goodsId]);
      result[i].goods = result2[0];
    }
    res.status(200).json({
      message: "查询成功",
      data: result,
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});
// 成交
// 逻辑：将产品状态设置为4，订单状态设置为1
app.post("/goods/over", async (req, res) => {
  try {
    const { goodsId, overId } = req.body;
    const sql1 = `UPDATE goods SET status = 4 WHERE goodsId = ?`;
    const result1 = await executeQuery(sql1, [goodsId]); // 使用 sql1 来执行更新
    const sql2 = 'UPDATE `over` SET status = 1 WHERE overId = ?';
    const result2 = await executeQuery(sql2, [overId]); // 使用 sql1 来执行更新
    res.status(200).json({
      message: "成交成功",
      data: result2,
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});
// 拒绝
// 将产品设置为1，订单状态设置为2
app.post("/goods/refuse", async (req, res) => {
  try {
    const { goodsId, overId } = req.body;
    const sql1 = `UPDATE goods SET status = 1 WHERE goodsId = ?`;
    const result1 = await executeQuery(sql1, [goodsId]); // 使用 sql1 来执行更新
    const sql2 = 'UPDATE `over` SET status = 2 WHERE overId = ?';
    const result2 = await executeQuery(sql2, [overId]); // 使用 sql1 来执行更新
    res.status(200).json({
      message: "成交成功",
      data: result2,
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

// 完成订单
// 产品设置为4，订单状态为3
app.post("/goods/finish", async (req, res) => {
  try {
    const { goodsId, overId } = req.body;
    const sql2 = 'UPDATE `over` SET status = 3 WHERE overId = ?';
    const result2 = await executeQuery(sql2, [overId]); // 使用 sql1 来执行更新
    res.status(200).json({
      message: "成交成功",
      data: result2,
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen("3000", () => {
  console.log(`node服务已启动 端口号是：3000`);
});
