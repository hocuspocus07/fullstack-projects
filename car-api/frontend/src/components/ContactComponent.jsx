import React,{useState} from 'react'
import axios from 'axios';
import { contactUs } from '../api';
function ContactComponent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  async function submitContactForm(formData) {
    try {
      const response = await contactUs(formData);
      alert(response.data.message);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      alert('Failed to send your message. Please try again.');
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { name, email, message };
    submitContactForm(formData);
  };
  
  return (
    <>
    <div className="bg-custom-bg bg-cover bg-center h-screen w-screen flex justify-center items-center text-white">
      <div className="w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 p-6 bg-opacity-10 bg-white backdrop-blur-lg rounded-lg shadow-lg animate-float">
        <h2 className="text-2xl font-bold mb-4 text-white text-center">CONTACT US</h2>
        <p className="text-lg mb-6 text-gray-300 text-center">
          We'd love to hear from you! Fill out the form below, and we'll get back to you soon.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center">
            <label htmlFor="name" className="flex items-center justify-center text-lg font-medium text-white w-50">
            <ion-icon name="person-outline"></ion-icon>&nbsp;
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-opacity-10 backdrop-blur-lg bg-white shadow-sm w-full ml-2 p-2 mt-1 text-black rounded-md focus:ring-2 focus:ring-[#FFD700] focus:outline-none"
              placeholder="Enter your name"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="email" className="flex items-center justify-center text-lg font-medium text-white w-50">
            <ion-icon name="mail-outline"></ion-icon>&nbsp;
              Your Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-opacity-10 backdrop-blur-lg bg-white shadow-sm w-full  ml-2 p-2 mt-1 text-black rounded-md focus:ring-2 focus:ring-[#FFD700] focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="message" className="flex items-center justify-center text-lg font-medium text-white w-50">
            <ion-icon name="document-text-outline"></ion-icon>&nbsp;
              Your Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              className="bg-opacity-10 backdrop-blur-lg bg-white shadow-sm w-full ml-2 p-2 mt-1 text-black rounded-md focus:ring-2 focus:ring-[#FFD700] focus:outline-none"
              placeholder="Enter your message"
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default ContactComponent