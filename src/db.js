import conn from './conn.js'

export async function getAllPosts() {
  const [rows] = await conn.query('SELECT * FROM blog_posts')
  return rows
}

export async function createPost(country, capital_city, size, off_language, PIB) {
  const [result] = await conn.query('INSERT INTO blog_posts (country, capital_city, size, off_language, PIB) VALUES (?, ?, ?, ?, ?)', [country, capital_city, size, off_language, PIB])
  return result
}

export async function getPost(id) {
  const [result] = await conn.query('SELECT * FROM blog_posts WHERE id = ?', [id])
  return result
}

export async function deletePost(id) {
  const [result] = await conn.query('DELETE FROM blog_posts WHERE id = ?', [id])
}

export async function modifyPost(id, columna, dato) {
  const [result] = await conn.query(`UPDATE blog_posts SET ${columna} = ? WHERE id = ?`, [dato, id])
  return result
}
