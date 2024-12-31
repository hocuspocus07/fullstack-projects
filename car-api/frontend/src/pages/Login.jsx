import React from 'react'
import NavBar from '../components/NavBar.jsx'
import { LoginComponent } from '../components/LoginComponent.jsx'

export function Login() {
  return (
    <div className='h-full w-screen'>
          <NavBar />
          <LoginComponent/>
    </div>
  )
}