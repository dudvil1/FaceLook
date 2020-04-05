// const sql = require('msnodesqlv8');

const sql = require('mssql')

const config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    server: process.env.SQL_SERVER,
    database: 'FaceLook',
    port: 1433
}

// function getOne(query, callback) {
//     queryOne(query, callback)
// }

// function getMany(query, callback) {
//     queryMany(query, callback)
// }

// function add(query, callback) {
//     queryChangeSuccess(query, callback)
// }

// function update(query, callback) {
//     queryChangeSuccess(query, callback)
// }

// function remove(query, callback) {
//     queryChangeSuccess(query, callback)
// }

// function queryOne(query, callback) {
//     try {
//         let result1 = pool.request()
//             .query(query)
//         callback(result1.recordset[0])
//     } catch (error) {
//         console.log(error)
//     }
// }

// function queryMany(query, callback) {
//     try {
//         let result1 = pool.request()
//             .query(query)
//         callback(result1.recordset)
//     } catch (error) {
//         console.log(error)
//     }
// }

// function queryChangeSuccess(query, callback) {
//     try {
//         let result1 = pool.request()
//             .query(query)
//         callback(result1.rowsAffected.length > 0)
//     } catch (error) {
//         console.log(error)
//     }
// }
// module.exports = {
//     remove,
//     update,
//     add,
//     getOne,
//     getMany
// }

module.exports = async (logger) => {

    try {
        let pool = await sql.connect(config)
        async function getOne(query, callback) {
            await queryOne(query, callback)
        }

        async function getMany(query, callback) {
            await queryMany(query, callback)
        }

        async function add(query, callback) {
            await queryChangeSuccess(query, callback)
        }

        async function update(query, callback) {
            await queryChangeSuccess(query, callback)
        }

        async function remove(query, callback) {
            await queryChangeSuccess(query, callback)
        }

        async function queryOne(query, callback) {
            try {
                let result1 = await pool.request()
                    .query(query)
                callback(result1.recordset[0])

                logger.info(query, { location: __filename, data: { function: 'queryOne' } });
            } catch (error) {
                console.log(error)
            }
        }

        async function queryMany(query, callback) {
            try {
                let result1 = await pool.request()
                    .query(query)
                callback(result1.recordset)

                logger.info(query, { location: __filename, data: { function: 'queryMany' } });
            } catch (error) {
                console.log(error)
            }
        }

        async function queryChangeSuccess(query, callback) {
            try {
                let result1 = await pool.request()
                    .query(query)

                callback(result1.rowsAffected.length > 0)

                logger.info(query, { location: __filename, data: { function: 'queryChangeSuccess' } });
            } catch (error) {
                console.log(error)
            }
        }
        return {
            remove,
            update,
            add,
            getOne,
            getMany
        }
    } catch (err) {
        logger.error(err, { location: __filename, data: { } });
    }
};


