const Customer_Accounts = require('../customer_accounts/customer_accounts.model')
const Transaction = require('./transaction.model')
const Account = require('../account/account.model')
const moment = require('moment')

function getAllTransactions(req, res) {
  Transaction.get('transactions', (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'An error occurred while retrieving Transactions.',
      })
    else {
      res.send(data)
    }
  })
}

function getTransactionById(req, res) {
  Transaction.getById('transactions', req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Transaction with id ${req.params.id}.`,
        })
      } else {
        res.status(500).send({
          message: 'Error retrieving Transaction with id ' + req.params.id,
        })
      }
    } else res.send(data)
  })
}

function _createTransaction(transaction) {
  Transaction.create('transactions', transaction, (err, data) => {
    if (err) console.log('Error creating transaction')
    else {
      console.log('Created new transaction: ', data)
    }
    return
  })
}

function deleteTransactionById(req, res) {
  Transaction.deleteById('transactions', req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Transaction with id ${req.params.id}.`,
        })
      } else {
        res.status(500).send({
          message: 'Could not delete Transaction with id ' + req.params.id,
        })
      }
    } else res.send({ message: `Transaction was deleted successfully!` })
  })
}

function updateTransactionById(req, res) {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  }

  Transaction.updateById(
    'transactions',
    req.params.id,
    new Transaction(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Transaction with id ${req.params.id}.`,
          })
        } else {
          res.status(500).send({
            message: 'Error updating Transaction with id ' + req.params.id,
          })
        }
      } else res.send(data)
    }
  )
}

function deposit(req, res) {
  let transaction = null
  const { customer_id, account_id, sum } = req.body
  if (!(customer_id && account_id && sum))
    res.status(400).send({ message: 'Missing information for deposit' })
  Customer_Accounts.findById(customer_id, account_id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found customer accound with id ${customer_id}.`,
        })
      } else {
        res.status(500).send({
          message: `Error retrieving customer_account with id ${customer_id}`,
        })
      }
    } else {
      Account.getById('accounts', account_id, (err, account) => {
        account.balance = parseInt(account.balance) + parseInt(sum)
        Account.updateById('accounts', account_id, account, (err, res) => {
          if (err) console.log('error updating account')
        })
      })
      transaction = new Transaction({
        completed_at: moment().format('YYYY-MM-DD HH:mm:ss'),
        sender_id: customer_id,
        amount: sum,
        sender_account: account_id,
        to_account: account_id,
        transaction_type: 'deposit',
      })
      _createTransaction(transaction)
      res.send(transaction)
    }
  })
}

function withdrawal(req, res) {
  let transaction = null
  const { customer_id, account_id, sum } = req.body
  if (!(customer_id && account_id && sum))
    res.status(400).send({ message: 'Missing information for withdrawal' })
  Customer_Accounts.findById(customer_id, account_id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found customer accound with id ${customer_id}.`,
        })
      } else {
        res.status(500).send({
          message: `Error retrieving customer_account with id ${customer_id}`,
        })
      }
    } else {
      Account.getById('accounts', account_id, (err, account) => {
        const limit = parseInt(account.balance) + parseInt(account.credit_limit)
        if (limit < parseInt(sum)) {
          console.log('Insufficient funds!')
          res.status(500).send({ message: 'Insufficient funds!' })
          return
        } else {
          account.balance = parseInt(account.balance) - parseInt(sum)
          Account.updateById('accounts', account_id, account, (err, res) => {
            if (err) console.log('error updating account')
          })
          transaction = new Transaction({
            completed_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            sender_id: customer_id,
            amount: sum,
            sender_account: account_id,
            to_account: null,
            transaction_type: 'withdrawal',
          })
          _createTransaction(transaction)
          res.send(transaction)
        }
      })
    }
  })
}

function transfer(req, res) {
  let transaction = null
  const { customer_id, account_id, sum, to_account } = req.body
  if (!(customer_id && account_id && sum))
    res.status(400).send({ message: 'Missing information for transfer' })
  Customer_Accounts.findById(customer_id, account_id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found customer accound with id ${customer_id}.`,
        })
      } else {
        res.status(500).send({
          message: `Error retrieving customer_account with id ${customer_id}`,
        })
      }
    } else {
      Account.getById('accounts', account_id, (err, account) => {
        const limit = parseInt(account.balance) + parseInt(account.credit_limit)
        if (limit < parseInt(sum)) {
          console.log('Insufficient funds!')
          res.status(500).send({ message: 'Insufficient funds!' })
          return
        } else {
          account.balance = parseInt(account.balance) - parseInt(sum)
          Account.updateById('accounts', account_id, account, (err, res) => {
            if (err) console.log('error updating account')
          })
          Account.getById('accounts', to_account, (err, receiver) => {
            receiver.balance = parseInt(receiver.balance) + parseInt(sum)
            Account.updateById('accounts', to_account, receiver, (err, res) => {
              if (err) console.log('Error sending funds!')
            })
          })
          transaction = new Transaction({
            completed_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            sender_id: customer_id,
            amount: sum,
            sender_account: account_id,
            to_account: to_account,
            transaction_type: 'transfer',
          })
          _createTransaction(transaction)
          res.send(transaction)
        }
      })
    }
  })
}

module.exports = {
  getTransactionById,
  getAllTransactions,
  deleteTransactionById,
  updateTransactionById,
  deposit,
  withdrawal,
  transfer,
}
