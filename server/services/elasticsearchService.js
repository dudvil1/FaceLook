const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: `${process.env.SQL_SERVER}:9200`,
    apiVersion: '7.5'
});

client.ping({
    requestTimeout: 1000
}, function (error) {
    if (error) {
        console.trace('elasticsearch cluster is down!');
    } else {
        console.log('All is well');
    }
});


exports.add = async (query, callback) => {
    try {
        const isExist = await client.exists(query)
        if (!isExist) {
            client.create(query, (response) => {
                if (response.result == 'created') {
                    console.log(response.result == 'created')
                    callback(response.result == 'created')
                }
            })
        }
        else {
            callback(isExist)
        }
    } catch (error) {
        console.log(error.message)
    }
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

exports.update = async (query, callback) => {
    try {
        client.update(query, (response => {
            callback(response)
        }))
    } catch (error) {
        console.log("error  ", error.message)
        callback(false)
    }
}

exports.getOne = async (query, callback) => {
    try {
        const response = await client.get(query);
        callback(response._source)
    } catch (error) {
        console.log(error.message)
        callback(undefined)
    }
}

exports.getMany = async (query, callback) => {
    try {
        const response = await client.search(query);
        const result = response.hits.hits.map(hit => hit._source)
        callback(result)
    } catch (error) {
        console.log(error)
        callback([])
    }
}

