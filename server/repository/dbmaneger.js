const mongoose = require("mongoose");
const bcrypt = require("../services/bcryptService");
const moment = require("moment");
const connectionString = require("./DbConnection");
const sql = require("msnodesqlv8");

async function find(table, key, userKey, callback) {
  console.log("dbManeger: find call()");

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
    if (err) console.log("verifyAccountErr:", err);
    callback("ok");
  });
}

async function changePassword(userEmail, newpassword) {
  console.log("dbManeger: changePassword call()");

  await User.find({
    email: userEmail
  })
    .exec()
    .then(user => {
      if (user) {
        User.update(
          {
            email: userEmail
          },
          {
            $set: {
              password: newpassword
            }
          }
        );
        return true;
      }
    })
    .catch(err => {
      return err;
    });
}

async function addPost(post, callback) {
  console.log("dbManeger: addPost call()");

  post.post_id = new mongoose.Types.ObjectId();
  post.image = "";
  post.date = moment()
    .unix()
    .toString();
  
    console.log(post);
  const query = `INSERT INTO Posts VALUES( '${post.post_id}','${post.user[0]._id}','${post.imageUrl}' , '${post.text}' , '${post.date}' ,
   '${post.locationLocationLat}' , '${post.locationLocationLng}' , '${post.title}' , '0')`;

  await sql.query(connectionString, query, (err, res) => {
    if (err) console.log("from addPost", err);
    callback(post);
  });
}

async function addTag(tag, callback) {
  console.log("dbManeger: addTag call()");

  find("Tags", "Text", tag.tag, result => {
    if (result.length < 1) {
      tag.tag_id = new mongoose.Types.ObjectId();
      const query = `INSERT INTO Tags
                     VALUES( '${tag.tag_id}', '${tag.tags}')`;
      sql.query(connectionString, query, (err, res) => {
        if (err) console.log("from addtag", err);
        callback(tag);
      });
    } else callback({});
  });
}

async function addPost_Tag(post_tag, callback) {
  console.log("dbManeger: Post_Tag call()");

  const query = `INSERT INTO Post_Tag VALUES( '${post_tag.post_id}', '${post_tag.tag_id}')`;
  await sql.query(connectionString, query, (err, res) => {
    if (err) console.log("from addPost_tag", err);
    callback(post_tag);
  });
}

function getAllPosts(callback) {
  console.log("dbmaneger: getAllPost call()");

  const query = `select *
                  from Posts 
                  --join Post_Tag on Posts.post_id = Post_Tag.post_id
                  --join Tags on Tags.tag_id = Post_Tag.tag_id `;

  sql.query(connectionString, query, (err, rows) => {
    if (err) console.log("from addPost_tag", err);
    callback(rows);
  });
}

function updateLikes(post, callback) {
  const query = `
    UPDATE Posts
    SET likes = ${post.likes}
    WHERE post_id = ${post.id}
  `;

  sql.query(connectionString, query, (err, res) => {
    if (err) console.log("from updateLikes", err);
    callback(res);
  });
}

module.exports = {
  find,
  verifyAccount,
  addUser,
  changePassword,
  addPost,
  addTag,
  addPost_Tag,
  getAllPosts,
  updateLikes
};
