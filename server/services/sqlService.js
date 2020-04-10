

module.exports = async (logger, nodeServices) => {
    const { sql } = nodeServices

    const config = {
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        server: process.env.SQL_SERVER,
        database: 'FaceLook',
        port: 1433
    }

    try {
        let pool = await sql.connect(config)
        function getOne(query, callback) {
            queryOne(query, callback)
        }

        function getMany(query, callback) {
            queryMany(query, callback)
        }

        function add(query, callback) {
            queryChangeSuccess(query, callback)
        }

        function update(query, callback) {
            queryChangeSuccess(query, callback)
        }

        function remove(query, callback) {
            queryChangeSuccess(query, callback)
        }

        function queryOne(query, callback) {
            pool.request().query(query,
                (err, res) => {
                    if (err) {
                        logError(logger, query, err, "queryOne")
                        return callback(undefined)
                    }
                    else {
                        callback(res.recordset[0])
                        LogInfo(logger, query, "queryOne");
                    }
                })
        }

        function queryMany(query, callback) {
            pool.request().query(query,
                (err, res) => {
                    if (err) {
                        logError(logger, query, err, "queryMany")
                        return callback([])
                    }
                    else {
                        callback(res.recordset)
                        LogInfo(logger, query, "queryMany");
                    }
                })
        }

        function queryChangeSuccess(query, callback) {
            pool.request().query(query,
                (err, res) => {
                    if (err) {
                        logError(logger, query, err, "queryChangeSuccess")
                        return callback(false)
                    }
                    else {
                        callback(res.rowsAffected.length > 0)
                        LogInfo(logger, query, "queryChangeSuccess");
                    }
                })
        }
        return {
            remove,
            update,
            add,
            getOne,
            getMany
        }
    } catch (err) {
        logger.error(err, { location: __filename, data: {} });
    }
};


function LogInfo(logger, query, funcName) {
    query = query.replace(/[\r\n|\n|\r]/gm, "")
    logger.info(query, { location: __filename, data: { function: funcName } });
}

function logError(logger, query, error, funcName) {
    query = query.replace(/[\r\n|\n|\r]/gm, "")
    logger.error(`error in SqlService - query ${query} HAS Faild`, { location: __filename, err: error, data: { function: funcName } });
}



