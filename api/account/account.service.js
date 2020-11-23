const Customer_Accounts = require('../customer_accounts/customer_accounts.model')
const Account = require('./account.model')

function getAllAccounts(req, res) {
  Account.get('accounts', (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'An error occurred while retrieving Accounts.',
      })
    else {
      res.send(data)
    }
  })
}

function getAccountById(req, res) {
  Account.getById('accounts', req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Account with id ${req.params.id}.`,
        })
      } else {
        res.status(500).send({
          message: 'Error retrieving Account with id ' + req.params.id,
        })
      }
    } else res.send(data)
  })
}

function createAccount(req, res) {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  }

  // Create a Account
  const account = new Account({
    id: req.body.id,
    credit_limit: req.body.credit_limit,
    balance: req.body.balance,
    branch_id: req.body.branch_id,
  })

  // Save Account in the database
  Account.create('accounts', account, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Account.',
      })
    else {
      res.send(data)
      console.log('Created new Account: ', data)
      const customer_account = new Customer_Accounts({
        customer_id: req.body.customer_id,
        account_id: account.id,
      })
      Customer_Accounts.create(
        'customer_accounts',
        customer_account,
        (err, data) => {
          if (err)
            res.status(500).send({
              message:
                err.message ||
                'Some error occured while creating Customer_Account',
            })
        }
      )
    }
  })
}

function deleteAccountById(req, res) {
  Account.deleteById('accounts', req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Account with id ${req.params.id}.`,
        })
      } else {
        res.status(500).send({
          message: 'Could not delete Account with id ' + req.params.id,
        })
      }
    } else res.send({ message: `Account was deleted successfully!` })
  })
}

function updateAccountById(req, res) {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  }

  Account.updateById(
    'accounts',
    req.params.id,
    new Account(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Account with id ${req.params.id}.`,
          })
        } else {
          res.status(500).send({
            message: 'Error updating Account with id ' + req.params.id,
          })
        }
      } else res.send(data)
    }
  )
}

module.exports = {
  getAccountById,
  getAllAccounts,
  createAccount,
  deleteAccountById,
  updateAccountById,
}
