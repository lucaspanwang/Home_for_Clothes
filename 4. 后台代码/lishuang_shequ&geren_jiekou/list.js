#!/usr/bin/node

const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const read = require('./fs_read')
const mysql = require('mysql'),
      con   = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'ddd',
        database: 'clothes'
      });
con.connect();

var article,review;
const server = http.createServer().listen(8086);

//创建服务
server.on('request',(req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    //读取图片信息
    if(req.url.split('/')[1] === 'images') {
        var photo = req.url.split('/')[2];
        read.readImg('../我的/images/'+photo, res);
    }else if(req.url === "/article"){
        //读取所有文章信息
        let promise1 = new Promise(resolve =>{
            con.query(`select community.*,users.userName,users.userPic from community,users where community.userId=users.userId`, (err, result) => {
                var cimg;
                for(var i=0;i<result.length;i++){
                    cimg = result[i].cimg.split('+');
                    result[i].cimg = cimg;
                }
                resolve(result);
                // console.log("社区读取所有文章信息");
            })
        }).then(value =>{
            res.writeHead(200, {"Content-type":"application/json"});
            article = JSON.stringify(value);
            res.end(article); 
        });
    }else if(req.url === "/review"){
        //读取所有评论信息
        let promise2 = new Promise(resolve =>{
            con.query(`select * from reviewTable`, (err, result) => {
                resolve(result);
                // console.log("读取所有评论信息");
            })
        }).then(value =>{
            res.writeHead(200, {"Content-type":"application/json"});
            review = JSON.stringify(value);
            res.end(review);
        });
    }else if(req.url === "/articleAdd"){
        res.setHeader("Access-Control-Allow-Origin", "*");
        var obj = '';
        var addCimg = '';
        req.on('data',function(data){
            obj += data;
        });
        req.on('end',function(){
            var item = JSON.parse(obj);
            let promise45 = new Promise(resolve =>{
                con.query('select * from community', function(err, result){
                    var num;
                    if(result[0].rev === 0){
                        num=999999;
                    }else{
                        num = JSON.stringify(result[0].articleId).replace(/[^0-9]/ig,"")-1;
                    }
                    resolve('Art'+num);
                })
            }).then(value =>{
                for(var i=0;i<item.cimg.length;i++){
                    var path = '../我的/images/'+value+'-'+i+item.cimgName[i];
                    if(i===0){
                        addCimg += path.slice(5);
                    }else{
                        addCimg += '+'+path.slice(5);
                    }
                    var base64 = item.cimg[i].url.replace(/^data:image\/\w+;base64,/, "");
                    var dataBuffer = new Buffer(base64, 'base64'); 
                    fs.writeFile(path,dataBuffer,function(err){
                        if(err){console.log(err);
                        }else{console.log('写入成功！');}
                    })
                }
                let promise46 = new Promise(resolve =>{
                    con.query('insert into community values(?,?,?,?,?,?,?,?)',[value,item.userId,item.content,item.time,0,0,0,addCimg],(err, result) => {
                        result=[value,item.userId,item.content,item.time,0,0,0,addCimg];
                        console.log("添加文章"+value);
                        console.log(result);
                        resolve(result);
                    });//添加文章
                }).then(value =>{
                    res.writeHead(200, {"Content-type":"application/json"});
                    review = JSON.stringify(value);
                    res.end(review); 
                });
            })
        })
        res.end();
    }else if(req.url === '/articleshanchu'){
        //删除文章
        var id = '';
        req.on('data',function(data){
            id += data;
        });
        req.on('end',function(){
            let promise39 = new Promise(resolve =>{
                con.query('delete from community where articleId=?',[id],(err, result) => {
                    console.log(id);
                    if(err){
                        console.log("shibai");
                    }else{
                        console.log('chenggong');
                    }
                    resolve(result);
                });
            }).then(value =>{
                res.writeHead(200, {"Content-type":"application/json"});
                review = JSON.stringify(value);
                res.end(review); 
            });
        })
    }else if(req.url.split('?')[0] === '/articleDelete'){
        //删除文章
        var it = qs.parse(req.url.split('?')[1]);
        let promise39 = new Promise(resolve =>{
            con.query('delete from community where articleId=?',[it.articleId],(err, result) => {
                resolve(result);
            });
        }).then(value =>{
            res.writeHead(200, {"Content-type":"application/json"});
            article = JSON.stringify(value);
            res.end(article); 
        });
    }else if(req.url.split('=')[0] === '/article?articleId'){
        //读取文章详情页文章信息
        var it = qs.parse(req.url,"?",null,{maxKeys:2});
        let promise3 = new Promise(resolve =>{
            con.query('select community.*,users.userName,users.userPic from community,users where community.userId=users.userId and community.articleId=?',[it.articleId], (err, result) => {
                var cimg;
                for(var i=0;i<result.length;i++){
                    if(result[i].cimg.length !== 0){
                        cimg = result[i].cimg.split('+');
                        result[i].cimg = cimg;
                    }
                }
                resolve(result);
                // console.log("读取文章"+id+"的信息");
            })
        }).then(value =>{
            res.writeHead(200, {"Content-type":"application/json"});
            article = JSON.stringify(value);
            res.end(article); 
        });
    }else if(req.url.split('=')[0] === '/article?userId'){
        //读取某用户的所有文章信息
        var it = qs.parse(req.url,"?",null,{maxKeys:2});
        let promise7 = new Promise(resolve =>{
            con.query('select community.*,users.userName,users.userPic from community,users where community.userId=users.userId and community.userId=?',[it.userId], (err, result) => {
                var cimg;
                for(var i=0;i<result.length;i++){
                    if(result[i].cimg.length !== 0){
                        cimg = result[i].cimg.split('+');
                        result[i].cimg = cimg;
                    }
                }
                resolve(result);
                // console.log("读取文章"+id+"的信息");
            })
        }).then(value =>{
            res.writeHead(200, {"Content-type":"application/json"});
            article = JSON.stringify(value);
            res.end(article); 
        });
    }else if(req.url.split('=')[0] === '/review?articleId'){
        //读取文章详情页评论信息
        var it = qs.parse(req.url,"?",null,{maxKeys:2});
        var id = it.articleId;
        let promise3 = new Promise(resolve =>{
            con.query('select reviewTable.*,users.userName,users.userPic from reviewTable,users where reviewTable.userId=users.userId and reviewTable.articleId=?',[it.articleId], (err, result) => {
                resolve(result);
                // console.log("读取文章"+id+"的所有评论")
            })
        }).then(value =>{
            res.writeHead(200, {"Content-type":"application/json"});
            review = JSON.stringify(value);
            res.end(review); 
        });
    }else if(req.url.split('?')[0] === '/reviewAdd'){
        //添加评论
        var it = qs.parse(req.url.split('?')[1]);
        let promise33 = new Promise(resolve =>{
            con.query('select *,count(reviewId) rev from reviewTable', function(err, result){
                var num;
                if(result[0].rev === 0){
                    num=4999999;
                }else{
                    num = JSON.stringify(result[0].reviewId).replace(/[^0-9]/ig,"")-1;
                }
                con.query('select count(reviewId) review from reviewTable where articleId=?',[it.articleId],function(err, result){
                    resolve(["Re"+num,JSON.parse(JSON.stringify(result))[0].review]);
                });
            })
        }).then(value =>{
            let promise34 = new Promise(resolve =>{
                con.query('update community set review=? where articleId=?', [Number(value[1])+1,it.articleId], function(err, result){
                    // console.log("修改文章"+it.articleId+"的回复数量review");
                });//文章表更新数据
                con.query('insert into reviewTable values(?,?,?,?,?)',[value[0],it.userId,it.articleId,it.reviewContent,it.reviewTime],(err, result) => {
                    result=[value,it.userId,it.articleId,it.reviewContent,it.reviewTime];
                    // console.log("添加文章"+it.articleId+"的回复")
                    resolve(result);
                });//评论表添加数据
            }).then(value =>{
                res.writeHead(200, {"Content-type":"application/json"});
                review = JSON.stringify(value);
                res.end(review); 
            });
        });
    }else if(req.url.split('?')[0] === '/collect'){
        //读取收藏表的信息
        var it = qs.parse(req.url,"?",null,{maxKeys:2});
        var id = it.userId;
        let promise6 = new Promise(resolve =>{
            con.query('select * from saveTable where userId=?',[id], (err, result) => {
                resolve(result);
                // console.log("读取用户"+id+"收藏的文章");
            })
        }).then(value =>{
            res.writeHead(200, {"Content-type":"application/json"});
            article = JSON.stringify(value);
            res.end(article); 
        });
    }else if(req.url.split('?')[0] === '/collectAdd'){
        //收藏文章
        var it = qs.parse(req.url.split('?')[1]);
        // console.log(it);
        let promise35 = new Promise(resolve =>{
            con.query('select count(userId) save from saveTable where articleId=?',[it.articleId],function(err, result){
                resolve(JSON.parse(JSON.stringify(result))[0].save);
                // console.log(JSON.parse(JSON.stringify(result))[0].save);
            });
        }).then(value =>{
            let promise34 = new Promise(resolve =>{
                con.query('update community set save=? where articleId=?', [Number(value)+1,it.articleId], function(err, result){
                    // console.log("修改文章"+it.articleId+"的收藏数量save");
                    // console.log(Number(value)+1);
                });//文章表更新数据
                con.query('insert into saveTable values(?,?)',[it.userId,it.articleId],(err, result) => {
                    result=[it.userId,it.articleId];
                    // console.log("添加文章"+it.articleId+"的收藏")
                    // console.log(result);
                    resolve(result);
                });//收藏表添加数据
            }).then(value =>{
                res.writeHead(200, {"Content-type":"application/json"});
                review = JSON.stringify(value);
                res.end(review); 
            });
        });
    }else if(req.url.split('?')[0] === '/collectDelete'){
        //取消收藏文章
        var it = qs.parse(req.url.split('?')[1]);
        // console.log(it);
        let promise35 = new Promise(resolve =>{
            con.query('select count(userId) save from saveTable where articleId=?',[it.articleId],function(err, result){
                resolve(JSON.parse(JSON.stringify(result))[0].save);
                // console.log(JSON.parse(JSON.stringify(result))[0].save);
            });
        }).then(value =>{
            let promise34 = new Promise(resolve =>{
                con.query('update community set save=? where articleId=?', [Number(value)-1,it.articleId], function(err, result){
                    // console.log("修改文章"+it.articleId+"的收藏数量save");
                    console.log(Number(value)-1);
                });//文章表更新数据
                con.query('delete from saveTable where userId=? and articleId=?',[it.userId,it.articleId],(err, result) => {
                    result=[it.userId,it.articleId];
                    // console.log("删除文章"+it.articleId+"的收藏")
                    // console.log(result);
                    resolve(result);
                });//收藏表删除数据
            }).then(value =>{
                res.writeHead(200, {"Content-type":"application/json"});
                review = JSON.stringify(value);
                res.end(review); 
            });
        });
    }else if(req.url.split('?')[0] === '/agree'){
        //读取点赞表的信息
        var it = qs.parse(req.url,"?",null,{maxKeys:2});
        var id = it.userId;
        let promise6 = new Promise(resolve =>{
            con.query('select * from agreeTable where userId=?',[id], (err, result) => {
                resolve(result);
                // console.log("读取点赞表的信息");
            })
        }).then(value =>{
            res.writeHead(200, {"Content-type":"application/json"});
            article = JSON.stringify(value);
            res.end(article); 
        });
    }else if(req.url.split('?')[0] === '/agreeAdd'){
        //点赞文章
        var it = qs.parse(req.url.split('?')[1]);
        let promise35 = new Promise(resolve =>{
            con.query('select count(userId) agree from agreeTable where articleId=?',[it.articleId],function(err, result){
                resolve(JSON.parse(JSON.stringify(result))[0].agree);
            });
        }).then(value =>{
            let promise34 = new Promise(resolve =>{
                con.query('update community set agree=? where articleId=?', [Number(value)+1,it.articleId], function(err, result){
                    // console.log("修改文章"+it.articleId+"的点赞数量agree");
                });//文章表更新数据
                con.query('insert into agreeTable values(?,?)',[it.userId,it.articleId],(err, result) => {
                    result=[it.userId,it.articleId];
                    // console.log("添加文章"+it.articleId+"的点赞")
                    resolve(result);
                });//点赞表添加数据
            }).then(value =>{
                res.writeHead(200, {"Content-type":"application/json"});
                review = JSON.stringify(value);
                res.end(review); 
            });
        });
    }else if(req.url.split('?')[0] === '/agreeDelete'){
        //取消点赞文章
        var it = qs.parse(req.url.split('?')[1]);
        let promise35 = new Promise(resolve =>{
            con.query('select count(userId) agree from agreeTable where articleId=?',[it.articleId],function(err, result){
                resolve(JSON.parse(JSON.stringify(result))[0].agree);
            });
        }).then(value =>{
            let promise34 = new Promise(resolve =>{
                con.query('update community set agree=? where articleId=?', [Number(value)-1,it.articleId], function(err, result){
                    // console.log("修改文章"+it.articleId+"的点赞数量agree");
                    console.log(Number(value)-1);
                });//文章表更新数据
                con.query('delete from agreeTable where userId=? and articleId=?',[it.userId,it.articleId],(err, result) => {
                    result=[it.userId,it.articleId];
                    // console.log("删除文章"+it.articleId+"的点赞")
                    // console.log(result);
                    resolve(result);
                });//点赞表删除数据
            }).then(value =>{
                res.writeHead(200, {"Content-type":"application/json"});
                review = JSON.stringify(value);
                res.end(review); 
            });
        });
    }else if(req.url.split('?')[0] === '/care'){
        //读取关注表的信息
        var it = qs.parse(req.url,"?",null,{maxKeys:2});
        let promise6 = new Promise(resolve =>{
            if(Object.keys(it)[1] === 'userId'){
                con.query('select * from care where userId=?',[it.userId], (err, result) => {
                    resolve(result);
                    // console.log("读取关注表的信息");
                })
            }else if(Object.keys(it)[1] === 'careId'){
                con.query('select * from care where careId=?',[it.careId], (err, result) => {
                    resolve(result);
                    // console.log("读取被关注的信息")
                })
            }else{
                res.statusCode = 404;
                res.end('404 Error, resource not found!');
            }
        }).then(value =>{
            res.writeHead(200, {"Content-type":"application/json"});
            article = JSON.stringify(value);
            res.end(article); 
        });
    //     var it = qs.parse(req.url,"?",null,{maxKeys:2});
    //     console.log(it);
    //     var id = it.careId;
    //     console.log(id);
    //     let promise79 = new Promise(resolve =>{
    //         con.query('select * from care where careId=?',[id], (err, result) => {
    //             console.log(id);
    //             resolve(result);
    //         })
    //     }).then(value =>{
    //         res.writeHead(200, {"Content-type":"application/json"});
    //         article = JSON.stringify(value);
    //         res.end(article); 
    //     });
    }else if(req.url.split('?')[0] === '/careAdd'){
        //关注其他用户
        var it = qs.parse(req.url.split('?')[1]);
        let promise36 = new Promise(resolve =>{
            con.query('insert into care values(?,?)',[it.userId,it.careId],(err, result) => {
                result=[it.userId,it.careId];
                // console.log("添加用户"+it.userId+"的关注")
                resolve(result);
            });//关注表添加数据
        }).then(value =>{
            res.writeHead(200, {"Content-type":"application/json"});
            review = JSON.stringify(value);
            res.end(review); 
        });
    }else if(req.url.split('?')[0] === '/careDelete'){
        //取消关注
        var it = qs.parse(req.url.split('?')[1]);
        let promise35 = new Promise(resolve =>{
            con.query('delete from care where userId=? and careId=?',[it.userId,it.careId],(err, result) => {
                result=[it.userId,it.careId];
                // console.log("删除用户"+it.userId+"的关注")
                resolve(result);
            });//关注表删除数据
        }).then(value =>{
            res.writeHead(200, {"Content-type":"application/json"});
            review = JSON.stringify(value);
            res.end(review); 
        });
    }else if(req.url.split('=')[0] === '/users?userId'){
        //读取用户个人信息
        var it = qs.parse(req.url,"?",null,{maxKeys:2});
        var id = it.userId;
        let promise4 = new Promise(resolve =>{
            con.query('select * from users where users.userId=?',[id], (err, result) => {
                resolve(result);
                // console.log("读取用户"+id+"的信息");
            })
        }).then(value =>{
            res.writeHead(200, {"Content-type":"application/json"});
            review = JSON.stringify(value);
            res.end(review); 
        });
    }else if(req.url.split('=')[0] === '/detail?userId'){
        //读取用户其他数据详情信息
        var it = qs.parse(req.url,"?",null,{maxKeys:2});
        var id = it.userId;
        var count = [];
        let promise5 = new Promise(resolve =>{
            con.query('select count(articleId) countArt from community where community.userId=?',[id], (err, result) => {
                resolve(JSON.parse(JSON.stringify(result))[0].countArt)
            });//发帖
        }).then(value =>{count.push(value)});
        let promise6 = new Promise(resolve =>{
            con.query('select count(cloId) countClo from clothing where clothing.userId=?',[id], (err, result) => {
                resolve(JSON.parse(JSON.stringify(result))[0].countClo)
            });//衣服
        }).then(value =>{count.push(value)});
        let promise7 = new Promise(resolve =>{
            con.query('select count(careId) countUser from care where care.userId=?',[id], (err, result) => {
                resolve(JSON.parse(JSON.stringify(result))[0].countUser)
            });//关注
        }).then(value =>{count.push(value)});
        let promise8 = new Promise(resolve =>{
            con.query('select count(userId) countCare from care where care.careId=?',[id], (err, result) => {
                resolve(JSON.parse(JSON.stringify(result))[0].countCare)
            });//粉丝
        }).then(value =>{
            count.push(value);
            // console.log("读取用户"+id+"的发帖衣服关注粉丝信息");
            res.writeHead(200, {"Content-type":"application/json"});
            article = JSON.stringify(count);
            res.end(article); 
        });
    }else if(req.url.split('=')[0] === '/clothing?userId'){
        var it = qs.parse(req.url,"?",null,{maxKeys:2});
        var id = it.userId;
        let promise78 = new Promise(resolve=>{
            con.query('select * from clothing where userId=?',[it.userId],(err,result)=>{
                resolve(result);
            })
        }).then(value=>{
            res.writeHead(200, {"Content-type":"application/json"});
            article = JSON.stringify(value);
            res.end(article); 
        })
    }else{
        res.statusCode = 404;
        res.end('404 Error, resource not found!');
    }
});