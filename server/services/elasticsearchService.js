const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: 'localhost:9200',
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
            const response = await client.create(query)
            if (response.result == 'created') {
                console.log(response.result == 'created')
                callback(response.result == 'created')
            }
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
            inline: ""
        },
        scriptAppendArray: function (field, value) {
            this.script.inline += `ctx._source.${field}.add(${value});`
            return this
        },
        scriptRemove: function (field, value) {
            this.script.inline += `ctx._source.${field}.remove(ctx._source.${field}.indexOf(${value}));`
            return this
        },
        scriptIncrement: function (field, value) {
            this.script.inline += `ctx._source.${field} +=${value};`
            return this
        },
        scriptDecrement: function (field, value) {
            this.script.inline += `ctx._source.${field} -=${value};`
            return this
        }
    }
}

exports.update = async (query, callback) => {
    try {
        const response = await client.update(query)
        if (response) {
            console.log(response)
            callback(true)
        }
        else {
            callback(isExist)
        }
    } catch (error) {
        console.log(error.message)
    }
}

exports.getOne = async (query, callback) => {
    try {
        const response = await client.search(query);

        const result = response.hits.hits.map(hit => hit._source)[0]
        if (result)
            callback(result)
        else
            callback(undefined)

    } catch (error) {
        console.log(error.message)
    }
}

exports.getMany = async (query, callback) => {
    try {
        const response = await client.search(query);
        const result = response.hits.hits.map(hit => hit._source)
        console.log(result)
        if (result)
            callback(result)
        else
            callback(undefined)
    } catch (error) {
        console.log(error)
    }
}

