const sql = require('msnodesqlv8');

exports.getOne = (connectionString, query, callback) => {
    queryOne(connectionString, query, callback)
}

exports.getMany = (connectionString, query, callback) => {
    queryMany(connectionString, query, callback)
}

exports.add = (connectionString, query, callback) => {
    queryChangeSuccess(connectionString, query, callback)
}

exports.update = (connectionString, query, callback) => {
    queryChangeSuccess(connectionString, query, callback)
}

exports.delete = (connectionString, query, callback) => {
    queryChangeSuccess(connectionString, query, callback)
}

function queryOne(connectionString, query, callback) {
    try {
        sql.query(connectionString, query, (err, rows) => {
            if (err) {
                console.log(err)
            }
            callback((rows && rows[0] ? rows[0] : undefined));
        });
    } catch (error) {
        console.log(error)
    }
}

function queryMany(connectionString, query, callback) {
    try {
        sql.query(connectionString, query, (err, rows) => {
            if (err) {
                console.log(err)
            }
            callback(rows);
        });
    } catch (error) {
        console.log(error)
    }
}

function queryChangeSuccess(connectionString, query, callback) {
    try {
        sql.query(connectionString, query, (err, rows) => {
            if (err) {
                console.log(err)
            }
            callback(err ? false : true);
        });
    } catch (error) {
        console.log(error)
    }
}


