#!/usr/bin/node
const http = require('http');
var optfile = require('./fs_read');
// var formidable = require('formidable');

//连接数据库
const mysql = require('mysql'),
      con   = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'ddd',
        database: 'clothes'
      });
con.connect();

var server = http.createServer().listen(8081);
server.on('request',(req,res)=>{   
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    if(req.url==='/dd'){
        res.setHeader("Access-Control-Allow-Origin", "*");
        var obj="";
        req.on('data',function(data){
            // console.log(data);
            obj+=data;
        })
        req.on('end',function(){
            console.log(JSON.parse(obj));
            console.log(JSON.parse(obj).name)
        })
        res.end();
        // var form = new formidable.IncomingForm();   //创建上传表单
        // form.encoding = 'utf-8';        //设置编辑
        // form.uploadDir = '../我的/images';     //设置上传目录
        // form.keepExtensions = true;     //保留后缀
        // form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小
        // form.parse(req, function(err, fields, files) {
        //     console.log(fields);
        //     if (err) {
        //       res.locals.error = err;
        //       res.render('index', { title: TITLE });
        //       return;
        //     }
        //     console.log(files);
        //     var type = files.pic.type;
        //     console.log(type);
        //     var extName = 'png';  //后缀名
        //     switch (files.pic.type) {
        //       case 'image/pjpeg':
        //         extName = 'jpg';
        //         break;
        //       case 'image/jpeg':
        //         extName = 'jpg';
        //         break;
        //       case 'image/png':
        //         extName = 'png';
        //         break;
        //       case 'image/x-png':
        //         extName = 'png';
        //         break;
        //     }
     
        //     if(extName.length == 0){
        //       res.locals.error = '只支持png和jpg格式图片';
        //       res.render('index', { title: TITLE });
        //       return;
        //     }
        //     //显示地址；
        //     showUrl = files.pic.path;
        //     res.json({
        //       "newPath":showUrl
        //     });
        //   });

    }
    if(req.url === '/diary'){
        let promise = new Promise(resolve =>{
            //查询数据库数据获得用户信息
            con.query(`select * 
                       from diary;`, (err, result) => {
                for(var i=0;i<result.length;i++){
                    dimg = result[i].dimg.split('+');
                    result[i].dimg = dimg;
                }
                resolve(result)
            })
        })
        .then(value =>{
            var data = JSON.stringify(value);   
            res.writeHead(200, {"Content-type":"application/json"});
            res.end(data.toString('utf8'));     
        })
    }
    //获取用户信息
    if(req.url.split('=')[0]==='/users?userId'){
        var userId = req.url.split('=')[1];
        let promise = new Promise(resolve =>{
            //查询数据库数据获得用户信息
            con.query(`select * 
                       from users 
                       where userId = ${userId};`, (err, result) => {
                resolve(result)
            })
        })
        .then(value =>{
            var data = JSON.stringify(value);   
            res.writeHead(200, {"Content-type":"application/json"});
            res.end(data.toString('utf8'));     
        })
    }
    //获取日记数据
    if(req.url.split('=')[0]==='/diary?userId'){
        var userId = req.url.split('=')[1];
        let promise = new Promise(resolve =>{
            //查询数据库数据获得日记信息
            con.query(`select diary.diaryId,diary.diaryContent,diary.dimg,diary.diaryTime,users.userPic 
                       from diary,users 
                       where diary.userId = users.userId and diary.userId = ${userId};`, (err, result) => {
                for(var i=0;i<result.length;i++){
                    dimg = result[i].dimg.split('+');
                    result[i].dimg = dimg;
                }
                //console.log(result);
                resolve(result)
            })
        })
        .then(value =>{
            var data = JSON.stringify(value);   
            res.writeHead(200, {"Content-type":"application/json"});
            res.end(data.toString('utf8'));     
        })
    }
    //获取图片
    if(req.url.split('/')[1] === 'images') {
        var photo = req.url.split('/')[2];
        optfile.readImg('../我的/images/'+photo, res);
        console.log("主程序结束");
    }
    
});


