import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/api/register', { firstName, lastName, email, password })
            .then(result => {
                console.log(result)

                navigate('/login')
            })
            .catch(err => {
                if (err.response &&
                    err.response.status >= 400 && err.response.status <= 500
                ) {
                    setError(error.response.data.message)
                }
            })
    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>

            <div className='bg-white p-3 rounded w-25'>

                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='email'>
                            <strong> First Name</strong>
                        </label>
                        <input
                            type='text'
                            placeholder='Enter Name'
                            autoComplete='off'
                            name='firstName'
                            className='form-control rounded-0'
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email'>
                            <strong> Last Name</strong>
                        </label>
                        <input
                            type='text'
                            placeholder='Enter Name'
                            autoComplete='off'
                            name='lastName'
                            className='form-control rounded-0'
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email'>
                            <strong>Email</strong>
                        </label>
                        <input
                            type='email'
                            placeholder='Enter Email'
                            autoComplete='off'
                            name='email'
                            className='form-control rounded-0'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='email'>
                            <strong>Password</strong>
                        </label>
                        <input
                            type='password'
                            placeholder='Enter Password'
                            autoComplete='off'
                            name='password'
                            className='form-control rounded-0'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <div className='mb-3'>
                        {error}
                    </div>}

                    <button type='submit' className='btn btn-success w-100 rounded'>
                        Register
                    </button>

                </form>
                <p>Already Have an Account?</p>
                <Link to='/login' type='submit' className='btn btn-default w-100 bg-light rounded-0 text-decoration-none'>
                    Login
                </Link>

            </div>
        </div>
    )
}

export default Signup