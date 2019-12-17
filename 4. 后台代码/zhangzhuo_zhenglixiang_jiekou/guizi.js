const mysql = require('mysql');
const http = require('http');
const optfile=require('./fs_read');
const random=require('string-random');
const fs=require('fs')
con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'ddd',
    database:'clothes'
})
con.connect();
let server=http.createServer();
let user='123';
var place='家';
var nage;
var userId='123';
server.on('request',(req,res)=>{
    // console.log(req.url);
    if(req.url==='/userid'){
        res.setHeader('Access-Control-Allow-Origin','*');
        req.on("data",function(data){
            console.log('接收：zz'+JSON.parse(data).userId);
            user=JSON.parse(data).userId;
        })
        
    }
    if(req.url==='/delete'){
        res.setHeader('Access-Control-Allow-Origin','*');
        var shanchu='';
        req.on('data',function(data){
            shanchu+=data;
        })
        req.on('end',function(){
            place=JSON.stringify(JSON.parse(shanchu).weizhi);
            console.log(place)
            nage=JSON.parse(shanchu).nage;
            console.log(nage);
            userId=JSON.parse(shanchu).userId;
            console.log(userId);
            let promises = new Promise(resolve=>{
                con.query(`select*from clothing where cloPlace=${place} and userId=${userId}`,(err,result)=>{
                    resolve(result);
                    // console.log(result);
                })
            })
            .then(value=>{
                var cloId=value[nage].cloId;
                console.log(cloId);
                con.query(`delete from clothing where cloId=${cloId}`)
            })
        })
    }
   
    let promise = new Promise(resolve=>{
        con.query(`select*from clothing where cloPlace='柜子' and userId=${user}`,(err,result)=>{
            resolve(result);
            // console.log(result);
        })
    })
    .then(value=>{
            var p=[];
            for(var i=0;i<value.length;i++){
                // console.log(value[i].cloPic)
                if(req.url==='/guizi'+i){
                    optfile.readImg('../'+value[i].cloPic,res);
                }
                p=[...p,'guizi'+i];
            }

            
            if(req.url==='/robe'){
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.writeHead(200,'ok',{
                    'Content-Type':'text/palin'
                })
                // console.log(JSON.stringify(p));
                res.end(JSON.stringify(p));
                
            }
            if(req.url==='/insert'){
                res.setHeader('Access-Control-Allow-Origin','*');
                var obj = '';
                req.on("data",function(data){
                    obj += data;
                    
                })
                req.on('end',function(){
                    if(JSON.parse(obj).base64[0]!=undefined){
                        var base64=JSON.parse(obj).base64[0].url.split(',')[1];
                    }

                    var zhonglei1='';
                    JSON.parse(obj).zhonglei.forEach(element => {
                        zhonglei1+=element;
                    });
                    var zhonglei=JSON.stringify(zhonglei1);
                    var filesType=JSON.parse(obj).filesType[0];
                    console.log(filesType);
                    var userid=JSON.stringify(JSON.parse(obj).userid);
                    var data=new Date();
                    var cloId1=''+data.getFullYear()+data.getMonth()+data.getDate()+data.getHours()+data.getMinutes()+data.getSeconds();
                    var cloId=JSON.stringify(cloId1);
                    var weizhi=JSON.stringify(JSON.parse(obj).weizhi[0]);
                    var yanse = JSON.stringify(JSON.parse(obj).yanse[0]);
                    var cloSmallPic;
                    var cloPic=JSON.stringify('我的/images/'+cloId1+filesType);
                    console.log(yanse=='"黑色"')
                    if(zhonglei=='"裤子运动裤"'){
                        cloSmallPic=JSON.stringify('我的/images/yundongku.png');
                    }else if(zhonglei=='"裤子牛仔裤"'){
                        cloSmallPic=JSON.stringify('我的/images/kuku.png');
                    }else if(zhonglei=='"裤子短裤"'){
                        cloSmallPic=JSON.stringify('我的/images/duanku1.png');
                    }else if(zhonglei=='"裙子短裙"'){
                        cloSmallPic=JSON.stringify('我的/images/duanqun.png')
                    }else if(zhonglei=='"裙子长裙"'){
                        cloSmallPic=JSON.stringify('我的/images/changqun.png')
                    }else if(zhonglei=='"裙子吊带裙"'){
                        cloSmallPic=JSON.stringify('我的/images/heiqun.png')
                    }else if(zhonglei=='"裙子保守裙"'){
                        if(yanse=='"红色"'){
                            cloSmallPic=JSON.stringify('我的/images/hongqun.png')
                        }else if(yanse=='"黑色"'){
                            cloSmallPic=JSON.stringify('我的/images/qunqun.png"')
                        }else{
                            cloSmallPic=JSON.stringify('我的/images/qun.png')
                        }
                    }else if(zhonglei=='"上衣毛衣"'){
                        cloSmallPic=JSON.stringify('我的/images/maoyi.png')
                    }else if(zhonglei=='"上衣运动衣"'){
                        if(yanse=='"蓝色"'){
                            cloSmallPic=JSON.stringify('我的/images/yundongyi.png')
                        }else if(yanse=='"红色"'){
                            cloSmallPic=JSON.stringify('我的/images/bangqiuyi.png')
                        }else{
                            cloSmallPic=JSON.stringify('我的/images/chenshanyi.png')
                        }
                    }else if(zhonglei=='"上衣卫衣"'){
                        cloSmallPic=JSON.stringify('我的/images/changshangyi.png')
                    }else if(zhonglei=='"外套薄外套"'){
                        cloSmallPic=JSON.stringify('我的/images/chenshantao.png')
                    }else if(zhonglei=='"外套厚外套"'){
                        cloSmallPic=JSON.stringify('我的/images/waitao.png')
                    }

                    con.query(`insert into clothing values(${cloId},${userid},${zhonglei},${weizhi},${yanse},${cloPic},${cloSmallPic})`);

                    var path='../我的/images/'+cloId1+filesType;
                    console.log(path);
                    var dataBuffer=new Buffer(base64,'base64');
                    fs.writeFile(path,dataBuffer,function(err){
                        if(err){
                            console.log(err);
                        }else{
                            console.log('写入成功');
                        }
                    })
                })
            }
        })
})

 server.listen(8087);   












