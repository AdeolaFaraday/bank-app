const express = require('express')
const {
  createBranch,
  getAllBranches,
  getBranchById,
  deleteBranchById,
  updateBranchById,
} = require('./branch.service')
const router = express.Router()

router.post('/', createBranch)
router.get('/', getAllBranches)
router.get('/:id', getBranchById)
router.delete('/:id', deleteBranchById)
router.put('/:id', updateBranchById)

module.exports = router
