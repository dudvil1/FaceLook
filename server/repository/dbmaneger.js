const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("../services/bcryptService");
const mailer = require("../services/mailService");
const sql = require("msnodesqlv8");
const connectionString =
  "server=(localdb)\\sqlexpress;Database=FaceLook;Trusted_Connection=Yes;Driver={SQL Server Native Client 11.0}";

async function find(table, key, userKey, callback) {
  console.log("dbManeger: find call()");
  console.log("userkey", userKey);
  const query = `SELECT * FROM ${table} WHERE ${key} = '${userKey}'`;

  await sql.query(connectionString, query, (err, rows) => {
    if (rows == null) rows = [];
    callback(rows);
  });
}

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
                  if (err) console.log("verifyAccountErr:",err);
                  callback("ok");
                });
}

async function changePassword(userEmail, newpassword) {
  console.log("dbManeger: changePassword call()");

  await User.find({ email: userEmail })
    .exec()
    .then(user => {
      if (user) {
        User.update({ email: userEmail }, { $set: { password: newpassword } });
        return true;
      }
    })
    .catch(err => {
      return err;
    });
}

module.exports = {
  find,
  verifyAccount,
  addUser,
  changePassword
};
