/**
 * 数据库连接配置
 */

 const mongoose = require('mongoose')
 const config = require('./index')
 
 mongoose.connect(config.URL)
 
 const db = mongoose.connection
 
 db.on('error', ()=>{
     console.log('数据库连接失败')
 })
 
 db.once('open', ()=>{
     console.log('连接成功');
 })


// const mysql = require('mysql');
// const config = require('./index');

// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'Root123_',
//     database: 'vue_manager',
//     dataStrings: true
// });

// db.connect();
 
// db.on('error', (err)=>{
//     console.log("数据库连接失败", err);
// })

// db.on('open', ()=>{
//     console.log("数据库连接成功");
// })

// var sql = "SELECT * FROM `testTable`";

// db.query(sql, (err, res)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(res);
//     }
// })

// module.exports = db;