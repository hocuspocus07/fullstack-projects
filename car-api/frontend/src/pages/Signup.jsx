import React from 'react'
import NavBar from '../components/NavBar.jsx'
import { SignUpComponent } from '../components/SignUpComponent.jsx'

export function Signup() {
  return (
    <div className='h-full w-screen'>
          <NavBar />
          <SignUpComponent/>
    </div>
  )
}
