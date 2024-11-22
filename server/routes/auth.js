const express = require('express')
const router = express.Router();
const joi = require('joi')
const bcrypt = require('bcrypt')
const { EmployeeModel } = require('../models/employee');

console.log(EmployeeModel);

router.post('/login', async (req, res) => {

    try {

        const { error } = validate(req.body)
        if (error) {

            console.log('Validation Error:', error.details);
            return res.status(400).send({ message: error.details[0].message })
        }

        // const user = await  EmployeeModel.findOne({ email: req.body.email })
        const user = await EmployeeModel.findOne({ email: req.body.email })
        if (!user) {
            console.log('User not found:', req.body.email);
            return res.status(401).send({ message: "Invalid Email or Password" })
        }

        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        )

        if (!validPassword) {
            console.log('Invalid password attempt for user:', req.body.email);
            res.status(401).send({ message: "Invalid Email or Password" })
        }
        const token = user.generateAuthToken();
        res.status(200).send({ data: token, message: "Logged in successfully" })
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).send({ message: "internal Server  Error" })
    }

})


const validate = (data) => {
    const schema = joi.object({
        email: joi.string().email().required().label("Email"),
        password: joi.string().required().label("Password"),
    })
    return schema.validate(data)
}

module.exports = router