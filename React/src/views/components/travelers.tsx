import {useState} from 'react'

const Travelers = function(){
    const [adultesCount, setAdultesCount] = useState(0);
    const [enfantsCount, setEnfantsCount] = useState(0);
    const incrementAdultes = () => setAdultesCount(adultesCount + 1)
    const decrementAdultes = () => setAdultesCount(adultesCount > 0 ? adultesCount - 1 : 0)
  
    const incrementEnfants = () => setEnfantsCount(enfantsCount + 1)
    const decrementEnfants = () => setEnfantsCount(enfantsCount > 0 ? enfantsCount - 1 : 0)
    return(
        <>
        <div className="flex justify-center items-center p-4 bg-gray-100">
      <div className="sets_category_travelers w-full">
        {/* Adultes Counter */}
        <div className="travelers_type flex items-center justify-between">
          <div className='flex flex-col'>
            <label className="text-sm mr-2">Adultes</label>
            <span>13 ans ou plus</span>
          </div>
          <div>
          <button
            className="px-2 py-1 bg-gray-300 rounded"
            onClick={decrementAdultes}>
            -
          </button>
          <span className="mx-2">{adultesCount}</span>
          <button
            className="px-2 py-1 bg-gray-300 rounded"
            onClick={incrementAdultes}>
            +
          </button>
          </div>
        </div>

        {/* Enfants Counter */}
        <div className="travelers_type flex items-center justify-between mt-4">
            <div className='flex flex-col'>
              <label className="text-sm mr-2">Enfants</label>
          
              <span>2 à 12 ans </span></div>
            <div>
          <button
            className="px-2 py-1 bg-gray-300 rounded"
            onClick={decrementEnfants}>
            -
          </button>
          <span className="mx-2">{enfantsCount}</span>
          <button
            className="px-2 py-1 bg-gray-300 rounded"
            onClick={incrementEnfants}>
            +
          </button>
          
          </div>
        </div>
        <div className="mt-2">
          <div className="mb-2">
            <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 cursor-pointer" />
            <label className="ml-2 text-gray-800">Je voyage avec des animaux de compagnie</label>
          </div>
          <span className="ml-1 text-xs text-gray-600">
            Si cette case est cochée, seuls les établissements qui acceptent les animaux de compagnie seront affichés
          </span>
        </div>
      </div>
    </div>
        </>
    )
}
export default Travelers