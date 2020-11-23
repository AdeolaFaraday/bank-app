const model = require('../model')

const Account = function (account) {
  this.id = account.id
  this.credit_limit = account.credit_limit
  this.balance = account.balance
  this.branch_id = account.branch_id
}

Account.get = model.get
Account.getById = model.getById
Account.create = model.create
Account.deleteById = model.deleteById
Account.updateById = model.updateById

module.exports = Account
