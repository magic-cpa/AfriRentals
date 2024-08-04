import {useState, useRef, useEffect} from 'react'
import dayjs, { Dayjs } from 'dayjs';
import background from '../assets/images/still-life-keys-new-home.jpg'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { Button } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Location from './components/location';
import BoookingDate from './components/bookingDates';
import Travelers from './components/travelers';
import { DataStrategyMatch } from '@remix-run/router/dist/utils';

 const backgroundImageStyle = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh', // Full viewport height
    width: '100%'    // Full width
};

const Home = function(){
    const [activePopup, setActivePopup] = useState('');
    const [checkInDate, setCheckInDate] = useState<Dayjs>(dayjs())
    const [checkOutDate,setCheckOutDate] = useState<Dayjs>(dayjs())
    const [loadingSearch, setLoadingSearch] = useState(false)
    const bookingRef = useRef<HTMLDivElement>(null)

    const handlePopup = (popup: string) => {
      setActivePopup((prev) => (prev === popup ? '' : popup));
    };
  

    const HandleSearchRent = async (e:React.SyntheticEvent)=>{
      e.preventDefault()
      setLoadingSearch(true)
      console.log('event passed')

      setTimeout(()=>{
        setLoadingSearch(false)
      },2000)
    }

    return(
        <>
    {/* Background */}
    <div style={backgroundImageStyle} className="flex items-center justify-center">
    <form className='search_rental' onSubmit={HandleSearchRent}>
      <div className="main_searching_bar flex gap-4 bg-white bg-opacity-75 p-8 rounded-lg shadow-lg" >
        
      <div className="relative w-full">
      {/* Where to go */}
      <div className="list_search flex justify-center items-center borde" onClick={() => handlePopup('location')}>
            <div className='block w-full border border-grey-400 rounded-sm p-2'>
                <div className="flex items-center mb-2">
            <AddLocationAltIcon style={{ fontSize: '2rem' }} className="mr-2 text-gray-600" />
            <div className='search_asset'>
              <label>Destination</label>
              <input
                id="destination"
                type="text"
                placeholder="Enter your destination"
                className="hidden"
                readOnly
              />
            </div>
          </div>
        </div>
      </div>

      {/* Popup positioned directly below "Where to go" */}
      {activePopup === 'location' && (
          <div className="absolute left-0 top-full mt-2 w-full">
            <Location />
          </div>
      )}
    </div>

        {/* Booking dates */}
        <div className="relative w-full">
        <div className="list_search flex justify-center items-center borde" onClick={() => handlePopup('booking')}>
            <div className='block w-full border border-grey-400 rounded-sm p-2'>
            <div className="flex items-center mb-2">
            <CalendarMonthIcon style={{fontSize:'2rem'}} className="mr-2 text-gray-600"/>
            <div className='search_asset'>
              <label className="text-xs">dates de réservation</label>
              <input
                id="date_debut"
                type="hidden"
                placeholder="Select dates"
                className="hidden"
                value={checkInDate.format('YYYY-MM-DD')}
                readOnly
              />
              <input
                id="date_fin"
                type="hidden"
                placeholder="Select dates"
                className="hidden"
                value={checkOutDate.format('YYYY-MM-DD')}
                readOnly
              />
            </div>
            </div>
          </div>
        </div>
        {activePopup === 'booking' && (
          <div ref={bookingRef} className="date_Calender absolute left-0 top-full mt-2 w-full bg-white p-4 rounded-lg shadow-lg z-10">
            <BoookingDate 
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
                setCheckInDate={setCheckInDate}
                setCheckOutDate={setCheckOutDate} />
          </div>
        )}
        </div>

        {/* Travelers */}
        <div className="relative w-full">
        <div className="list_search flex justify-center items-center borde" onClick={() => handlePopup('travelers')}>
            <div className='block border border-grey-400 rounded-sm p-2'>
                <div className="flex items-center mb-2">
                    <HowToRegIcon style={{fontSize:'2rem'}} className="mr-2 text-gray-600"/>
                    <div className='search_asset'>
                      <label className="text-xs">Nombre de voyageurs</label>
                        <input type="text" id="travelers"
                        className="hidden"
                        value="3 travelers"
                        readOnly/>
                      <span
                        data-stid="open-room-picker" aria-expanded="true"
                        aria-label="Travelers, 3 travelers"
                        className="uitk-menu-trigger open-traveler-picker-observer-root uitk-fake-input uitk-form-field-trigger"
                        >3 voyageurs
                      </span>
                    </div>
                </div>
            </div>
            {activePopup === 'travelers' && (
              <div className="absolute left-0 top-full mt-2 w-full">
                <Travelers />
              </div>
            )}
        </div>
        </div>

        {/* search button */}
        <Button
          type="submit"
          className="w-28 bg-indigo-600 text-white p-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          startIcon={loadingSearch && <CircularProgress size={16} />}
          disabled={loadingSearch}
        >
          {loadingSearch ? 'Loading...' : 'Search'}
        </Button>
        
      </div>
      </form>
    </div>

    
    
        </>
    )
}
export default Home; 