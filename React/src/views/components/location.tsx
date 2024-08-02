import react from 'react'
import SearchIcon from '@mui/icons-material/Search';

const Location = function(){
    return(
        <>
        <div className="flex justify-center items-center p-4 bg-gray-100">
      <div className="relative w-full max-w-md">
            <input
             type="text"
            className="w-full pl-10 pr-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Search location"/>
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
        </div>
        </>
    )
}
export default Location