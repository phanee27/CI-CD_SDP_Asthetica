import {Link} from 'react-router-dom'
import React from 'react';
import './styles/Registration.css'
import { useState } from 'react';
import axios from 'axios';
import config from '../../config';

const Registration = () => {
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        username:"",
        password:"",
        contact:"",
        gender:"",
        role:"BUYER",
    })

    const [message, setMessage] = useState("")
    const [error, SetError] = useState("")

    const handleChange = (e) => {
        const {id, value} = e.target
        setFormData({...formData, [id]:value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${config.url}/user/adduser`, formData)
            if(response.status === 200){
                setMessage(response.data)
                setFormData({
                    name:"",
                    email:"",
                    username:"",
                    password:"",
                    contact:"",
                    gender:"",
                    role:"BUYER",
                })
            }
        } catch (error) {
            if(error.response){
                setMessage("")
                SetError(error.response.data)
            }else{
                setMessage("")
                SetError("An unexpected Error Occurred.")
            }
        }
    }
    return (
        <div className='register'>
            <p className='register-header' style={{fontSize:'larger'}}>ASTHETICA</p>
            <h1>Create Account</h1>
            <p className='register-quote'>start your journey collecting stunning art</p>
            <div className='register-section'>
                <div className='register-input-fields'>
                {
                    message ? (
                        <p style={{ textAlign: "center", color: "green", fontWeight: "bolder" }}>
                        {message}
                        </p>
                    ) : error ? (
                        <p style={{ textAlign: "center", color: "red", fontWeight: "bolder" }}>
                        {typeof error === "string" ? error : error.message || "An error occurred"}
                        </p>
                    ) : null
                }
                    <form onSubmit={handleSubmit}>
                    <label htmlFor="fullname">Full Name</label><br />
                    <input type="text" id='name' value={formData.name} onChange={handleChange} placeholder='Enter full name' required/><br />
                    <label htmlFor="gender"  >Gender:</label><br />
                        <select id="gender" name="gender" value={formData.gender} onChange={handleChange} style={{width:"100%"}}>
                        <option value="" disabled>-- select --</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        </select><br />
                    <label htmlFor="fullname" >Email</label><br />
                    <input type="email" id='email' value={formData.email} onChange={handleChange} placeholder='Enter email' required/><br />
                    <label htmlFor='username'>Username</label><br/>
                    <input type="text" id='username' value={formData.username} onChange={handleChange} placeholder='Enter username' required/><br/>
                    <label htmlFor="pwd">Password</label><br />
                    <input type="password" id='password' value={formData.password} onChange={handleChange} placeholder='Enter password' required/><br />
                    <label htmlFor="contact">Contact</label><br/>
                    <input type="number" id='contact' value={formData.contact} onChange={handleChange} placeholder='Enter contact' required/><br />
                    <button className='register-create' type='submit'>Submit</button>
                    </form>
                    <p className='register-sign-in'>already have an account? <Link to='/login'>Login here</Link></p>
                </div>
            </div>
           
        </div>
    );
}

export default Registration;
