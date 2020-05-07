
const { assert, should, expect, sinon } = require('../baseTest');
const sqlService = require('../../services/sqlService');
const logger = require('../mocks/loggerServiceMock')

describe('sqlService Tests', function () {
  let sql
  let service

  beforeEach(async () => {
    sql = setMssqlService()
    service = await sqlService(logger, { sql });
  })

  it('test remove function() return true on success', async function () {
    sql = setMssqlService(undefined, { rowsAffected: [{}] })
    service = await sqlService(logger, { sql });
    service.remove("DELETE FROM table_name WHERE condition;", (res) => expect(res).to.equal(true))
  })
  it('test remove function() return false on error', async function () {
    sql = setMssqlService(new Error(), undefined)
    service = await sqlService(logger, { sql });
    service.remove("DELETE FROM not exist WHERE condition;", (res) => expect(res).to.equal(false))
  })
  it('test remove function() return false on rows not Affected', async function () {
    sql = setMssqlService(undefined, { rowsAffected: [] })
    service = await sqlService(logger, { sql });
    service.remove("DELETE FROM not exist WHERE condition;", (res) => expect(res).to.equal(false))
  })

  it('test update function() return true on success', async function () {
    sql = setMssqlService(undefined, { rowsAffected: [{}] })
    service = await sqlService(logger, { sql });
    service.update("UPDATE table_name SET column1 = value1 WHERE find", (res) => expect(res).to.equal(true))
  })
  it('test update function() return false on error', async function () {
    sql = setMssqlService(new Error(), undefined)
    service = await sqlService(logger, { sql });
    service.update("UPDATE table_not_found SET column1 = value1 WHERE find", (res) => expect(res).to.equal(false))
  })
  it('test update function() return false on rows not Affected', async function () {
    sql = setMssqlService(undefined, { rowsAffected: [] })
    service = await sqlService(logger, { sql });
    service.update("UPDATE table_name SET column1 = value1 WHERE not_found", (res) => expect(res).to.equal(false))
  })

  it('test add function() return true on success', async function () {
    sql = setMssqlService(undefined, { rowsAffected: [{}] })
    service = await sqlService(logger, { sql });
    service.add("INSERT INTO table_name (column1) VALUES (value1);", (res) => expect(res).to.equal(true))
  })
  it('test add function() return false on error', async function () {
    sql = setMssqlService(new Error(), undefined)
    service = await sqlService(logger, { sql });
    service.add("INSERT INTO table_not_exist (column1) VALUES (value1);", (res) => expect(res).to.equal(false))
  })
  it('test add function() return false on rows not Affected', async function () {
    sql = setMssqlService(undefined, { rowsAffected: [] })
    service = await sqlService(logger, { sql });
    service.add("INSERT INTO table_not_exist (column_not_exist) VALUES (value1);", (res) => expect(res).to.equal(false))
  })

  it('test getMany function() return array of objects on success', async function () {
    const items = [{}, {}, {}]
    sql = setMssqlService(undefined, { recordset: items })
    service = await sqlService(logger, { sql });
    service.getMany("select * from table", (res) => expect(res).to.eql(items))
  })
  it('test getMany function() return empty array on error', async function () {
    sql = setMssqlService(new Error(), undefined)
    service = await sqlService(logger, { sql });
    service.getMany("select * from not_exist", (res) => expect(res).to.eql([]))
  })

  it('test getOne function() return true on success', async function () {
    const items = [{}]
    sql = setMssqlService(undefined, { recordset: items })
    service = await sqlService(logger, { sql });
    service.getOne("select * from table where find", (res) => expect(res).to.eql(items[0]))
  })
  it('test getOne function() return false on error', async function () {
    sql = setMssqlService(new Error(), undefined)
    service = await sqlService(logger, { sql });
    service.getOne("select * from not_exist where find", (res) => expect(res).to.eql(undefined))
  })


});

function setMssqlService(err, queryRes) {
  let result = queryRes || { recordset: [] }
  return {
    connect: () => ({
      request: () => ({
        query: (query, callback) => {
          callback(err, result)
        }
      })
    })
  };
}
