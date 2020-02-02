const bcrypt = require("bcryptjs");

async function checkPassword(reqPassword, userPassword) {
  console.log("bycrptService: checkPassword call()");

  await bcrypt.compareSync(reqPassword, userPassword, (err, result) => {
    if (result) return true;
    return false;
  });
}

 async function createHashPassword(password) {
  console.log("bycrptService: createHashPassword call()");

  return await bcrypt.hashSync(password,10 , (err , hash)=>{
    if (err) return false;
    return hash;
  })

  // let a =  bcrypt.hash(password, 10 ,(err, hash) => {
  //   if (err) return false;
  //   console.log(hash);
  //   return hash;
  // });
  return a;
}

module.exports = {
  checkPassword,
  createHashPassword
};
