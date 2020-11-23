const sql = require('../config/db.connect')

function get(tableName, result) {
  console.log('Im in the model!')
  sql.query(`select * from ${tableName}`, (err, res) => {
    if (err) {
      console.log('error: ', err)
      return
    }
    if (res.length) {
      const data = res.map((res) => {
        return Object.assign({}, res)
      })
      console.log(`Found ${tableName}: `, data)
      result(null, res)
    }
  })
}

function updateById(tableName, id, data, result) {
  sql.query(
    `UPDATE ${tableName} SET ? WHERE id = ?`,
    [data, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(err, null)
        return
      }

      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: 'not_found' }, null)
        return
      }

      console.log('updated row: ', data)
      result(null, data)
    }
  )
}

function deleteById(tableName, id, result) {
  sql.query(`delete from ${tableName} where id=${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    if (res.affectedRows == 0) {
      // not found Customer with the id
      result({ kind: 'not_found' }, null)
      return
    }
    const data = Object.assign({}, res[0])
    console.log('deleted row with id: ', id)
    result(null, data)
  })
}

function getById(tableName, id, result) {
  sql.query(`select * from ${tableName} where id=${id}`, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }

    if (res.length) {
      const data = Object.assign({}, res[0])
      console.log(`Found data `, data)
      result(null, data)
    }
  })
}

function create(tableName, data, result) {
  sql.query(`insert into ${tableName} set?`, data, (err, res) => {
    if (err) {
      console.log('error: ', err)
      result(err, null)
      return
    }
    if (res) {
      result(null, data)
    }
  })
}

module.exports = {
  get,
  getById,
  create,
  deleteById,
  updateById,
}
