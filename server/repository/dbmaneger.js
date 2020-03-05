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
  console.log(post.img);
  
  post.post_id = new mongoose.Types.ObjectId();
  post.date = formatDate(new Date());
  
  
  const query = `INSERT INTO Posts VALUES( '${post.post_id}','${post.user[0]._id}','${post.img}' , '${post.text}' , '${post.date}' ,
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

function getFilterQuery(filters){
  const{fromFilter, ToFilter, publisher, radiusFrom,location, imageTags,userTags} = filters;
  filterQuery = ["Where"];

  if(fromFilter){
    filterQuery.push(`CAST(Posts.date as datetime)>='${fromFilter}'`)
    filterQuery.push(`And `)
  }

  if(ToFilter){
    filterQuery.push(`CAST(Posts.date as datetime)<='${ToFilter}'`)
    filterQuery.push(`And`)
  }

  if(publisher){
    filterQuery.push(`Users.name = '${publisher}'`)
    filterQuery.push(`And`)
  }
  ///by km
  if(radiusFrom && location){
    filterQuery.push(`POWER((
      POWER( ( 53.0 * ( Posts.longitude - ${location.longitude} ) ) , 2 )
       + POWER( ( 69.1 * ( Posts.latitude - ${location.latitude} ) ) , 2 )
      ),0.5)*1.609344  < 1 * ${radiusFrom} `)
      filterQuery.push(`And`)
  }

  if(imageTags){
    //not implamented
  }

  if(userTags){
    filterQuery.push(`Tags.text = '${userTags}'`)
    filterQuery.push(`And`)
  }

  filterQuery.pop();

  return filterQuery.join(" ");
}
function getFilterPosts(filters,callback) {

  console.log("dbmaneger: getFilterPosts call()");
  filterQuery = getFilterQuery(filters);

  const query = `select *
                  from Posts 
                  INNER JOIN Post_Tag on Posts.post_id = Post_Tag.post_id
                  INNER JOIN Tags on Tags.tag_id = Post_Tag.tag_id
                  INNER JOIN Users on Users._id = Posts.publisher_id
                  
                  ${filterQuery}`;

  sql.query(connectionString, query, (err, rows) => {
    if (err) console.log("from addPost_tag", err);
    callback(rows);
  });
}

function getAllPosts(callback) {
  console.log("dbmaneger: getAllPost call()");

  const query = `select *
                  from Posts 
                  --join Post_Tag on Posts.post_id = Post_Tag.post_id
                  --join Tags on Tags.tag_id = Post_Tag.tag_id
                  
                  where CAST(Posts.date as datetime2)>'2018-11-11'`;

  sql.query(connectionString, query, (err, rows) => {
    if (err) console.log("from addPost_tag", err);
    callback(rows);
  });
}

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}

function updateLikes(post, callback) {
  console.log(post.post_id, post.likes);
  console.log(typeof post.post_id, typeof post.likes);
  
  const query = `
    UPDATE Posts
    SET likes = ${post.likes}
    WHERE post_id = '${post.post_id}';
  `;

  sql.query(connectionString, query, (err, res) => {
    if (err) console.log("from updateLikes", err);
    callback(res);
  });
}

module.exports = {
  getFilterPosts,
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
