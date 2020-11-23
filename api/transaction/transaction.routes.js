const express = require('express')
const {
  getAllTransactions,
  getTransactionById,
  deleteTransactionById,
  updateTransactionById,
  deposit,
  withdrawal,
  transfer,
} = require('./transaction.service')
const router = express.Router()

router.get('/', getAllTransactions)
router.get('/:id', getTransactionById)
router.delete('/:id', deleteTransactionById)
router.put('/:id', updateTransactionById)
router.post('/deposit', deposit)
router.post('/withdrawal', withdrawal)
router.post('/transfer', transfer)

module.exports = router
