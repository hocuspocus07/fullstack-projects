import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../components/Navbar';

export function UserDashboard() {
    const [user, setuser] = useState({});
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                const userResponse = await fetch(`https://car-api-o2p5.onrender.com/api/users/me`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    }
                });
                const data = await userResponse.json();
                setuser(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserData();
    }, []);
    const handleLogout = async () => {
        try {
            // Call the logout API to clear refreshToken and cookies on the server
            const authToken = localStorage.getItem('authToken');
            await fetch('https://car-api-o2p5.onrender.com/api/users/logout', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json',
                },
            });

            // Clear authToken from local storage
            localStorage.removeItem('authToken');

            // Redirect to login page
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
    function copyAPI() {
        // Find the closest <pre> tag relative to the clicked element
        const apiKey = document.getElementById('apiKey');

        if (apiKey) {
            const text = apiKey.innerText;
            navigator.clipboard.writeText(text).then(() => {
                alert('apiKey copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy key: ', err);
            });
        } else {
            console.error('Code block not found!');
        }
    }
    return (
        <>
            <NavBar />
            <div className="flex items-center justify-center min-h-screen bg-custom-bg bg-cover bg-center w-screen">
                <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg w-2/3 p-8">
                    <h2 className="text-3xl font-bold text-center text-transparent text-white mb-6">
                        User Dashboard
                    </h2>

                    {/* User Information Section */}
                    <div className="mb-6 text-white">
                        <p className="text-xl font-semibold">Welcome, {user.name || 'User'}!</p>
                        <p className="mt-2">Email: {user.email || 'Email not available'}</p>
                        <p className="mt-2">Your apiKey:<code id='apiKey' className='bg-gray-900'> {user.apiKey || 'apiKey not available'}</code> <span onClick={copyAPI} className='hover:cursor-pointer'><ion-icon name="clipboard-outline"></ion-icon></span></p>
                        <p className="mt-2">You joined us on: {user.createdAt} zulu time</p>
                    </div>

                    {/* Logout Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={handleLogout}
                            className="w-full py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
