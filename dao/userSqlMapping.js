// dao/userSqlMapping.js
// CRUD SQL语句
var user = {
    // insert:'INSERT INTO user(id, name, age) VALUES(0,?,?)',
    // insert:'INSERT user(name, age) VALUES(?,?)',
    // update:'update user set name=?, age=? where id=?',
    // delete: 'delete from user where id=?',
    // queryById: 'select * from info where startPlace=?',
    // queryAll: 'select * from info',
    // search: 'select * from 车次信息表 where startPlace=? and endPlace=? and date=?'
    // updateUser:'update user set name=?,identity=? where user=?',
    // selectLeft:'select leftTickets from info where no=?',
    // insertOrder:'insert 订单表(user,no) values(?,?)',
    // updateLeft:'update info set leftTickets=? where no=?'
    search: 'select * from info where startPlace=? and endPlace=? and date=?',
    selectInfo: 'select * from info where no=?',
    selectDate: 'SELECT date from info where no=?' ,
    selectPassword:'select password from user where user=?',
    insertUser:'insert user(user,password) values(?,?)'
 
};

module.exports = user;