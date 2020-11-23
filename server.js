/* Imports */
const express = require('express')
const bodyParser = require('body-parser')
const customerRoutes = require('./api/customer/customer.routes')
const branchRoutes = require('./api/branch/branch.routes')
const accountRoutes = require('./api/account/account.routes')
const transactionRoutes = require('./api/transaction/transaction.routes')

/* Express server config */
const app = express()
app.use(bodyParser.json())

/* REST API Routes */
app.use('/api/customer', customerRoutes)
app.use('/api/branch', branchRoutes)
app.use('/api/account', accountRoutes)
app.use('/api/transaction', transactionRoutes)

app.listen(3000, () => {
  console.log('Server is running on port 3000.')
})
