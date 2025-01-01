import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { filterOptions } from '../components/FilterOptions.js';
import NavBar from '../components/NavBar.jsx';

export function UserDashboard() {
    const [selectedFilterList, setSelectedFilterList] = useState([]);
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
                if (data.apiKey) {
                    setcurrenturl(`https://car-api-o2p5.onrender.com/api/cars?apiKey=${data.apiKey}`);
                  }
            } catch (error) {
                console.log(error);
            }
        }
        fetchUserData();
    }, []);
    const src = `https://car-api-o2p5.onrender.com/api/cars?apiKey=${user.apiKey}`;
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
    const [selectedFilter, setSelectedFilter] = useState('');
    const [currenturl,setcurrenturl]=useState('')
    const handleFilterChange = (e) => {
        setSelectedFilter(e.target.value);
    };

    function submitFilters() {
        const filterInput = document.getElementById('filter').value.trim();
        let newUrl = currenturl || `https://car-api-o2p5.onrender.com/api/cars?apiKey=${user.apiKey}`;
        
        if (selectedFilter && filterInput) {
            // Append the new filter dynamically without duplicating existing filters
            const formattedFilterKey = selectedFilter.replace(/\s+/g, "+"); // Replace spaces with '+'
            const newFilter = `${formattedFilterKey}=${encodeURIComponent(filterInput)}`;
    
            // Check if the filter key already exists in the URL
            if (newUrl.includes(formattedFilterKey)) {
                // Replace the existing filter value
                const regex = new RegExp(`${formattedFilterKey}=[^&]*`);
                newUrl = newUrl.replace(regex, newFilter);
            } else {
                // Append the new filter to the URL
                newUrl += `&${newFilter}`;
            }
            setSelectedFilterList(prevList => {
                const updatedList = [...prevList];
                const existingIndex = updatedList.findIndex(f => f.startsWith(formattedFilterKey));
                if (existingIndex > -1) {
                    updatedList[existingIndex] = newFilter;
                } else {
                    updatedList.push(newFilter);
                }
                return updatedList;
            });
        }
    
        setcurrenturl(newUrl);
    
        // Update iframe's src with the new URL
        const iframe = document.getElementById('display');
        iframe.src = newUrl;
    
        console.log('Updated URL:', newUrl);
        document.getElementById('filter').value=""
    }
    const resetFilters = () => {
        setcurrenturl(`https://car-api-o2p5.onrender.com/api/cars?apiKey=${user.apiKey}`);
        setSelectedFilterList([]);
        document.getElementById('filter').value = "";
        setSelectedFilter('');
        const iframe = document.getElementById('display');
        iframe.src = `https://car-api-o2p5.onrender.com/api/cars?apiKey=${user.apiKey}`;
    };
    useEffect(() => {
        const iframe = document.getElementById('display');
        iframe.onload = () => {
            try {
                const contentDocument = iframe.contentDocument || iframe.contentWindow.document;
                const preTag = contentDocument.querySelector('pre');
    
                if (preTag) {
                    const jsonContent = JSON.parse(preTag.innerText);
                    preTag.innerText = JSON.stringify(jsonContent, null, 2); 
                    preTag.style.whiteSpace = 'pre-wrap'; 
                }
            } catch (err) {
                console.error('Failed to pretty print JSON:', err);
            }
        };
    }, [currenturl]);
    
    
    
    return (
        <>
        <NavBar/>
        <div className="flex flex-col md:flex-row items-start justify-between min-h-screen bg-custom-bg bg-cover bg-center w-screen p-8">
    {/* Left Section: User Dashboard */}
    <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg w-full md:w-1/3 h-auto md:h-screen p-8 mb-8 md:mb-0">
        <h2 className="text-3xl font-bold text-left text-transparent text-white mb-6 xs:text-2xl">
            User Dashboard
        </h2>

        {/* User Information Section */}
        <div className="mb-6 text-white">
            <p className="text-xl font-semibold">Welcome, {user.name || 'User'}!</p>
            <p className="mt-2">Email: {user.email || 'Email not available'}</p>
            <p className="mt-2">
                Your apiKey:
                <code id="apiKey" className="bg-gray-900 px-2 py-1 rounded">
                    {user.apiKey || 'apiKey not available'}
                </code>
                <span onClick={copyAPI} className="hover:cursor-pointer ml-2">
                    <ion-icon name="clipboard-outline"></ion-icon>
                </span>
            </p>
            <p className="mt-2">You joined us on: {user.createdAt || 'N/A'} zulu time</p>
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

    {/* Right Section: API Usage */}
    <div className="w-full md:w-1/2 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-left text-white mb-4 xs:text-xl">
            API Usage (Real-Time)
        </h2>
        <iframe id="display"
            src={currenturl} // Replace with the actual URL for API usage tracking
            title="API Usage"
            className=" xs:text-black bg-gray-400 w-full h-96 rounded-lg border border-gray-300"
        ></iframe>
        <h3 className='my-1 text-white text-left xs:text-sm'>Test your filters here:</h3>
        <div className='flex flex-col md:flex-row'>
            <input type="text" id="filter"
                className="w-full md:w-auto h-8 px-4 py-2 border rounded-md mb-4 md:mb-0" placeholder='Enter your filter parameter (e.g., toyota for Make Name)'/>
            <button onClick={submitFilters} className='mr-2 ml-2 h-8 w-full md:w-32 hover:scale-105 transition-all duration-300 ease-in-out hover:bg-blue-900 bg-blue-500 text-white rounded-md flex items-center justify-center mb-4 md:mb-0'>
                Apply
            </button>
            <button 
                onClick={resetFilters} 
                className='hover:scale-105 transition-all duration-300 ease-in-out hover:bg-gray-900 h-8 w-full md:w-32 bg-gray-500 text-white rounded-md flex items-center justify-center'>
                Reset
            </button>
        </div>

        <select 
            value={selectedFilter} 
            onChange={handleFilterChange} 
            className="w-full md:w-60 px-4 py-2 border rounded-md mt-3"
        >
            <option value="" className='xs:w-2/3'>Select a filter...</option>
            {filterOptions.map((option, index) => (
                <option key={index} value={option}>
                    {option}
                </option>
            ))}
        </select>
        <div className="mt-2 text-white">
            <span>Applied filters: <small>(apply them one by one)</small></span>
            <ul>
                {selectedFilterList.map((filter, index) => (
                    <li key={index}>{filter.replace(/\+/g, ' ')}</li>
                ))}
            </ul>
        </div>
    </div>
</div>
        </>
    )
}
