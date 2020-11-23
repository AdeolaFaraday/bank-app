const model = require('../model')

const Branch = function (branch) {
  this.city = branch.city
  this.address = branch.address
  this.open_time = branch.open_time
  this.close_time = branch.close_time
}

Branch.get = model.get
Branch.getById = model.getById
Branch.create = model.create
Branch.deleteById = model.deleteById
Branch.updateById = model.updateById

module.exports = Branch
