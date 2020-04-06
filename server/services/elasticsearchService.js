const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: `${process.env.SQL_SERVER_Elastic}:9200`,
    apiVersion: '7.5'
});

client.ping({
    requestTimeout: 1000
}, function (error) {
    if (error) {
        console.trace('elasticsearch cluster is down!');
        console.log(error);
    } else {
        console.log('All is well');
    }
});
function validScriptValue(value) {
    return typeof (value) == "string" ? `'${value}'` : value
}

function setScript(script, inline) {
    script.inline += inline;
}
function setScriptWithParams(script, inline, value) {
    script.inline += inline;
    script.params = {
        ...script.params,
        ...value
    };
}
function getObjKeys(obj) {
    if (typeof (obj) != "string" && Object.keys(obj).length > 0)
        return { keys: Object.keys(obj) }
    return {}
}
exports.createScript = () => {
    return {
        script: {
            lang: "painless",
            inline: "",
            params: {

            }
        },
        scriptAppendArray: function (field, value) {
            const { keys } = getObjKeys(value)
            if (keys) {
                setScriptWithParams(this.script, `ctx._source.${field}.add(params.${keys[0]});`, value);
            }
            else {
                setScript(this.script, `ctx._source.${field}.add(${validScriptValue(value)});`)
            }
            return this
        },
        scriptRemove: function (field, value) {
            const { keys } = getObjKeys(value)
            if (keys) {
                setScriptWithParams(this.script, `ctx._source.${field}.remove(ctx._source.${field}.indexOf(params.${keys[0]}));`, value);
            }
            else {
                setScript(this.script, `ctx._source.${field}.remove(ctx._source.${field}.indexOf(${validScriptValue(value)}));`)
            }
            return this
        },
        scriptIncrement: function (field, value) {
            const { keys } = getObjKeys(value)
            if (keys) {
                setScriptWithParams(this.script, `ctx._source.${field} += params.${keys[0]};`, value);
            }
            else {
                setScript(this.script, `ctx._source.${field} += ${validScriptValue(value)};`)
            }
            return this
        },
        scriptDecrement: function (field, value) {
            const { keys } = getObjKeys(value)
            if (keys) {
                setScriptWithParams(this.script, `ctx._source.${field} -= params.${keys[0]};`, value);
            }
            else {
                setScript(this.script, `ctx._source.${field} -= ${validScriptValue(value)};`)
            }
            return this
        }

    }
}

exports.add = (query, callback) => {
    client.create(query, (err, response) => {
        if (err) {
            callback(undefined)
            return
        }
        if (response.result == 'created') {
            callback(response.result == 'created')
        }
    })
}

exports.update = (query, callback) => {
    client.update(query, (err, response) => {
        if (err) {
            callback(undefined)
            return
        }
        callback(response)
    })
}

exports.getOne = (query, callback) => {
    client.get(query, (err, response) => {
        if (response)
            callback(response._source)
        else
            callback(undefined)
    });
}

exports.getMany = (query, callback) => {
    const queryForMany = {
        ...query,
        size: query.size || 10000
    }
    client.search(queryForMany, (err, response) => {
        if (err) {
            console.log(err)
        }
        if (response)
            callback(response.hits.hits.map(hit => hit._source))
        else
            callback([])
    });
}

