module.exports = (logger,nodeServices) => {
    const { elasticsearch } = nodeServices

    const client = new elasticsearch.Client({
        host: `${process.env.SQL_SERVER_Elastic}:9200`,
        apiVersion: '7.5'
    });

    client.ping({ requestTimeout: 1000 }, (error) => { });
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
    createScript = () => {
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
    add = (query, callback) => {
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
    update = (query, callback) => {
        client.update(query, (err, response) => {
            if (err) {
                callback(undefined)
                return
            }
            callback(response)
        })
    }
    getOne = (query, callback) => {
        client.get(query, (err, response) => {
            if (response)
                callback(response._source)
            else
                callback(undefined)
        });
    }
    getMany = (query, callback) => {
        const queryForMany = {
            ...query,
            size: query.size || 10000
        }
        client.search(queryForMany, (err, response) => {
            if (err) {
            }
            if (response)
                callback(response.hits.hits.map(hit => hit._source))
            else
                callback([])
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


