import React from 'react'
import { Link } from 'react-router-dom';
import './container.css';
function LoginContainer() {
    return(
        <div className='container'>
        
        <Link to="/admin-login" className='btn text'>Admin Login</Link>
        <div className="divider"></div>
        <Link to="/clerk-login" className='client-btn text'>Clerk Login</Link>
    </div>
            
        
    );
}

export default LoginContainer;