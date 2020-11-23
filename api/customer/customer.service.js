const Customer = require('./customer.model')

function getAllCustomers(req, res) {
  Customer.get('customers', (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'An error occurred while retrieving customers.',
      })
    else {
      res.send(data)
    }
  })
}

function getCustomerById(req, res) {
  Customer.getById('customers', req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.customerId}.`,
        })
      } else {
        res.status(500).send({
          message: 'Error retrieving Customer with id ' + req.params.customerId,
        })
      }
    } else res.send(data)
  })
}

function createCustomer(req, res) {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  }

  // Create a Customer
  const customer = new Customer({
    id: req.body.id,
    full_name: req.body.full_name,
    city: req.body.city,
    address: req.body.address,
  })

  // Save Customer in the database
  Customer.create('customers', customer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Customer.',
      })
    else res.send(data)
  })
}

function deleteCustomerById(req, res) {
  Customer.deleteById('customers', req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Customer with id ${req.params.id}.`,
        })
      } else {
        res.status(500).send({
          message: 'Could not delete Customer with id ' + req.params.id,
        })
      }
    } else res.send({ message: `Customer was deleted successfully!` })
  })
}

function updateCustomerById(req, res) {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  }

  Customer.updateById(
    'customers',
    req.params.id,
    new Customer(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Customer with id ${req.params.id}.`,
          })
        } else {
          res.status(500).send({
            message: 'Error updating Customer with id ' + req.params.id,
          })
        }
      } else res.send(data)
    }
  )
}

module.exports = {
  getCustomerById,
  getAllCustomers,
  createCustomer,
  deleteCustomerById,
  updateCustomerById,
}
