const mysql = require('mysql2')

/* Connection configuration */
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1935',
  database: 'appli_check',
})

/* Connecting to db */
connection.connect((error) => {
  if (error) throw error
  console.log('Connected to the database.')
})

module.exports = connection
