import React,{useState} from "react";
import Alert from "./Alert.jsx";
import { filterOptions } from "./FilterOptions.js";
import { motion } from "framer-motion";

export function InfoDocs() {
  const [alert, setAlert] = useState(null);
  function copyCode(event) {
    // Find the closest <pre> tag relative to the clicked element
    const codeBlock = event.target.closest('pre');
  
    if (codeBlock) {
      const text = codeBlock.innerText;
      navigator.clipboard.writeText(text).then(() => {
        setAlert({ variant: 'success', message: 'Code copied to clipboard!' });
        setTimeout(() => setAlert(null), 3000);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
        setAlert({ variant: 'danger', message: 'Failed to copy code!' });
        setTimeout(() => setAlert(null), 3000);
      });
    } else {
      console.error('Code block not found!');
      setAlert({ variant: 'danger', message: 'Code block not found!' });
      setTimeout(() => setAlert(null), 1000);
    }}

  function copyUrl(){
    const url=document.getElementById('url');
    const urlText=url.innerText;
    navigator.clipboard.writeText(urlText).then(() => {
      setAlert({ variant: 'success', message: 'URL copied to clipboard!' });
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      setAlert({ variant: 'danger', message: 'Failed to copy URL!' });
    });
  }
  
  
  return (
    <div className="h-full w-screen bg-gray-900 text-white xs:flex-col flex">
      <div className="h-full w-screen bg-gray-900 text-white xs:flex-col flex">
        {/* Main Content */}
        <div className="w-2/3 p-20 overflow-y-auto xs:w-screen cs:w-screen">
          <h1 className="text-4xl font-bold text-[#FFD700]">
            API Documentation
          </h1>
          <p className="text-lg mt-4 mb-8 leading-relaxed">
            This documentation outlines the endpoints available for interacting
            with the car and user APIs in your application. The API follows REST
            principles and offers functionality for registering, logging in
            users, fetching car data, and user authentication.
          </p>
          {alert && <Alert variant={alert.variant} message={alert.message} onClose={() => setAlert(null)} />}
          {/* Sections */}
          <div className="space-y-12 text-base leading-relaxed">
            {/* Base URL Section */}
            <motion.section 
              id="base-url" 
              className="section" 
              initial={{ opacity: 0,x:-50 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: false,amount:0.5 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl font-semibold text-[#FFD700] mb-2">Base URL</h2>
              <p className="bg-gray-800 p-3 rounded-md inline-block">
                <code id="url">https://car-api-o2p5.onrender.com/api</code>
                <span className="text-xl hover:cursor-pointer" onClick={copyUrl}><ion-icon name="clipboard-outline"></ion-icon></span>
              </p>
            </motion.section>

            {/* Authentication Section */}
            <section id="authentication">
              <h2 className="text-2xl font-semibold text-[#FFD700] mb-2">
                Authentication & Authorization
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">API Key</h3>
                  <p className="text-sm mt-2">
                    You must include an <code>apiKey</code> in your requests to
                    interact with the API. This is verified using the
                    <code>verifyApiKey</code> middleware.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium">JWT Tokens</h3>
                  <p className="text-sm mt-2">
                    For user login and access, you will receive an
                    <code>accessToken</code> and a <code>refreshToken</code> as
                    cookies. The <code>accessToken</code> is required to access
                    protected endpoints.
                  </p>
                </div>
              </div>
            </section>

            {/* User API Endpoints Section */}
            <section id="user-api">
              <h2 className="text-2xl font-semibold text-[#FFD700] mb-2">
                User API Endpoints
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">1. Register User</h3>
                  <p className="mt-2 text-sm">
                    Endpoint: <code>POST /api/users/register</code>
                  </p>
                  <p>Registers a new user in the system.</p>
                  <h4 className="text-lg font-medium mt-4">Request Body:</h4>
                  <pre className="bg-gray-800 p-4 rounded-md text-sm text-left justify-start items-start relative transition-transform duration-300 ease-in-out hover:scale-105">
                  {` {
        "name": "John Doe",
        "password": "password123",
        "email": "johndoeexample@gmail.com"
  }`}<span className="absolute top-2 right-2 text-xl hover:cursor-pointer transform transition duration-300 ease-in-out hover:scale-110" onClick={(event) => copyCode(event)}><ion-icon name="clipboard-outline"></ion-icon></span></pre>
                  <h4 className="text-lg font-medium mt-4">Response:</h4>
                  <pre className="bg-gray-800 p-4 rounded-md text-sm text-left justify-start items-start relative transition-transform duration-300 ease-in-out hover:scale-105">
                  {`  {
        "user": {
              "name": "John Doe",
              "email": "john.doe@example.com",
              "apiKey": "some-generated-api-key"
        },
        "message": "User registered successfully"
    }`}
                  <span className="absolute top-2 right-2 text-xl hover:cursor-pointer transform transition duration-300 ease-in-out hover:scale-110" onClick={(event) => copyCode(event)}><ion-icon name="clipboard-outline"></ion-icon></span></pre>
                </div>
                <div>
                  <h3 className="text-lg font-medium">2. Login User</h3>
                  <p className="mt-2 text-sm">
                    Endpoint: <code>POST /api/users/login</code>
                  </p>
                  <p>
                    Description: Authenticates a user and returns a pair of
                    access and refresh tokens.
                  </p>
                  <h4 className="text-lg font-medium mt-4">Request Body:</h4>
                  <pre className="bg-gray-800 p-4 rounded-md text-sm text-left justify-start items-start relative transition-transform duration-300 ease-in-out hover:scale-105">
                  {`    {
          "email": "john.doe@example.com",
          "password": "password123"
    }`}
                  <span className="absolute top-2 right-2 text-xl hover:cursor-pointer transform transition duration-300 ease-in-out hover:scale-110" onClick={(event) => copyCode(event)}><ion-icon name="clipboard-outline"></ion-icon></span></pre>
                  <h4 className="text-lg font-medium mt-4">Response:</h4>
                  <pre className="bg-gray-800 p-4 rounded-md text-sm text-left justify-start items-start relative transition-transform duration-300 ease-in-out hover:scale-105">
                  {`    {
          "user": {
                "name": "John Doe",
                "email": "john.doe@example.com"
          },
          "accessToken": "access-token-here",
          "refreshToken": "refresh-token-here",
          "message": "USER LOGGED IN SUCCESSFULLY"
    }`}
                  <span className="absolute top-2 right-2 text-xl hover:cursor-pointer transform transition duration-300 ease-in-out hover:scale-110" onClick={(event) => copyCode(event)}><ion-icon name="clipboard-outline"></ion-icon></span></pre>
                </div>
                <div>
                  <h3 className="text-lg font-medium">3. Logout User</h3>
                  <p className="mt-2 text-sm">
                    Endpoint: <code>POST /api/users/logout</code>
                  </p>
                  <p>
                    Description: Logs the user out by clearing the access and
                    refresh tokens.
                  </p>
                  <h4 className="text-lg font-medium mt-4">Headers:</h4>
                  <p className="mt-2 text-sm">
                    <code>Authorization: Bearer &lt;access-token&gt;</code>
                  </p>
                  <h4 className="text-lg font-medium mt-4">Response:</h4>
                  <pre className="bg-gray-800 p-4 rounded-md text-sm text-left justify-start items-start relative transition-transform duration-300 ease-in-out hover:scale-105">
                  {`{
        "message": "USER LOGGED OUT SUCCESSFULLY"
}`}
                  <span className="absolute top-2 right-2 text-xl hover:cursor-pointer transform transition duration-300 ease-in-out hover:scale-110" onClick={(event) => copyCode(event)}><ion-icon name="clipboard-outline"></ion-icon></span></pre>
                </div>
                <div>
                  <h3 className="text-lg font-medium">
                    4. Refresh Access Token
                  </h3>
                  <p className="mt-2 text-sm">
                    Endpoint: <code>POST /api/users/refresh-token</code>
                  </p>
                  <p>
                    Description: Refreshes the access token using the refresh
                    token.
                  </p>
                  <h4 className="text-lg font-medium mt-4">Request Body:</h4>
                  <pre className="bg-gray-800 p-4 rounded-md text-sm text-left justify-start items-start relative transition-transform duration-300 ease-in-out hover:scale-105">
                  {`{
        "refreshToken": "refresh-token-here"
}`}
                  <span className="absolute top-2 right-2 text-xl hover:cursor-pointer transform transition duration-300 ease-in-out hover:scale-110" onClick={(event) => copyCode(event)}><ion-icon name="clipboard-outline"></ion-icon></span></pre>
                  <h4 className="text-lg font-medium mt-4">Response:</h4>
                  <pre className="bg-gray-800 p-4 rounded-md text-sm text-left justify-start items-start relative transition-transform duration-300 ease-in-out hover:scale-105">
                  {`{
        "accessToken": "new-access-token-here",
        "refreshToken": "new-refresh-token-here",
        "message": "ACCESS TOKEN REFRESHED SUCCESSFULLY!"
}`}
                  <span className="absolute top-2 right-2 text-xl hover:cursor-pointer transform transition duration-300 ease-in-out hover:scale-110" onClick={(event) => copyCode(event)}><ion-icon name="clipboard-outline"></ion-icon></span></pre>
                </div>
              </div>
            </section>

            {/* Car API Endpoints Section */}
            <section id="car-api">
              <h2 className="text-2xl font-semibold text-[#FFD700] mb-2">
                Car API Endpoints
              </h2>
              <div>
                <h3 className="text-lg font-medium">1. Get Cars</h3>
                <p className="mt-2 text-sm">
                  Endpoint: <code>GET /api/cars</code>
                </p>
                <p>
                  Description: Fetches a list of cars with pagination and
                  filtering.
                </p>
                <h4 className="text-lg font-medium mt-4">Query Parameters:</h4>
                <p className="mt-2 text-sm">
      <code>apiKey</code>: Required API key for authentication.
      <br />
      <code>page</code>: The page number (default: 1).
      <br />
      <code>limit</code>: The number of results per page (default: 10).
      <br />
      <code>Make+Name</code>: Filter by make name (e.g., Toyota, Honda).
      <br />
      <code>Model+Name</code>: Filter by model name.
      <br />
      Additional filters can be added as query parameters (details below).
    </p>
    <h4 className="text-lg font-medium mt-4">Available Filters:</h4>
    <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {filterOptions.map((filter) => (
    <li
      key={filter}
      className="animate-bounce relative group p-4 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-700 transition duration-300 hover:cursor-pointer overflow-hidden"
    >
      <p className="text-base font-medium text-center break-words">{filter}</p>
      {/* Hover div */}
      <div className="absolute inset-0 z-10 transform translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-out bg-gray-900 bg-opacity-95 text-white rounded-lg shadow-lg flex-col items-center justify-center p-2">
        <h3 className="text-lg font-bold mb-2">Usage</h3>
        <p className="text-sm text-gray-300 break-words">
          {filter.split(' ').join('+')}=some-value
        </p>
      </div>
    </li>
  ))}
</ul>



    <h4 className="text-lg font-medium mt-4">Example:</h4>
    <pre className="bg-gray-800 p-4 rounded-md text-sm text-left justify-start items-start relative transition-transform duration-300 ease-in-out hover:scale-105">
    {`/api/cars?apiKey=your-api-key&Make+Name=Toyota&Trim+Year=2020`}
      <span
        className="absolute top-2 right-2 text-xl hover:cursor-pointer"
        onClick={(event) => copyCode(event)}
      >
        <ion-icon name="clipboard-outline"></ion-icon>
      </span>
    </pre>
    <h4 className="text-lg font-medium mt-4">Response:</h4>
    <pre className="bg-gray-800 p-4 rounded-md text-sm text-left justify-start items-start relative transition-transform duration-300 ease-in-out hover:scale-105">
    {`{
        "totalResults": 100,
        "totalPages": 10,
        "currentPage": 1,
        "cars": [
              {
                    "MakeId": "1",
                    "MakeName": "Toyota",
                    "ModelId": "1",
                    "ModelName": "Corolla",
                    "TrimName": "SE",
                    "TrimYear": "2020",
                    "TrimDescription": "Sporty compact sedan",
                    "TrimMsrp": "$25,000"
              }
        ]
}`}
      <span
        className="absolute top-2 right-2 text-xl hover:cursor-pointer"
        onClick={(event) => copyCode(event)}
      >
        <ion-icon name="clipboard-outline"></ion-icon>
      </span>
    </pre>
</div>
              
            </section>

            {/* Middleware & Authorization */}
            <section id="middleware">
              <h2 className="text-2xl font-semibold text-[#FFD700] mb-2">
                Middleware and Authorization
              </h2>
              <div>
                <h3 className="text-lg font-medium">1. Verify API Key</h3>
                <p className="mt-2 text-sm">
                  Ensures that the request includes a valid <code>apiKey</code>{" "}
                  in the query or headers. This is checked on all routes under
                  <code>/api/cars</code>.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium">2. Verify JWT</h3>
                <p className="mt-2 text-sm">
                  Protects certain routes by requiring a valid JWT
                  <code>accessToken</code> for authentication.
                </p>
              </div>
            </section>

            {/* Rate Limiting */}
            <section id="rate-limiting">
              <h2 className="text-2xl font-semibold text-[#FFD700] mb-2">
                Rate Limiting
              </h2>
              <p className="text-sm">
                The API implements rate limiting to prevent abuse and ensure
                fair usage. Rate Limit Settings:
                <br /> 100 requests per 15 minutes per IP or API key.
              </p>
            </section>

            {/* Error Responses */}
            <section id="error-responses">
              <h2 className="text-2xl font-semibold text-[#FFD700] mb-2">
                Error Responses
              </h2>
              <p className="text-sm">
                For all error responses, the API will return a JSON object with
                a message describing the error. Example:
              </p>
              <pre className="bg-gray-800 p-4 rounded-md text-sm text-left justify-start items-start relative transition-transform duration-300 ease-in-out hover:scale-105">
                {`400 Bad Request:
{
        "message": "Please enter email and password."
}

401 Unauthorized:
{
        "message": "UNAUTHORIZED REQUEST"
}

500 Internal Server Error:
{
        "message": "Unexpected error occurred",
        "error": "Error details here"
}`}
              <span className="absolute top-2 right-2 text-xl hover:cursor-pointer transform transition duration-300 ease-in-out hover:scale-110" onClick={(event) => copyCode(event)}><ion-icon name="clipboard-outline"></ion-icon></span></pre>
            </section>

            {/* Conclusion Section */}
            <section id="conclusion">
              {" "}
              <h2 className="text-2xl font-semibold text-[#FFD700] mb-2">
                Conclusion
              </h2>
              <p className="text-sm">
                This API documentation provides a comprehensive guide to
                integrate and interact with the car and user services. For
                further assistance or questions, please refer to our support
                team or additional resources.
              </p>
            </section>
          </div>
        </div>
      {/* Table of Contents Sidebar */}
      <div className="w-1/4 pt-40 bg-gray-800 lg:fixed lg:h-full xs:bottom-0 xs:left-0 xs:w-full cs:absolute right-0 overflow-y-auto">
  <motion.h2
    className="text-xl font-bold text-[#FFD700] mb-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
  >Table of Contents</motion.h2>
        <motion.ul
    className="space-y-2 text-sm"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.7, ease: "easeInOut" }}
  >
          <li><a href="#base-url" className="hover:text-[#FFD700] transition-all duration-300 ease-in-out transform hover:scale-105">Base URL</a></li>
          <li><a href="#authentication" className="hover:text-[#FFD700] transition-all duration-300 ease-in-out transform hover:scale-105">Authentication & Authorization</a></li>
          <li><a href="#user-api" className="hover:text-[#FFD700] transition-all duration-300 ease-in-out transform hover:scale-105">User API Endpoints</a></li>
          <li><a href="#car-api" className="hover:text-[#FFD700] transition-all duration-300 ease-in-out transform hover:scale-105">Car API Endpoints</a></li>
          <li><a href="#middleware" className="hover:text-[#FFD700] transition-all duration-300 ease-in-out transform hover:scale-105">Middleware & Authorization</a></li>
          <li><a href="#rate-limiting" className="hover:text-[#FFD700] transition-all duration-300 ease-in-out transform hover:scale-105">Rate Limiting</a></li>
          <li><a href="#error-responses" className="hover:text-[#FFD700] transition-all duration-300 ease-in-out transform hover:scale-105">Error Responses</a></li>
          <li><a href="#conclusion" className="hover:text-[#FFD700] transition-all duration-300 ease-in-out transform hover:scale-105">Conclusion</a></li>
        </motion.ul>
      </div>
      </div>
      </div>
  );
}