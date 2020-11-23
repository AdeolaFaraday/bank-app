const model = require('../model')
const sql = require('../../config/db.connect')

const Customer_Accounts = function (data) {
  this.customer_id = data.customer_id
  this.account_id = data.account_id
}

Customer_Accounts.create = model.create
Customer_Accounts.getById = model.getById

Customer_Accounts.findById = (customerId, accountId, result) => {
  sql.query(
    `SELECT * FROM customer_accounts WHERE customer_id = ${customerId} AND account_id=${accountId}`,
    (err, res) => {
      if (err) {
        console.log('error: ', err)
        result(err, null)
        return
      }
      if (res.length) {
        const data = Object.assign({}, res[0])
        console.log('found recording: ', data)
        result(null, data)
        return
      }
    }
  )
}

module.exports = Customer_Accounts
