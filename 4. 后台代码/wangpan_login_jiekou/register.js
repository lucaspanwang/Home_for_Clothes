#!/usr/bin/node

const http = require('http');
const fs = require('fs');

//连接数据库
const mysql = require('mysql'),
      con   = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'ddd',
        database: 'clothes'
      });
con.connect();
let server = http.createServer();

// let promise = new Promise(userNum = function(resolve){
//     //查询数据库数据获得用户信息
//     con.query(`select * from users`, (err, result) => {
//         var userNum = result.length;
//         var userDB = [];
//         for(var i=0;i<userNum;i++){
//             userDB.push(result[i]);
//         }
//         resolve(userDB);
//     })
// })
//     .then(value =>{
            //创建服务
            server.on('request',(req,res)=>{         
                if(req.url==='/register'){
                    new Promise(userNum = function(resolve){
                        //查询数据库数据获得用户信息
                        con.query(`select * from users`, (err, result) => {
                            var userNum = result.length;
                            var userDB = [];
                            for(var i=0;i<userNum;i++){
                                userDB.push(result[i]);
                            }
                            resolve(userDB);
                        })
                    }).then(value=>{
                        res.setHeader("Access-Control-Allow-Origin", "*");
                        var obj = '';
                        var IdDB = [];
                        var newId = 20190002;
                        var userNum = value.length;
                        // console.log('length:'+value.length)
                        for(var i=0;i<userNum;i++){
                            var tempId = value[i].userId;
                            tempId = parseInt(tempId);
                            IdDB.push(tempId);
                        }
                        // console.log(IdDB);//旧
                        for(var i=0;i<userNum;i++){
                            if(IdDB[i]>=newId)
                                newId = IdDB[i]+1;
                        }
                        IdDB.push(newId);
                        // console.log(newId);
                        req.on('data',function(data){
                            obj += data;//data就是传过来的数据
                        });                
                        
                        req.on('end',function(){
                            var item = JSON.parse(obj); 
                            userPho=item.userPho.replace(/\s*/g,'');
                            userPwd=item.userPwd;
                            userName=item.userName;
                            userSex=item.userSex;
                            userCity=item.userCity;
                            path= '../我的/images/'+newId+'.'+item.picData.split('/')[1].split(';')[0];
                            userPic = '我的/images/'+newId+'.'+item.picData.split('/')[1].split(';')[0];
                            
                            //设置图片
                            var base64 = item.picData.replace(/^data:image\/\w+;base64,/, "");
                            var dataBuffer = new Buffer(base64, 'base64'); 
                            fs.writeFile(path,dataBuffer,function(err){
                                if(err){console.log(err);
                                }else{console.log('写入成功！');}
                            });        

                            console.log(userPho);
                            console.log(userPwd);
                            console.log(userName);
                            console.log(userSex);
                            console.log(userCity);
                
                            //将接收到的数据发送到数据库
                            let promise34 = new Promise(resolve =>{
                                con.query('insert into users values(?,?,?,?,?,?,?,?)',[newId.toString(),userPwd,userName, userPic,userSex,userPho,'这个人很饿，把内容吃掉了', userCity],(err, result) => {
                                    result=[newId.toString(),userPwd,userName, userPic,userSex,userPho,'这个人很饿，把内容吃掉了', userCity];
                                    resolve(result);
                                });
                            }).then(value =>{
                                //将userId发送回前端注册页面
                                console.log('id'+value)
                                res.end(JSON.stringify(value));
                            });
                
                        })
                    })

                }

                if(req.url==='/login'){
                    new Promise(userNum = function(resolve){
                        //查询数据库数据获得用户信息
                        con.query(`select * from users`, (err, result) => {
                            var userNum = result.length;
                            var userDB = [];
                            for(var i=0;i<userNum;i++){
                                userDB.push(result[i]);
                            }
                            resolve(userDB);
                        })
                    }).then(value =>{
                        res.setHeader("Access-Control-Allow-Origin", "*"); 
                        res.setHeader('Content-Type', 'application/json;charset=utf-8');
                        res.end(JSON.stringify(value));
                    });
   
                }
            // })
    })

    server.listen(8082);