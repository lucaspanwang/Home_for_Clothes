#!/usr/bin/node

//暂时不用了，运行register.js去

const http = require('http');

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

let promise = new Promise(userNum = function(resolve){
    //查询数据库数据获得用户信息
    con.query(`select * from users`, (err, result) => {
        var userNum = result.length;
        var userDB = [];
        for(var i=0;i<userNum;i++){
            userDB.push(result[i]);
        }
        resolve(userDB);
    })
})
    .then(value =>{
            //创建服务
            server.on('request',(req,res)=>{
                if(req.url==='/login'){
                    res.setHeader("Access-Control-Allow-Origin", "*"); 
                    res.setHeader('Content-Type', 'application/json;charset=utf-8');
                    res.end(JSON.stringify(value));   
                }
                if(req.url==='/register'){
                    // res.writeHead(200, {"Content-type":"application/json","Access-Control-Allow-Origin":"*"});
                    res.setHeader("Access-Control-Allow-Origin", "*"); 
                    var IdDB = [];
                    var newId = 20190002;
                    var userNum = value.length;
                    for(var i=0;i<userNum;i++){
                        var tempId = value[i].userId;
                        tempId = parseInt(tempId);
                        IdDB.push(tempId);
                    }
                    for(var i=0;i<userNum;i++){
                        if(IdDB[i]>=newId)
                            newId = IdDB[i]+1;
                    }
                    req.on('data',function(data){
                       
                        console.log('接收：'+data);
                        // var data = req;
                        console.log(JSON.parse(data));
                        userPho=JSON.parse(data).userPho.replace(/\s*/g,'');
                        userPwd=JSON.parse(data).userPwd;
                        userName=JSON.parse(data).userName;
                        userSex=JSON.parse(data).userSex;
                        userCity=JSON.parse(data).userCity;
                        console.log(userPho);
                        console.log(userPwd);
                        console.log(userName);
                        console.log(userSex);
                        console.log(userCity);
            
                        //将接收到的数据发送到数据库
                        let promise34 = new Promise(resolve =>{
                            con.query('insert into users values(?,?,?,?,?,?,?,?)',[newId.toString(),userPwd,userName,'我的/images/123/jpg',userSex,userPho,'这个人很饿，把内容吃掉了', userCity],(err, result) => {
                                result=[newId.toString(),userPwd,userName,'我的/images/123/jpg',userSex,userPho,'这个人很饿，把内容吃掉了', userCity];
                                resolve(newId.toString());
                            });
                        }).then(value =>{
                            
                            // review = JSON.stringify(value);
                            // res.end(review); 
                            //将userId发送回前端注册页面
                            console.log('id'+value)
                            res.end(JSON.stringify(value));
                        });
            
                    })

                }
            })
    })

    server.listen(8082);