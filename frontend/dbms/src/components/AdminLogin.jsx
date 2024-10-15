import { useState } from 'react';
import './container.css';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:3001';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Add error state
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/admin-login', {
        username,
        password,
      });
      if (response.data.success) {
        navigate('/admin-dashboard'); // replace with your actual admin dashboard route
      } else {
        setError('Invalid username or password'); // Set error message
      }
    } catch (error) {
      setError("Invalid Username or Password"); // Set error message
    }
  }

  return (
    <div className='login'>
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <br />
        <button type="submit" className='submit' >Login</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </div>
  )
}

export default AdminLogin;