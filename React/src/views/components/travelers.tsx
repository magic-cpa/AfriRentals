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
      <div className="sets_category_travelers">
        {/* Adultes Counter */}
        <div className="travelers_type flex items-center">
          <label className="mr-2">Adultes</label>
          <button
            className="px-2 py-1 bg-gray-300 rounded"
            onClick={decrementAdultes}
          >
            -
          </button>
          <span className="mx-2">{adultesCount}</span>
          <button
            className="px-2 py-1 bg-gray-300 rounded"
            onClick={incrementAdultes}
          >
            +
          </button>
        </div>

        {/* Enfants Counter */}
        <div className="travelers_type flex items-center mt-4">
          <label className="mr-2">Enfants</label>
          <button
            className="px-2 py-1 bg-gray-300 rounded"
            onClick={decrementEnfants}
          >
            -
          </button>
          <span className="mx-2">{enfantsCount}</span>
          <button
            className="px-2 py-1 bg-gray-300 rounded"
            onClick={incrementEnfants}
          >
            +
          </button>
        </div>
      </div>
    </div>
        </>
    )
}
export default Travelers