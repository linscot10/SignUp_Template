const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
const { EmployeeModel, validate } = require('../models/employee')

router.post('/register', async (req, res) => {

    try {

        // EmployeeModel.create(req.body)
        // .then(employees => res.json(employees))
        // .catch(err => res.json(err))
        const { error } = validate(req.body)
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        const user = await EmployeeModel.findOne({ email: req.body.email })
        if (user)
            return res.status(409).send({ message: 'User with given email already exist!' })

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        await new EmployeeModel({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "User created successfully" })
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" })
    }

})

module.exports = router