import express from 'express'
import { getAllPosts } from './db.js'
import { createPost } from './db.js'
import { getPost } from './db.js'
import { deletePost } from './db.js'
import { modifyPost } from './db.js'

const app = express()
app.use(express.json())
const port = 3000

app.get('/posts', async (req, res) => {
  try {
      const allPosts = await getAllPosts()
      res.json(allPosts)
  } catch (error) {
      console.error('Error al obtener todos los posts:', error)
      res.status(500).json({ error: 'Error al obtener todos los posts' })
  }
})

app.post('/posts', async (req, res) => {
  const { country, capital_city, size, off_language, PIB } = req.body
  try {
      const result = await createPost(country, capital_city, size, off_language, PIB)
      res.json(result)
  } catch (error) {
      console.error('Error al crear un nuevo post:', error)
      res.status(500).json({ error: 'Error al crear un nuevo post' })
  }
})


app.get('/posts/:id', async (req, res) => {
  const id = req.params.id
  try {
      const post = await getPost(id)
      res.json(post)
  } catch (error) {
      console.error('Error al obtener el post:', error)
      res.status(500).json({ error: 'Error al obtener el post' })
  }
})

app.delete('/posts/:id', async (req, res) => {
  const id = req.params.id
  try {
      const result = await deletePost(id)
      res.json(result)
  } catch (error) {
      console.error('Error al eliminar el post:', error)
      res.status(500).json({ error: 'Error al eliminar el post' })
  }
})

app.put('/posts/:id', async (req, res) => {
  const id = req.params.id
  const { columna, dato } = req.query
  try {
      const result = await modifyPost(id, columna, dato)
      res.json(result)
  } catch (error) {
      console.error('Error al modificar el post:', error)
      res.status(500).json({ error: 'Error al modificar el post' })
  }
})

app.use((req, res, next) => {
  res.status(501).json({ error: 'Método HTTP no implementado' })
})


app.listen(port, '127.0.0.1', () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})
