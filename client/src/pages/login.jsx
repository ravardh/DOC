import React, { useState } from 'react';
import axios from '../config/api';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";

function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post('/api/auth/login', loginData);
      const data = response.data;

      // Store user data and token separately
      localStorage.setItem('user', JSON.stringify({
        _id: data._id,
        email: data.email,
        role: data.role
      }));
      localStorage.setItem('token', data.token);

      // Redirect based on user role
      if (data.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (data.role === 'hr') {
        navigate('/hr-dashboard');
      } else if (data.role === 'team') {
        navigate('/team-dashboard');
      } else {
        setError('Unauthorized role');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img src={logo} alt="Drops of Change" className="mx-auto h-24 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Login</h2>
        </div>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="grid gap-3">
            <input
              type="email"
              required
              placeholder="Email"
              className="w-full px-3 py-2 border rounded-md"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              disabled={isLoading}
            />
            <input
              type="password"
              required
              placeholder="Password"
              className="w-full px-3 py-2 border rounded-md"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              disabled={isLoading}
            />
          </div>
          <button 
            type="submit" 
            className={`w-full py-2 text-white bg-[#FF6F00] hover:bg-[#dc6b16] rounded-md ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
