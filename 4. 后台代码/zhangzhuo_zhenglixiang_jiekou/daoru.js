const mysql = require('mysql');
con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'ddd',
    database:'clothes'
})
con.connect();