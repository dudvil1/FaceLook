const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("../services/bcryptService");

async function find(userEmail) {
  console.log("dbManeger: find call()");

  await User.find({ email: userEmail })
    .exec()
    .then(user => {
      if (user) return user;
      else return null;
    })
    .catch(err => {
      return err;
    });
}

async function verifyAccount(userEmail) {
  console.log("dbManeger: verifyAccount call()");

  await User.find({ email: userEmail })
    .exec()
    .then(user => {
      if (user) {
        User.update({ email: userEmail }, { $set: { active: true } });
        return true;
      }
    })
    .catch(err => {
      return err;
    });
}

async function addUser(user) {
  console.log("dbManeger: addUser call()");
  console.log("req user", user);
  let hashPassword = await bcrypt.createHashPassword(user.password);

  const newuser = new User({
    _id: new mongoose.Types.ObjectId(),
    email: user.email,
    name: user.name,
    password: hashPassword,
    role: "user",
    active: false
  });
  await newuser.save().catch(err => {
    return err;
  });

  return newuser;
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
