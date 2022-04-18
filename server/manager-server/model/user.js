/**
 * User 数据表的mysql语句封装
 */

// const db = require('../config/db')

// const user = {
//     insert(param){
//         var keys = Object.keys(param)
        
//         // console.log(param)
//         var sql = "INSERT INTO `users`("
//         var key = '';
//         var val = '';
//         keys.forEach((item, index)=>{
//             key += '`'+item+'`'
//             // console.log(index, keys.length)
//             if(item == "sex" || item == 'deptId' || item == 'state' || item == 'role' || item == 'roleList'){
//                 val += param[item];
//             }else{
//                 val += "'"+param[item]+"'";
//             }
//             if(index != keys.length-1){
//                 key += ','
//                 val += ','
//             }
//         })
//         sql+=key+')VALUES('+val+')';
//         // console.log(sql);
//         db.query(sql, (error, result)=>{
//             if(error) throw error;
//             console.log("插入成功");
//             return result; 
//         })
//     },
//     delete(param){
//         var keys = Object.keys(param);
//         var sql = "DELETE FROM `users` WHERE ";

//         keys.forEach((item, index)=>{
//             sql += " `"+item+"`=";
//             if(item == "sex" || item == 'deptId' || item == 'state' || item == 'role' || item == 'roleList'){
//                 sql += param[item];
//             }else{
//                 sql += "'"+param[item]+"'";
//             }
//             if(index != keys.length-1){
//                 sql+= " and";
//             }
//         })
//         // console.log(sql)
//         db.query(sql, (error, result)=>{
//             if(error) throw error;
//             // console.log(result);
//             console.log("删除成功")
//             return result;
//         })
//     },
//     select(param){
//         console.log("SELECT=>run");
//         var keys = Object.keys(param);
//         var sql = "SELECT * FROM `users` WHERE ";

//         keys.forEach((item, index)=>{
//             sql += " `"+item+"`=";
//             if(item == "sex" || item == 'deptId' || item == 'state' || item == 'role' || item == 'roleList'){
//                 sql += param[item];
//             }else{
//                 sql += "'"+param[item]+"'";
//             }
//             if(index != keys.length-1){
//                 sql+= " and";
//             }
//         })
//         // console.log(sql)
//         var res;
//         db.query(sql, (error, result)=>{
//             if(error) throw error;
//             // console.log("sql=>",sql)
//             // console.log("model结果=>",result)
//             // console.log("删除成功")
//             return res;
//         })
//         // return res;
//     }
// }

// module.exports = user;


const mongoose = require('mongoose')
const config = require('./index')

mongoose.connect(config.URL)

const db = mongoose.connection()

db.on('error', ()=>{
    console.log('数据库连接失败')
})

db.once('open', ()=>{
    console.log('连接成功');
})