import React from 'react'
import NavBar from '../components/Navbar.jsx'
import { SignupComponent } from '../components/SIgnupComponent.jsx'

export function Signup() {
  return (
    <div className='h-full w-screen'>
          <NavBar />
          <SignupComponent/>
    </div>
  )
}
