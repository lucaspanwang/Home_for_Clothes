var express = require('express');
var router = express.Router();
var mysql=require("mysql");// 链接mySQL数据库,通过第三方数据块
var dbconfig=require("../config/dbconfig.json");// 引入数据库配置连接的基本信息对象
var optfile = require('./fs_read');
const fs = require('fs');
const http = require('http');
var con = mysql.createConnection(dbconfig);// 创建连接
con.connect();//链接
//文章月增减明示
router.get('/article/:month',function(req,res){
  var now=req.params.month;
  // console.log(req.params.month)
  con.query(`select* from community where time like '2020/${now}/%'`,function(err,result){
    res.json(result.length);
  })
})
router.get('/article1/:month',function(req,res){
  var now=req.params.month;
  // console.log(req.params.month)
  con.query(`select* from community where time like '2020/${now}/%'`,function(err,result){
    res.json(result.length);
  })
})
// /日记月增减明示
router.get('/diray/:month',function(req,res){
  var now=req.params.month;
  // console.log(req.params.month)
  con.query(`select* from community where diaryTime like '2020-0${now}%'`,function(err,result){
    // console.log('我的日记'+result)
    if(result==undefined){
      res.json('0')
    }else{
      res.json(result.length);
    }
    
  })
})
router.get('/diray1/:month',function(req,res){
  var now=req.params.month;
  // console.log(req.params.month)
  con.query(`select* from diary where diaryTime like '2020-0${now}%'`,function(err,result){
     if(result==undefined){
      res.json('0')
    }else{
      res.json(result.length);
    }
  })
})


//家图片显示
var data;
// router.post('/userid',function(req,res){
//   var user=req.body.userId;
//   var whereId = req.body.whereId;
//   var p=[];
  // console.log('home' + req.body.userId, req.body.whereId);
  // con.query(`select cloPic from clothing where whereId=${whereId} and userId=${user}`, function (err, result) {
  //   // if (result != undefined) {
  //   //   for (var i = 0; i < result.length; i++) {
  //       // console.log(value[i].cloPic)
  //       // router.get('/jia'+i, function (req, res) {
  //       //   res.json('wodi')
  //         // console.log(req.url)
  //         // console.log('图片位置'+result[i].cloPic)
  //         // optfile.readImg('../'+result[i].cloPic,res);
  //         // console.log('我是图片')
  //       // })
  //   //     p = [...p,'jia' + i];
  //   //   }
  //   // } else {
  //   //   p = []
  //   // }
    
  //     // router.get('/jia/:i', function (req, res) {
  //     //   console.log(result[0])
  //     //   // res.end('成功')
  //     // })
    
    
  //   // router.get('/home',function(req,res){
  //   //   res.json(p);
  //   // })
  //   // // console.log(p)
  //   // console.log('result'+result[0].cloPic);
  // })
  // con.query(`select*from cloPic where whereId=${whereId} and userId=${user}`, function (err, result) {
  //   console.log(result);
  // })
  
// })
router.post('/userid',function(req,res,next){
  var user=req.body.userId;
  var whereId = req.body.whereId;
  console.log('新的user'+user,whereId)
  let promise = new Promise(resolve=>{
    con.query(`select*from clothing where whereId=${whereId} and userId=${user}`,(err,result)=>{
        resolve(result);
        console.log('数据库'+result);
    })
})
.then(value=>{
    if(value!=undefined){
        var p=[];
        for(var i=0;i<value.length;i++){
            console.log(value[i].cloPic)
            router.get('/jia'+i,function(req,res){
              console.log('请求成功')
              optfile.readImg('../'+value[i].cloPic,res);
                console.log('我是图片')
            })
                
            p=[...p,'jia'+i];
        }
    }else{
        p=[]
    }

        console.log(p);
        
       
      router.get('/home',function(req,res){
        res.end(JSON.stringify(p));   
      })      
                    
        
})
})


//导入页面---根据获取性别来分类
router.get('/insertSex/:id',function(req,res){
  var userid=req.params.id
  con.query(`select userSex from users where userId=${userid}`,function(err,result){
      // console.log(JSON.stringify(result))
      // console.log(result[0].userSex)
      res.json(result[0].userSex)
})
})
//储物箱--根据名字来跳转家或者各个页面
router.get('/seek/:value',function(req,res){
  var value=JSON.stringify(req.params.value);
  console.log('前端传来得value',value);
  con.query(`select whereId from clothing where cloName=${value}`,function(err,result){
    // console.log(result)
    // console.log(Boolean(result[0]))
      if(!result[0]){
        res.json("不存在")
      }else{
        res.json(result[0].whereId)
      
      console.log('查找得到的',result)
      }
  })
})
//导入页面导入图片
router.post('/insert',function(req,res){
  // console.log('body',req.body);
  //种类
  var zhonglei=JSON.stringify(req.body.zhonglei[0]+req.body.zhonglei[1]);
  // //类型
  var filesType=req.body.filesType[0];
  // // id
  var userid=JSON.stringify(req.body.userid);
  // //位置
  var weizhi=JSON.stringify(req.body.weizhi[0]);
  // //颜色
  var yanse=JSON.stringify(req.body.yanse[0]);
  // //名字
  var mingzi=JSON.stringify(req.body.mingzi);
  console.log(mingzi);
  // //1or2or3
  var whereId=JSON.stringify(req.body.whereId);
  // //性别
  var sex=req.body.sex;
  // // 衣服id
  var data=new Date();
  var cloId1=''+data.getFullYear()+data.getMonth()+data.getDate()+data.getHours()+data.getMinutes()+data.getSeconds();
  var cloId=JSON.stringify(cloId1);
  // //图片base64
  var base64=req.body.base64[0].url.split(',')[1];
  // 大图片地址
  var cloPic=JSON.stringify('我的/images/'+cloId1+filesType);
  //小图片地址
  var cloSmallPic;
  var kind=req.body.zhonglei[0]
  console.log(kind)
  // console.log('我的天涯'+kind)
  console.log(kind=='上衣')
  if (sex == '女') {
    //裤子
    if(kind=='裤子'){
      if(zhonglei=='"裤子背带裤"'){
        cloSmallPic=JSON.stringify('我的/aaa/beidaiku.png');
      }else if (zhonglei == '"裤子运动裤"') {
        cloSmallPic = JSON.stringify('我的/aaa/yundongku.png');
      } else if (zhonglei == '"裤子牛仔裤"') {
        cloSmallPic = JSON.stringify('我的/aaa/niuzaiku.png');
      } else if (zhonglei == '"裤子短裤"') {
        cloSmallPic = JSON.stringify('我的/aaa/duanku.png');
      } else if (zhonglei == '"裤子西装裤"') {
        cloSmallPic = JSON.stringify('我的/aaa/xizhuangku.png');
      } else if (zhonglei == '"裤子直筒裤"') {
        cloSmallPic = JSON.stringify('我的/aaa/zhitongku.png');
      } 
    }
    //裤子结束

    //裙子
    if(kind=='裙子'){
      console.log('我是裙子')
      if(zhonglei == '"裙子短裙"') {
        cloSmallPic = JSON.stringify('我的/aaa/duanqun.png')
      } else if (zhonglei == '"裙子半身长裙"') {
        cloSmallPic = JSON.stringify('我的/aaa/changqun.png')
      } else if (zhonglei == '"裙子吊带裙"') {
        cloSmallPic = JSON.stringify('我的/images/diaodaiqun.png')
      }else if (zhonglei == '"裙子碎花短裙"') {
        cloSmallPic = JSON.stringify('我的/aaa/suihuaduanqun.png')
      }else if (zhonglei == '"裙子职业短裙"') {
        cloSmallPic = JSON.stringify('我的/aaa/zhiyequn.png')
      } else if (zhonglei == '"裙子工作裙"') {
        cloSmallPic = JSON.stringify('我的/aaa/gongzuoqun.png')
      } else if (zhonglei == '"裙子礼服裙"') {
        cloSmallPic = JSON.stringify('我的/aaa/liqun.png')
      } else if (zhonglei == '"裙子碎花长裙"') {
        cloSmallPic = JSON.stringify('我的/aaa/suihuaqun.png')
      } else if (zhonglei == '"裙子休闲裙"') {
        cloSmallPic = JSON.stringify('我的/aaa/xiuxianqun.png')
      }else if (zhonglei == '"裙子运动裙"') {
        cloSmallPic = JSON.stringify('我的/aaa/yundongqun.png')
      } 
    }
    //裙子结束

    //上衣
    if (kind == '上衣') {
      console.log('我是上衣')
      if (zhonglei == '"上衣毛衣"') {
        cloSmallPic = JSON.stringify('我的/aaa/maoyi.png')
      } else if (zhonglei == '"上衣打底衫"') {
        cloSmallPic = JSON.stringify('我的/aaa/dadishan.png')
      } else if (zhonglei == '"上衣卫衣"') {
        cloSmallPic = JSON.stringify('我的/aaa/weiyi.png')
      } else if (zhonglei == '"上衣短袖"') {
        cloSmallPic = JSON.stringify('我的/aaa/duanxiu.png')
      } else if (zhonglei == '"上衣运动衣"') {
        cloSmallPic = JSON.stringify('我的/aaa/yundongyi.png')
      } else if (zhonglei == '"上衣衬衫"') {
        cloSmallPic = JSON.stringify('我的/aaa/chenshan.png')
      } else if (zhonglei == '"上衣格子衫"') {
        cloSmallPic = JSON.stringify('我的/aaa/gezishan.png')
      }

    }
    //上衣结束

    //外套
    if (kind == '外套') {
      // console.log("我是外套")
      if (zhonglei == '"外套运动外套"') {
        cloSmallPic = JSON.stringify('我的/aaa/yundongwaitao.png')
      } else if (zhonglei == '"外套大衣"') {
        cloSmallPic = JSON.stringify('我的/aaa/dayitao.png')
      } else if (zhonglei == '"外套毛线外套"') {
        cloSmallPic = JSON.stringify('我的/aaa/maoxianwaitao.png')
      } else if (zhonglei == '"外套棉服"') {
        cloSmallPic = JSON.stringify('我的/aaa/mianfutao.png')
      }
    }
    //外套结束

    //鞋子
    if(kind=='鞋子'){
      if (zhonglei == '"鞋子板鞋"') {
        cloSmallPic = JSON.stringify('我的/aaa/banxie.png')
      } else if (zhonglei == '"鞋子长靴"') {
        cloSmallPic = JSON.stringify('我的/aaa/changquexie.png')
      } else if (zhonglei == '"鞋子帆布鞋"') {
        cloSmallPic = JSON.stringify('我的/aaa/fanbuxie.png')
      } else if (zhonglei == '"鞋子高跟鞋"') {
        cloSmallPic = JSON.stringify('我的/aaa/gaogenxie.png')
      }else if (zhonglei == '"鞋子厚板鞋"') {
        cloSmallPic = JSON.stringify('我的/aaa/houbanxie.png')
      } else if (zhonglei == '"鞋子凉鞋"') {
        cloSmallPic = JSON.stringify('我的/aaa/liangxie.png')
      } else if (zhonglei == '"鞋子皮鞋"') {
        cloSmallPic = JSON.stringify('我的/aaa/pixie.png')
      }else if (zhonglei == '"鞋子拖鞋"') {
        cloSmallPic = JSON.stringify('我的/aaa/tuoxie.png')
      }else if (zhonglei == '"鞋子运动鞋"') {
        cloSmallPic = JSON.stringify('我的/aaa/yundongxie.png')
      }else if (zhonglei == '"鞋子短靴"') {
        cloSmallPic = JSON.stringify('我的/aaa/duanxuexie.png')
      }
    }
    //鞋子结束
  } 
  //女装分类结束
  else {
    if (zhonglei == '"裤子运动裤"') {
      cloSmallPic = JSON.stringify('我的/images/yundongku_boy.png');
    } else if (zhonglei == '"裤子牛仔裤"') {
      cloSmallPic = JSON.stringify('我的/images/kuku_boy.png');
    } else if (zhonglei == '"外套牛仔外套"') {
      cloSmallPic = JSON.stringify('我的/images/chenshantao_boy.png')
    } else if (zhonglei == '"外套毛呢大衣"') {
      cloSmallPic = JSON.stringify('我的/images/waitao_boy.png')
    } else if (zhonglei == '"外套风衣"') {
      cloSmallPic = JSON.stringify('我的/images/waitao_boy.png')
    } else if (zhonglei == '"外套衬衫"') {
      cloSmallPic = JSON.stringify('我的/images/chenshan_boy.png')
    }else if (zhonglei == '"外套运动外套"') {
      cloSmallPic = JSON.stringify('我的/images/chenshan_boy.png')
    }
  }
  
  console.log('cloSmallPic',cloSmallPic);
  // 插入到数据库
  con.query(`insert into clothing values(${cloId},
  ${userid},${zhonglei},${weizhi},${yanse},
  ${cloPic},${cloSmallPic},${mingzi},${whereId})`,(err,result)=>{
    if(err){
      console.log(err);
    }else{
      console.log('导入成功昂')
     
    }
  })
  // //读取图片到服务端
  var path='../我的/images/'+cloId1+filesType;
  console.log(path);
  var dataBuffer=Buffer.from(base64,'base64');
  fs.writeFile(path,dataBuffer,function(err){
      if(err){
          console.log(err);
      }else{
          console.log('写入成功');
      }
  })
})

//后台管理系统统计注册人数

router.get('/number',function(req,res){
  var time=[];
  con.query('select userTime from users',function(err,result){
    result.forEach(function(res){
      time.push(res.userTime)
    })
    res.json(time)
  })
})
//后台男女比例
router.get('/radius',function(req,res){
  var sex=[];
  con.query('select userSex from users',function(err,result){
    result.forEach(function(res){
      sex.push(res.userSex);
    })
    console.log(sex)
    res.json(sex)
  })
})

module.exports = router;
