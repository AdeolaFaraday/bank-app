const model = require('../model')

const Transaction = function (transaction) {
  ;(this.completed_at = transaction.completed_at),
    (this.sender_id = transaction.sender_id),
    (this.amount = transaction.amount),
    (this.sender_account = transaction.sender_account),
    (this.to_account = transaction.to_account),
    (this.transaction_type = transaction.transaction_type)
}

Transaction.get = model.get
Transaction.getById = model.getById
Transaction.create = model.create
Transaction.deleteById = model.deleteById
Transaction.updateById = model.updateById

module.exports = Transaction
