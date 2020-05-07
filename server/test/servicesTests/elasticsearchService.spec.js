
const { assert, should, expect, sinon } = require('../baseTest');

const elasticsearchService = require('../../services/elasticsearchService');
const logger = require('../mocks/loggerServiceMock')

describe('elasticsearchService Tests', function () {
    let elasticsearch
    let service

    beforeEach(() => {
        elasticsearch = setElasticsearch()
        service = elasticsearchService(logger, { elasticsearch });
    })

    it('test getMany function() should callback response: array of objects, on SUCCESS', function () {
        const arr = [{ name: 'guy' }, { name: 'dan' }, { name: 'oren' }]
        const elasticResponse = { hits: { hits: arr.map(item => ({ _source: item })) } }

        elasticsearch = setElasticsearch({ search: (query, callback) => callback(undefined, elasticResponse) })
        service = elasticsearchService(logger, { elasticsearch });
        const query = {}
        service.getMany(query, (res) => expect(res).to.eql(arr))
    })
    it('test getMany function() should callback response: empty array, on ERROR', function () {
        elasticsearch = setElasticsearch({ search: (query, callback) => callback(new Error()) })
        service = elasticsearchService(logger, { elasticsearch });
        const query = {}
        service.getMany(query, (res) => expect(res).to.eql([]))
    })

    it('test getOne function() should callback response: object, on SUCCESS', function () {
        const item = { name: 'guy' }
        const elasticResponse = { _source: item }

        elasticsearch = setElasticsearch({ get: (query, callback) => callback(undefined, elasticResponse) })
        service = elasticsearchService(logger, { elasticsearch });
        const query = {}
        service.getOne(query, (res) => expect(res).to.eql(item))
    })
    it('test getOne function() should callback response: undefined, on ERROR', function () {
        elasticsearch = setElasticsearch({ get: (query, callback) => callback(new Error()) })
        service = elasticsearchService(logger, { elasticsearch });
        const query = {}
        service.getOne(query, (res) => expect(res).to.be.undefined)
    })

    it('test update function() should callback response: object, on SUCCESS', function () {
        const elasticResponse = { result: 'updated' }

        elasticsearch = setElasticsearch({ update: (query, callback) => callback(undefined, elasticResponse) })
        service = elasticsearchService(logger, { elasticsearch });
        const query = {}
        service.update(query, (res) => expect(res).to.eql(elasticResponse))
    })
    it('test update function() should callback response: undefined, on ERROR', function () {
        elasticsearch = setElasticsearch({ update: (query, callback) => callback(new Error()) })
        service = elasticsearchService(logger, { elasticsearch });
        const query = {}
        service.update(query, (res) => expect(res).to.be.undefined)
    })

    it('test add function() should callback response: object, on SUCCESS', function () {
        const elasticResponse = { result: 'created' }

        elasticsearch = setElasticsearch({ create: (query, callback) => callback(undefined, elasticResponse) })
        service = elasticsearchService(logger, { elasticsearch });
        const query = {}
        service.add(query, (res) => expect(res).to.eql(elasticResponse))
    })
    it('test add function() should callback response: undefined, on ERROR', function () {
        elasticsearch = setElasticsearch({ create: (query, callback) => callback(new Error()) })
        service = elasticsearchService(logger, { elasticsearch });
        const query = {}
        service.add(query, (res) => expect(res).to.be.undefined)
    })

    it('test createScript function() should have defualt script', function () {
        const defualtScript = { lang: "painless", inline: "" }
        const obj = service.createScript()
        expect(obj.script).to.eql(defualtScript)
    })



    describe('createScript function() test', function () {
        let elasticsearch
        let service
        let scriptBuilder

        beforeEach(() => {
            elasticsearch = setElasticsearch()
            service = elasticsearchService(logger, { elasticsearch });
            scriptBuilder = service.createScript();
        })
        it('test createScript function()- return obj with pushToArray:function()', function () {
            const obj = service.createScript()
            expect(typeof (obj.pushToArray)).to.equal('function')
        })
        it('test createScript function()- return obj with popFromArray:function()', function () {
            const obj = service.createScript()
            expect(typeof (obj.popFromArray)).to.equal('function')
        })
        it('test createScript function()- return obj with increment:function()', function () {
            const obj = service.createScript()
            expect(typeof (obj.increment)).to.equal('function')
        })
        it('test createScript function()- return obj with decrement:function()', function () {
            const obj = service.createScript()
            expect(typeof (obj.decrement)).to.equal('function')
        })

        it('pushToArray:function() - should return the object called him', function () {
            const res = scriptBuilder.pushToArray('f', 'v')
            expect(scriptBuilder).to.equal(res)
        })
        it('popFromArray:function() - should return the object called him', function () {
            const res = scriptBuilder.popFromArray('f', 'v')
            expect(scriptBuilder).to.equal(res)
        })
        it('increment:function() - should return the object called him', function () {
            const res = scriptBuilder.increment('f', 'v')
            expect(scriptBuilder).to.equal(res)
        })
        it('decrement:function() - should return the object called him', function () {
            const res = scriptBuilder.decrement('f', 'v')
            expect(scriptBuilder).to.equal(res)
        })

        it(`test pushToArray function() - should add "ctx._source.field.add('value');" to inline property from script,when value is string`, function () {
            scriptBuilder = service.createScript()
            scriptBuilder.pushToArray('field', 'value');
            expect(scriptBuilder.script.inline).to.equal(`ctx._source.field.add('value');`)
        })
        it(`test pushToArray function() - should add "ctx._source.field.add(1);" to inline property from script,when value is number`, function () {
            scriptBuilder = service.createScript()
            scriptBuilder.pushToArray('field', 1);
            expect(scriptBuilder.script.inline).to.equal(`ctx._source.field.add(1);`)
        })

        it(`test popFromArray function() - should add "ctx._source.field.remove(ctx._source.field.indexOf('value'));" to inline property from script,when value is string`, function () {
            scriptBuilder = service.createScript()
            scriptBuilder.popFromArray('field', 'value');
            expect(scriptBuilder.script.inline).to.equal(`ctx._source.field.remove(ctx._source.field.indexOf('value'));`)
        })
        it(`test popFromArray function() - should add "ctx._source.field.remove(ctx._source.field.indexOf(1));" to inline property from script,when value is number`, function () {
            scriptBuilder = service.createScript()
            scriptBuilder.popFromArray('field', 1);
            expect(scriptBuilder.script.inline).to.equal(`ctx._source.field.remove(ctx._source.field.indexOf(1));`)
        })

        it(`test increment function() - should add "ctx._source.field += 'value';" to inline property from script,when value is string`, function () {
            scriptBuilder = service.createScript()
            scriptBuilder.increment('field', 'value');
            expect(scriptBuilder.script.inline).to.equal(`ctx._source.field += 'value';`)
        })
        it(`test increment function() - should add "ctx._source.field += 1;" to inline property from script,when value is number`, function () {
            scriptBuilder = service.createScript()
            scriptBuilder.increment('field', 1);
            expect(scriptBuilder.script.inline).to.equal(`ctx._source.field += 1;`)
        })

        it(`test decrement function() - should add "ctx._source.field -= 'value';" to inline property from script,when value is string`, function () {
            scriptBuilder = service.createScript()
            scriptBuilder.decrement('field', 'value');
            expect(scriptBuilder.script.inline).to.equal(`ctx._source.field -= 'value';`)
        })
        it(`test decrement function() - should add "ctx._source.field -= 1;" to inline property from script,when value is number`, function () {
            scriptBuilder = service.createScript()
            scriptBuilder.decrement('field', 1);
            expect(scriptBuilder.script.inline).to.equal(`ctx._source.field -= 1;`)
        })
    });
});

function setElasticsearch(clientOverride) {
    err = undefined;
    response = {};
    const cOverride = clientOverride || {}
    const client = {
        ping: (options, callback) => callback(undefined),
        create: (query, callback) => callback(err, response),
        update: (query, callback) => callback(err, response),
        get: (query, callback) => callback(err, response),
        search: (query, callback) => callback(err, response),
        ...cOverride
    }
    return {
        Client: function (config) { return client }
    };
}
