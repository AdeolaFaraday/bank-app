const Branch = require('./Branch.model')

function getAllBranches(req, res) {
  Branch.get('branches', (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'An error occurred while retrieving Branches.',
      })
    else {
      res.send(data)
    }
  })
}

function getBranchById(req, res) {
  Branch.getById('Branches', req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Branch with id ${req.params.id}.`,
        })
      } else {
        res.status(500).send({
          message: 'Error retrieving Branch with id ' + req.params.id,
        })
      }
    } else res.send(data)
  })
}

function createBranch(req, res) {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  }

  // Create a Branch
  const branch = new Branch({
    city: req.body.city,
    address: req.body.address,
    open_time: req.body.open_time,
    close_time: req.body.close_time,
  })

  // Save Branch in the database
  Branch.create('Branches', branch, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Branch.',
      })
    else {
      res.send(data)
      console.log('Created new branch: ', data)
    }
  })
}

function deleteBranchById(req, res) {
  Branch.deleteById('Branches', req.params.id, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found Branch with id ${req.params.id}.`,
        })
      } else {
        res.status(500).send({
          message: 'Could not delete Branch with id ' + req.params.id,
        })
      }
    } else res.send({ message: `Branch was deleted successfully!` })
  })
}

function updateBranchById(req, res) {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
  }

  Branch.updateById(
    'Branches',
    req.params.id,
    new Branch(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === 'not_found') {
          res.status(404).send({
            message: `Not found Branch with id ${req.params.id}.`,
          })
        } else {
          res.status(500).send({
            message: 'Error updating Branch with id ' + req.params.id,
          })
        }
      } else res.send(data)
    }
  )
}

module.exports = {
  getBranchById,
  getAllBranches,
  createBranch,
  deleteBranchById,
  updateBranchById,
}
