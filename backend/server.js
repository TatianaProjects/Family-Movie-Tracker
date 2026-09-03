const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const movieRoutes = require('./routes/movies')

require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/movies', movieRoutes)

mongoose
  .connect(process.env.MONGOOB_LINK)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err))

const PORT = process.env.PORT || 7000

app.get('/', (req, res) => {
  res.send('Family Movie Tracker API is running!')
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})