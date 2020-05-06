var express = require('express');
var router = express.Router();
var mysql=require("mysql");// 链接mySQL数据库,通过第三方数据块
var dbconfig=require("../config/dbconfig.json");// 引入数据库配置连接的基本信息对象
var optfile = require('./fs_read');
const fs = require('fs');
const http = require('http');
var con = mysql.createConnection(dbconfig);// 创建连接
con.connect();//链接

//导入页面根据获取性别来分类
router.get('/insertSex/:id',function(req,res){
  var userid=req.params.id
  con.query(`select userSex from users where userId=${userid}`,function(err,result){
      // console.log(JSON.stringify(result))
      // console.log(result[0].userSex)
      res.json(result[0].userSex)
})
})
// 导入
// router.get('/insert', function (req, res) {
//   console.log('chenggong')
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   var obj = '';
//   req.on("data", function (data) {
//     obj += data;
//     console.log('obj' + obj)
//   })
//   req.on('end', function () {
//     if (JSON.parse(obj).base64[0] != undefined) {
//       var base64 = JSON.parse(obj).base64[0].url.split(',')[1];
//     }

//     var zhonglei1 = '';
//     JSON.parse(obj).zhonglei.forEach(element => {
//       zhonglei1 += element;
//     });
//     var zhonglei = JSON.stringify(zhonglei1);
//     var filesType = JSON.parse(obj).filesType[0];
//     console.log(filesType);
//     console.log(zhonglei)
//     var userid = JSON.stringify(JSON.parse(obj).userid);
//     var data = new Date();
//     var cloId1 = '' + data.getFullYear() + data.getMonth() + data.getDate() + data.getHours() + data.getMinutes() + data.getSeconds();
//     var cloId = JSON.stringify(cloId1);
//     var weizhi = JSON.stringify(JSON.parse(obj).weizhi[0]);
//     var yanse = JSON.stringify(JSON.parse(obj).yanse[0]);
//     var mingzi = JSON.stringify(JSON.parse(obj).mingzi[0]);
//     var cloSmallPic;
//     var cloPic = JSON.stringify('我的/images/' + cloId1 + filesType);
//     console.log(yanse == '"黑色"')
//     if (zhonglei == '"裤子运动裤"') {
//       cloSmallPic = JSON.stringify('我的/images/yundongku.png');
//     } else if (zhonglei == '"裤子牛仔裤"') {
//       cloSmallPic = JSON.stringify('我的/images/kuku.png');
//     } else if (zhonglei == '"裤子短裤"') {
//       cloSmallPic = JSON.stringify('我的/images/duanku1.png');
//     } else if (zhonglei == '"裙子短裙"') {
//       cloSmallPic = JSON.stringify('我的/images/duanqun.png')
//     } else if (zhonglei == '"裙子长裙"') {
//       cloSmallPic = JSON.stringify('我的/images/changqun.png')
//     } else if (zhonglei == '"裙子吊带裙"') {
//       cloSmallPic = JSON.stringify('我的/images/heiqun.png')
//     } else if (zhonglei == '"裙子保守裙"') {
//       if (yanse == '"红色"') {
//         cloSmallPic = JSON.stringify('我的/images/hongqun.png')
//       } else if (yanse == '"黑色"') {
//         cloSmallPic = JSON.stringify('我的/images/qunqun.png"')
//       } else {
//         cloSmallPic = JSON.stringify('我的/images/qun.png')
//       }
//     } else if (zhonglei == '"上衣毛衣"') {
//       cloSmallPic = JSON.stringify('我的/images/maoyi.png')
//     } else if (zhonglei == '"上衣运动衣"') {
//       if (yanse == '"蓝色"') {
//         cloSmallPic = JSON.stringify('我的/images/yundongyi.png')
//       } else if (yanse == '"红色"') {
//         cloSmallPic = JSON.stringify('我的/images/bangqiuyi.png')
//       } else {
//         cloSmallPic = JSON.stringify('我的/images/chenshanyi.png')
//       }
//     } else if (zhonglei == '"上衣卫衣"') {
//       cloSmallPic = JSON.stringify('我的/images/changshangyi.png')
//     } else if (zhonglei == '"外套薄外套"') {
//       cloSmallPic = JSON.stringify('我的/images/chenshantao.png')
//     } else if (zhonglei == '"外套厚外套"') {
//       cloSmallPic = JSON.stringify('我的/images/waitao.png')
//     }

//     con.query(`insert into clothing values(${cloId},${userid},${zhonglei},${weizhi},${yanse},${cloPic},${cloSmallPic},${mingzi})`);

//     var path = '../我的/images/' + cloId1 + filesType;
//     console.log(path);
//     var dataBuffer = new Buffer(base64, 'base64');
//     fs.writeFile(path, dataBuffer, function (err) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log('写入成功');
//       }
//     })
//   })
// })
module.exports = router;
