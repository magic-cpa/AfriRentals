// SearchResult.tsx
import React from 'react';
import FmdGoodIcon from '@mui/icons-material/FmdGood';

interface SearchResultProps {
  results: any[]; // Replace any with actual type if possible
  setSearchLocation: React.Dispatch<React.SetStateAction<string>>;
}

const SearchResult: React.FC<SearchResultProps> = ({ results, setSearchLocation }) => {
  const handleSelectLocation = (location: any) => {
    setSearchLocation(location.place_name); // Update searchLocation with selected location
  };

  return (
    <>
    <ul className="search-results w-full">
      {results.map((result) => (
        
        <li className="py-2 px-4 hover:bg-gray-200 cursor-pointer" 
            key={result.id} onClick={() => handleSelectLocation(result)}>
            <FmdGoodIcon/>{result.place_name}
        </li>
      ))}
    </ul>
    </>
  );
};

export default SearchResult;
