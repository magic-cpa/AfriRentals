import {useState, useEffect} from 'react'
import background from '../assets/images/still-life-keys-new-home.jpg'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

 const backgroundImageStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', // Full viewport height
    width: '100%'    // Full width
};

const Home = function(){
    return(
        <>
        <div style={backgroundImageStyle} className="flex items-center justify-center">
      <div className="flex gap-4 bg-white bg-opacity-75 p-8 rounded-lg shadow-lg">
        {/* Where to go */}
        <div className="mb-4">
            <AddLocationAltIcon/>
          <input
            id="destination"
            type="text"
            placeholder="Enter your destination"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Booking dates */}
        <div className="mb-4">
          <input
            id="dates"
            type="text"
            placeholder="Select dates"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Travelers */}
        <div className="mb-4">
          <input
            id="travelers"
            type="number"
            placeholder="Number of travelers"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <button
          type="submit"
          className="w-28 bg-indigo-600 text-white p-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          Search
        </button>
      </div>
    </div>
        </>
    )
}
export default Home; 