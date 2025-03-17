import React, { useState } from 'react';
import axios from '../config/api';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/logo.png";

function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', loginData);
      console.log(response.data)
      const data = response.data;

      localStorage.setItem('user', JSON.stringify(data));

      // Redirect based on user role
      if (data.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (user.role === 'hr') {
        navigate('/hr-dashboard');
      } else if (user.role === 'team') {
        navigate('/team-dashboard');
      } else {
        setError('Unauthorized role');
      }
    } catch (err) {
      setError('Invalid credentials');
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
              type="text"
              required
              placeholder="Username"
              className="w-full px-3 py-2 border rounded-md"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
            <input
              type="password"
              required
              placeholder="Password"
              className="w-full px-3 py-2 border rounded-md"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
          </div>
          <button type="submit" className="w-full py-2 text-white bg-[#FF6F00] hover:bg-[#dc6b16] rounded-md">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
