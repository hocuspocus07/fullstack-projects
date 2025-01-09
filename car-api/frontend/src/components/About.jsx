import React from 'react';

function About() {
  return (
    <div className="h-screen w-screen text-white flex flex-col xs:items-center xs:justify-center">
      <section className="flex flex-col justify-start items-start w-3/4 max-w-4xl px-8 sm:px-16 lg:px-32 py-12 space-y-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          About VrooomAPI
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
          The VrooomAPI is your gateway to a comprehensive dataset of car-related information. Effortlessly fetch data filtered by parameters like Make, Model, Year, and more. Seamlessly integrate with your applications using authenticated API access.
        </p>
      </section>
      
      <div className="flex flex-col lg:flex-row justify-start lg:justify-end w-full sm:px-16 space-y-6 lg:space-y-0 lg:space-x-6 animate-float">
        <div className="lg:w-1/3 py-6 rounded-lg border border-white px-4 sm:px-6 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-white">Getting Started</h2>
          <ol className="list-decimal list-inside text-gray-300 space-y-2 text-lg sm:text-xl">
            <li>Register to create an account.</li>
            <li>Log in with your credentials.</li>
            <li>Obtain your API key to access our dataset and endpoints!</li>
          </ol>
          <p className="text-gray-400 mt-4">
            See Docs for more information on how to use the VrooomAPI.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
