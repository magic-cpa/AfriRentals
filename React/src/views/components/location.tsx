import react from 'react'
import SearchIcon from '@mui/icons-material/Search';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

const Location = function(){
    return(
        <>
        <div className="flex justify-center items-center bg-white">
            <div className='dest_disply w-full'>
            <div className="relative w-full max-w-md">
                <input
                type="text"
                className="w-full border border-gray-300 p-2 pl-10 rounded-lg shadow-sm focus:outline-none"
                placeholder="Search location"/>
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            <div className="p-4 bg-gray-100 rounded-lg flex items-center space-x-4">
                <TravelExploreIcon className="text-blue-500 text-2xl" />
                <h2 className="text-lg font-semibold text-gray-800">
                Rechercher par destination, hébergement ou point de repère
                </h2>
            </div>
            </div>
        </div>
        </>
    )
}
export default Location