const express = require('express')
const {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  deleteCustomerById,
  updateCustomerById,
} = require('./customer.service')
const router = express.Router()

router.post('/', createCustomer)
router.get('/', getAllCustomers)
router.get('/:id', getCustomerById)
router.delete('/:id', deleteCustomerById)
router.put('/:id', updateCustomerById)

module.exports = router
