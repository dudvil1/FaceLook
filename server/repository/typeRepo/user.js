const mongoose = require("mongoose");
const bcrypt = require("../../services/bcryptService");
const connectionString = require("../DbConnection");
const sql = require("msnodesqlv8");
const passwordGeneretor = require("../../services/passwordGeneretor");

async function addUser(user, callback) {
  console.log("dbManeger: addUser call()");

  user.password = await bcrypt.createHashPassword(user.password);
  user._id = new mongoose.Types.ObjectId();

  const query = `INSERT INTO Users VALUES( '${user._id}','${user.name}' , '${user.password}' , 'user' , '${user.email}' , '0')`;
  await sql.query(connectionString, query, (err, res) => {
    callback(user);
  });
}
async function verifyAccount(userId, callback) {
  console.log("dbManeger: verifyAccount call()");

  const query = `UPDATE Users
                SET active = '1'
                WHERE _id = '${userId}'`;
  await sql.query(connectionString, query, (err, rows) => {
    if (err) console.log("verifyAccountErr:", err);
    callback("ok");
  });
}
async function changePassword(user, newPassword, callback) {
  console.log("dbManeger: changePassword call()");

  let hash = await bcrypt.createHashPassword(newPassword);
  
  const query = `UPDATE Users
                   SET password = '${hash}' , resetPasswordCode = ''
                   WHERE _id = '${user._id}'`;

  await sql.query(connectionString, query, (err, rows) => {
    if (err) console.log("createHashPasswordErr:", err);
    callback("ok");
  });
}
function getUsers(callback, filter, userId) {
  console.log("dbmaneger: getUsers call()");
  console.log();

  const query = `select * From Users
                 LEFT JOIN user_friends ON user_friends.userId =Users._id
                 
                 where Users._id !='${userId}'
                 ${
                   filter
                     ? `And (Users.name like '%${filter}%' OR Users.email like '%${filter}%')`
                     : ""
                 }`;

  sql.query(connectionString, query, (err, rows) => {
    if (err) {
      //logger
      console.log(err);
    }
    callback(rows);
  });
}
function getUser(userId, callback) {
  console.log("dbmaneger: getUser call()");

  const query = `select * From Users
                   LEFT JOIN user_friends ON user_friends.userId =Users._id
                   
                   where Users._id ='${userId}'`;

  sql.query(connectionString, query, (err, rows) => {
    if (err) {
      console.log(err);
    }
    callback(rows ? rows[0] : rows);
  });
}
async function getResetCodePassword(user, callback) {
  console.log("dbManeger: getResetCodePassword call()");
  user.resetCode = passwordGeneretor.generatePassword();
  user.resetCodeBcrypt = await bcrypt.createHashPassword(user.resetCode);

  console.log("after user", user);

  const query = `UPDATE Users
                   SET password = '' , resetPasswordCode = '${user.resetCodeBcrypt}'
                   WHERE email = '${user.email}'`;
  await sql.query(connectionString, query, (err, res) => {
    if (err) console.log("from getResetCodePassword sql" + err);
    callback(user);
  });
}

module.exports = {
  verifyAccount,
  addUser,
  changePassword,
  getUsers,
  getUser,
  getResetCodePassword
};
