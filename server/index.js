const express = require('express')
const path = require('path')
const axios = require('axios')

const cookieParser = require('cookie-parser')
const session = require('cookie-session')

const app = express()
const port = 5000

const API_URL = process.env.API_URL || 'http://localhost:1337'

// Middlewares
app.use(express.static(path.join(__dirname, 'frontend/build'))) // change path to build folder if different
app.use(express.json())
app.use(cookieParser())
app.use(session({ name: 'jwt', keys: ['abc'] }))

/**  ROUTES SECTION **/

/** GET Routes */

// Get all users
app.get('/users', async (req, res) => {
  const { jwt } = req.session
  
  try {
    const usersRes = await axios({
      method: 'GET',
      url: `${API_URL}/users`,
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    res.send(usersRes.data)
  } catch (error) {
    console.error(error)
  }
})

// Get user by Id
app.get('/users/:id', async (req, res) => {
  const { jwt } = req.session
  const { id } = req.params

  try {
    const userRes = await axios({
      method: 'GET',
      url: `${API_URL}/users/${id}`,
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    res.send(userRes.data.username)
  } catch (error) {
    console.error(error)
  }
})

// list all recipes
app.get('/recipes', async (req, res) => {
  const { jwt } = req.session

  try {
    const recipesRes = await axios({
      method: 'GET',
      url: `${API_URL}/recipes`,
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    res.send(recipesRes.data)
  } catch (error) {
    console.error(error)
  }
})


// Persisting user in session
app.get('/users/me', async (req, res) => {
  const { jwt } = req.session

  try {
    const meRes = await axios({
      method: 'GET',
      url: `${API_URL}/users/me`,
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    res.send(meRes.data)
  } catch (error) {
    console.error(error)
  }
})

// Logout route
app.get('/user/logout', (req, res) => {

  try {
    req.session.jwt = null
    res.send({ status: 200 })
  } catch (error) {
    console.error(error)
  }
})

/** POST Routes */

// Create new Note
app.post('/notes', async (req, res) => {
  const { jwt } = req.session
  const data = req.body

  const createNoteRes = await axios({
    method: 'POST',
    url: `${API_URL}/notes`,
    data,
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })
  res.send(createNoteRes.data)
})



/** PUT Routes */

// Update User
app.put('/users/:userId', async (req, res) => {
  const jwtToken = req.session.jwt
  const data = req.body
  const { userId } = req.params

   
  const updateUserRes = await axios({
    method: 'PUT',
    url: `${API_URL}/users/${userId}`,
    data,
    headers: {
      Authorization: `Bearer ${jwtToken}`
    }
  })

  res.send(updateUserRes.data)
})

// Update Recipe
app.put('/recipes/:id', async (req, res) => {
  const { jwt } = req.session
  const data = req.body
  const { id } = req.params

  const updatedRecipeRes = await axios({
    method: 'PUT',
    url: `${API_URL}/recipes/${id}`,
    data,
    headers: {
      Authorization: `Bearer ${jwt}`
    }
  })

  res.send(updatedRecipeRes.data)
})

/** DELETE Routes */



/** AUTH Routes */

// authentication - /api/auth/local
app.post('/api/auth/local', async (req, res) => {
  try {
    const loginRes = await axios({
      method: 'POST',
      url: `${API_URL}/auth/local`,
      data: req.body
    })
  
    const { jwt, user } = loginRes.data
    req.session.jwt = jwt
  
    const data = { user }
    res.send(data)
  } catch (error) {
    console.error(error.response.data.message[0])
  }
  
})

// registration - /api/auth/local/register
app.post('/api/auth/local/register', async (req, res) => {
  
  try {
    const newUserRes = await axios({
      method: 'POST',
      url: `${API_URL}/auth/local/register`,
      data: req.body
    })  

    const { jwt, user } = newUserRes.data
    req.session.jwt = jwt

    const data = { user }
    res.send(data)

  } catch (error) {
    console.error(error.response.data.message[0].messages[0].message)
    // if (error.response.data.message && error.response.data.message[0].messages[0].message.includes('username')) {
    //   res.status(400)
    //   res.send('Looks like that username has already been taken...')
    // }
  }

  
})

// last route, catch all
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/frontend/build/index.html'))
})

app.listen(port, () => console.log(`Server running on port ${port}`))