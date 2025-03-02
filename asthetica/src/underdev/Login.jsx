import React from 'react';
import './styles/Login.css'
import { DiApple } from "react-icons/di";


const Login = () => {
    return (
        <div className='login'> 
                <p className='login-header'><strong>ASTHETICA</strong></p>
                <div className='login-section'>
                    <div className="header">
                        <h2>Welcome Back</h2>
                        <p className='header-quote'>Sign in to explore curated works</p>
                    </div>
                    <div className="form-section">
                        <p>Name</p>
                        <input className='login-input-field' type="text" placeholder='Enter your Name'/>
                        <p>password</p>
                        <input className='login-input-field' type="password" placeholder='Enter password'/>
                    </div>
                    <div className='check-section'>
                        <div style={{display:'flex', fontSize:'small'}}>
                            <label htmlFor="remember">Remember Me</label>
                            <input type="checkbox" id='remember'/>
                        </div>
                        {/* This forget password needs to be changed using <Link></Link>*/}
                        <p>Forgot password ?</p>
                    </div>
                    <div className="login-page-btn">
                        <button>Sign In</button>
                    </div>
                    <div className="ggl-fcbk-sign">
                        <div>
                            
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
            
        </div>
    );
}

export default Login;
