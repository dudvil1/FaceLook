const User = require("../models/user");
const mongoose = require("mongoose");

async function find(userEmail) {
    console.log("dbManeger: find call()");

    await User.find({ email: userEmail }).exec().then(user => {
        if (user) return user;
        else return null;
    })
        .catch(err => {
            return err;
        });
}

async function verifyAccount(userEmail) {
    console.log("dbManeger: verifyAccount call()");

    await User.find({ email: userEmail }).exec().then(user => {
        if (user) {
            User.update({ email: userEmail }, { $set: { active: true } })
            return true;
        }
    })
        .catch(err => {
            return err;
        });
}

async function addUser(user) {
    console.log("dbManeger: addUser call()");

    const newuser = new User({
        _id: new mongoose.Types.ObjectId(),
        name: user.name,
        email: user.email,
        password: bcrypt.createHashPassword(req.body.password),
        role: "user",
        active: false
    });
    await newuser.save().catch(err => {
        return err;
    });
}

async function changePassword(userEmail, newpassword) {
    console.log("dbManeger: changePassword call()");

    await User.find({ email: userEmail }).exec().then(user => {
        if (user) {
            User.update({ email: userEmail }, { $set: { password: newpassword } })
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
}