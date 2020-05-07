module.exports = (logger, nodeServices) => {
    const { elasticsearch } = nodeServices

    const client = new elasticsearch.Client({
        host: `${process.env.SQL_SERVER_Elastic}:9200`,
        apiVersion: '7.5'
    });

    client.ping({ requestTimeout: 1000 }, (error) => {
        error ? logError(logger, error) : logInfo(logger, "connected !!!")
    });
    function validScriptValue(value) {
        return typeof (value) == "string" ? `'${value}'` : value
    }
    function setScript(script, inline) {
        script.inline += inline;
    }
    createScript = () => {
        return {
            script: {
                lang: "painless",
                inline: ""
            },
            pushToArray: function (field, value) {
                setScript(this.script, `ctx._source.${field}.add(${validScriptValue(value)});`)
                return this
            },
            popFromArray: function (field, value) {
                setScript(this.script, `ctx._source.${field}.remove(ctx._source.${field}.indexOf(${validScriptValue(value)}));`)
                return this
            },
            increment: function (field, value) {
                setScript(this.script, `ctx._source.${field} += ${validScriptValue(value)};`)
                return this
            },
            decrement: function (field, value) {
                setScript(this.script, `ctx._source.${field} -= ${validScriptValue(value)};`)
                return this
            }
        }
    }
    add = (query, callback) => {
        client.create(query, (err, response) => {
            if (err) {
                logError(logger, err, "add", query)
                callback(undefined)
            }
            else {
                logInfo(logger, `create Success`, 'add', query)
                callback(response)
            }
        })
    }
    update = (query, callback) => {
        client.update(query, (err, response) => {
            if (err) {
                logError(logger, err, "update", query)
                callback(undefined)
            }
            else {
                logInfo(logger, `update Success`, 'update', query)
                callback(response)
            }
        })
    }
    getOne = (query, callback) => {
        client.get(query, (err, response) => {
            if (err) {
                logError(logger, err, "getOne", query)
                callback(undefined)
            }
            else {
                logInfo(logger, `get one Success`, 'getOne', query)
                callback(response._source)
            }
        });
    }
    getMany = (query, callback) => {
        const queryForMany = {
            ...query,
            size: query.size || 10000
        }
        client.search(queryForMany, (err, response) => {
            if (err) {
                logError(logger, err, "getOne", query)
                callback([])
            }
            else {
                logInfo(logger, `get Many Success`, 'getMany', query)
                callback(response.hits.hits.map(hit => hit._source))
            }
        });
    }

    return {
        getMany,
        getOne,
        update,
        add,
        createScript
    }
}


function logInfo(logger, message, funcName, query) {
    logger.info("ElaticSerachService - " + message, { location: __filename, data: { function: funcName, query } });
}

function logError(logger, error, funcName, query) {
    logger.error(`error in ElaticSerachService - ${error}`, { location: __filename, data: { function: funcName, query } });
}


