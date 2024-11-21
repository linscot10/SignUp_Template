const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const EmployeeModel = require('./models/employee')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/employee',);

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    EmployeeModel.findOne({ email: email })
        .then(user => {
            if (user) {
                if (user.password === password) {
                    res.json("Success")
                }
                else {
                    res.json("The password is incorrect")
                }
            }
            else {
                res.json("No record exists")
            }
        })
})

app.use('/register', (req, res) => {
    EmployeeModel.create(req.body)
        .then(employees => res.json(employees))
        .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log(`server is running `)

})