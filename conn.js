import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host: 'localhost',
  user: 'DiegoDS',
  database: 'blog_db',
  password: 'Dd425',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export default pool
