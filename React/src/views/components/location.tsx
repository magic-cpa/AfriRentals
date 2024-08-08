import react, { useState,useEffect } from 'react'
import mapboxgl from '@mapbox/mapbox-sdk/services/geocoding';
import SearchIcon from '@mui/icons-material/Search';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import SearchResult from './sub-components/search_location_result';


interface LocationProps {
    searchLocation: string,
    setSearchLocation: React.Dispatch<React.SetStateAction<string>>
}

const Location:React.FC<LocationProps> = function({searchLocation,setSearchLocation}){
    const geoCodingClient = mapboxgl({accessToken:'pk.eyJ1Ijoia2V2aW4tbWFrLXlhemlkIiwiYSI6ImNsemtndWxqazB4NXgybXMxdWdyYjhmc2EifQ.EOt67ew0Mu3ZRW4flK4jQA'})
    const [searchResults, setSearchResults]=  useState<any[]>([])

    useEffect(() => {
        if (searchLocation.trim() !== '') {
            handleSearching(searchLocation);
        } else {
          setSearchResults([]);
        }
      }, [searchLocation]);

    const handleSearching= async (query: string)=>{
        try{
            const response = await geoCodingClient.forwardGeocode({
                query: query,
                limit: 5, 
                types: ['place']
            }).send()
            setSearchResults(response.body.features);
        }catch(error){
            console.error('Error fetching location:', error)
        }
    }
    return(
        <>
        <div className="flex justify-center items-center bg-white">
            <div className='dest_disply w-full'>
            <div className="relative w-full max-w-md">
                <input
                type="text"
                className="w-full border border-gray-300 p-2 pl-10 rounded-lg shadow-sm focus:outline-none"
                placeholder="Search location"
                onChange={(e)=>setSearchLocation(e.target.value)}
                onBlur={() => handleSearching(searchLocation)}
                value={searchLocation}/>
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>

            {/* search destination results */}
            <div className="search_box p-4 bg-gray-100 rounded-lg flex items-center space-x-4">
                <div className="flex items-center space-x-4">
                    <TravelExploreIcon className="text-blue-500 text-2xl" />
                    <h2 className="text-lg font-semibold text-gray-800">
                        Rechercher par destination, hébergement ou point de repère
                    </h2>
                </div>
                {/* Conditional rendering based on search results */}
            {searchResults.length > 0 && (
            <div className="search-results-container">
                <SearchResult results={searchResults} setSearchLocation={setSearchLocation} />
            </div>
            )}
            {/* No results message */}
            {searchLocation.trim() !== '' && searchResults.length === 0 && (
                <div className="no-results">No results found</div>
            )}
            </div>

            </div>
        </div>
        </>
    )
}
export default Location