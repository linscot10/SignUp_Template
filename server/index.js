require('dotenv').config()
const cors = require('cors')
const express = require('express')
const connection = require('./db')
const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')

connection()
const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3001



app.use('/api', userRoutes)
app.use('/api', authRoutes)
app.get('/', (req, res) => {
    res.send("Hello world")
})

app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}`)

})