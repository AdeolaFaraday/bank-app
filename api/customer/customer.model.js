const model = require('../model')

const Customer = function (customer) {
  this.id = customer.id
  this.full_name = customer.full_name
  this.city = customer.city
  this.address = customer.address
}

Customer.get = model.get
Customer.getById = model.getById
Customer.create = model.create
Customer.deleteById = model.deleteById
Customer.updateById = model.updateById

module.exports = Customer
