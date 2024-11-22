import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!email || !password) {
            alert("Please fill in both email and password");
            return;
        }

        axios.post('http://localhost:3001/api/login', { email, password })
            .then(result => {
                console.log(result)

                if (result.data && result.data.message === "Logged in successfully") {

                    navigate('/home')
                }

            })
            .catch(err => {
                console.error('Login error:', err.response ? err.response.data : err);
                alert("An error occurred. Please try again.");
            })
    }

    return (
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>

            <div className='bg-white p-3 rounded w-25'>

                <h2>Login</h2>
                <form onSubmit={handleSubmit}>

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

                    <button type='submit' className='btn btn-success w-100 rounded'>
                        Login
                    </button>

                </form>
                <p>Don't Have an Account?</p>
                <Link to='/register' type='submit' className='btn btn-default w-100 bg-light rounded-0 text-decoration-none'>
                    register
                </Link>

            </div>
        </div>
    )
}

export default Login