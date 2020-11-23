const express = require('express')
const {
  createAccount,
  getAllAccounts,
  getAccountById,
  deleteAccountById,
  updateAccountById,
} = require('./account.service')
const router = express.Router()

router.post('/', createAccount)
router.get('/', getAllAccounts)
router.get('/:id', getAccountById)
router.delete('/:id', deleteAccountById)
router.put('/:id', updateAccountById)

module.exports = router
