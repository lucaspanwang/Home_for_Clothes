const mysql = require('mysql');
const http = require('http');
const optfile=require('./fs_read');
con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'ddd',
    database:'clothes'
})
con.connect();
let server=http.createServer();
let user='123';
server.on('request',(req,res)=>{
    if(req.url==='/userid'){
        res.setHeader('Access-Control-Allow-Origin','*');
        req.on("data",function(data){
            console.log('接收：'+data);
            user=JSON.parse(data).userId;
        })
        
    }
    let promise = new Promise(resolve=>{
        con.query(`select*from clothing where cloPlace='行李箱' and userId=${user}`,(err,result)=>{
            resolve(result);
            // console.log(result);
        })
    })
    .then(value=>{
        
            var p=[];
            for(var i=0;i<value.length;i++){
                // console.log(value[i].cloPic)
                if(req.url==='/xinglixiang'+i){
                    optfile.readImg('../'+value[i].cloPic,res);
                }
                p=[...p,'xinglixiang'+i];
            }
            // console.log(p);
            
            if(req.url==='/trunk'){
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.writeHead(200,'ok',{
                    'Content-Type':'text/palin'
                })
                // console.log(JSON.stringify(p));
                res.end(JSON.stringify(p));
                
            }
        })
        
})


server.listen(8089);










