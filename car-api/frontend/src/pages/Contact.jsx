import React from 'react'
import NavBar from '../components/NavBar.jsx'
import ContactComponent from '../components/ContactComponent.jsx'

function Contact() {
  return (
    <div className='flex h-screen w-screen flex-col'>
    <NavBar/>
    <ContactComponent/>
    </div>
  )
}

export default Contact