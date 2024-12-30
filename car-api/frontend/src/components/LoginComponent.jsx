import React,{useState} from 'react'
import { loginUser } from '../api.js'
import { useNavigate } from 'react-router-dom'

export function LoginComponent() {
    const [email,setemail]=useState('');
    const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogin=async (e)=>{
    e.preventDefault();
    try{
        const response=await loginUser({email,password});
        console.log(response.data);
    }catch(error){
        console.log(error);
    }
  }
  return (
    <div>
      <h2>Login</h2>
      {error && <div>{error}</div>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}