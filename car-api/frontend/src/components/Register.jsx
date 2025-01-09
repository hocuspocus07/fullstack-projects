// src/components/Register.js
import React, { useState } from 'react';
import { registerUser } from '../api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({ name, email, password });
      console.log(response.data);
      navigate('/login'); // Redirect to login after successful registration
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-custom-bg bg-cover bg-center">
  <div className="w-full max-w-md p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg xs:w-full sm:w-96 animate-float">
    <h2 className="text-2xl font-bold text-center text-transparent text-white xs:text-xl sm:text-2xl">
      REGISTER
    </h2>
    {error && (
      <div className="mt-4 text-sm text-center text-white bg-red-500 rounded-md p-2">
        {error}
      </div>
    )}
    <form onSubmit={handleRegister} className="mt-6 space-y-4">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full px-4 py-2 text-sm border bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 xs:text-sm sm:text-base"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-2 text-sm border bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 xs:text-sm sm:text-base"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-4 py-2 text-sm border bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 xs:text-sm sm:text-base"
      />
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        Register
      </button>
    </form>
  </div>
</div>
  );
};

export default Register;