import express from 'express'
import {
  getAllPosts,
  createPost,
  getPost,
  deletePost,
  modifyPost,
} from './db.js'
import swagger from './swagger.js'

const app = express()
app.use(express.json())
swagger(app)
const port = 22075

/**
 * @swagger
 * /posts:
 *   get:
 *     description: Returns all posts
 *     responses:
 *       200:
 *         description: An array of posts
 */
app.get('/posts', async (req, res) => {
  try {
    const allPosts = await getAllPosts()
    res.json(allPosts)
  } catch (error) {
    console.error('Error al obtener todos los posts:', error)
    res.status(500).json({ error: 'Error al obtener todos los posts' })
  }
})


/**
 * @swagger
 * /posts/{postId}:
 *   get:
 *     description: Returns a single post by postId
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: ID of the post to return
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single post object
 */
app.post('/posts', async (req, res) => {
  const {
    country,
    capital_city,
    size,
    off_language,
    PIB,
  } = req.body;
  try {
    const result = await createPost(country, capital_city, size, off_language, PIB)
    res.json(result)
  } catch (error) {
    console.error('Error al crear un nuevo post:', error)
    res.status(500).json({ error: 'Error al crear un nuevo post' })
  }
})

/**
 * @swagger
 * /posts:
 *   post:
 *     description: Create a new post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully created post
 */
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

/**
 * @swagger
 * /posts/{postId}:
 *   delete:
 *     description: Delete a post by postId
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: ID of the post to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Successfully deleted post
 */
app.delete('/posts/:id', async (req, res) => {
  const id = req.params.id
  try {
    await deletePost(id);
    res.sendStatus(204);
  } catch (error) {
    console.error('Error al eliminar el post:', error);
    res.status(500).json({ error: 'Error al eliminar el post' });
  }
});

/**
 * @swagger
 * /posts/{postId}:
 *   put:
 *     description: Update a post by postId
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: ID of the post to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               columna:
 *                 type: string
 *               dato:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated post
 */
app.put('/posts/:id', async (req, res) => {
  const id = req.params
  const { columna, dato } = req.query
  try {
    const result = await modifyPost(id, columna, dato)
    res.json(result)
  } catch (error) {
    console.error('Error al modificar el post:', error)
    res.status(500).json({ error: 'Error al modificar el post' })
  }
})

app.use((req, res) => {
  res.status(501).json({ error: 'Método HTTP no implementado' })
})

app.listen(port, '127.0.0.1', () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})


