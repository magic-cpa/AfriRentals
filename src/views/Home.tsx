import { useRef, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import background from '../assets/images/still-life-keys-new-home.jpg'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import HowToRegIcon from '@mui/icons-material/HowToReg'
import { Button } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import Location from './components/location'
import BookingDate from './components/bookingDates'
import Travelers from './components/travelers'

const destinations = [
  { name: 'Cape Town', detail: 'Coastline, culture and mountain air', image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=900&q=85' },
  { name: 'Zanzibar', detail: 'Indian Ocean island escapes', image: 'https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=900&q=85' },
  { name: 'Marrakech', detail: 'Riads, markets and desert light', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=85' },
  { name: 'Kigali', detail: 'A fresh perspective on city life', image: 'https://images.unsplash.com/photo-1596005554384-d293674c91d7?auto=format&fit=crop&w=900&q=85' },
]

const stays = [
  { name: 'The Bayview House', place: 'Cape Town, South Africa', type: 'Entire villa · 6 guests', price: '$180', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=85' },
  { name: 'Riad Sable', place: 'Marrakech, Morocco', type: 'Boutique riad · 4 guests', price: '$125', image: 'https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=1000&q=85' },
  { name: 'Nungwi Beach Bungalow', place: 'Zanzibar, Tanzania', type: 'Private bungalow · 2 guests', price: '$95', image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1000&q=85' },
]

const Home: React.FC = () => {
  const [activePopup, setActivePopup] = useState('')
  const [loadingSearch, setLoadingSearch] = useState(false)
  const [adultesCount, setAdultesCount] = useState(0)
  const [enfantsCount, setEnfantsCount] = useState(0)
  const [petChecked, setPetChecked] = useState(false)
  const [checkInDate, setCheckInDate] = useState<Dayjs>(dayjs())
  const [checkOutDate, setCheckOutDate] = useState<Dayjs>(dayjs())
  const [searchLocation, setSearchLocation] = useState('')
  const bookingRef = useRef<HTMLDivElement>(null)

  const handlePopup = (popup: string) => setActivePopup((current) => current === popup ? '' : popup)

  const handleSearchRent = (event: React.SyntheticEvent) => {
    event.preventDefault()
    setLoadingSearch(true)
    window.setTimeout(() => setLoadingSearch(false), 1000)
  }

  return (
    <div>
      <section className="relative flex min-h-[620px] items-center overflow-visible bg-cover bg-center px-5 py-20 before:absolute before:inset-0 before:bg-[#102e2a]/65" style={{ backgroundImage: `url(${background})` }}>
        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-[#f4bf77]">A place to land</p>
            <h1 className="font-serif text-4xl font-semibold leading-tight text-white sm:text-6xl">Stay awhile. Live fully.</h1>
            <p className="mt-5 max-w-2xl text-lg leading-7 text-stone-100">Find accommodation that fits the way you travel and live, from restorative weekend stays to long-term homes across Africa.</p>
          </div>

          <form className="relative z-20 mt-10" onSubmit={handleSearchRent}>
            <div className="grid gap-3 bg-white p-4 shadow-xl md:grid-cols-[1fr_1.25fr_1fr_auto]">
              <div className="relative">
                <button type="button" onClick={() => handlePopup('location')} className="flex w-full items-center gap-3 border border-stone-200 p-3 text-left">
                  <AddLocationAltIcon className="text-[#d86d43]" />
                  <span><span className="block text-xs font-bold uppercase tracking-wide text-stone-500">Destination</span><span className="block text-sm text-[#173d38]">{searchLocation || 'Where are you going?'}</span></span>
                </button>
                {activePopup === 'location' && <div className="absolute left-0 top-full z-30 mt-2 w-full min-w-[300px]"><Location searchLocation={searchLocation} setSearchLocation={setSearchLocation} /></div>}
              </div>

              <div className="relative">
                <button type="button" onClick={() => handlePopup('booking')} className="flex w-full items-center gap-3 border border-stone-200 p-3 text-left">
                  <CalendarMonthIcon className="text-[#d86d43]" />
                  <span><span className="block text-xs font-bold uppercase tracking-wide text-stone-500">Dates</span><span className="block text-sm text-[#173d38]">{checkInDate.format('MMM D')} - {checkOutDate.format('MMM D')}</span></span>
                </button>
                {activePopup === 'booking' && <div ref={bookingRef} className="date_Calender absolute left-0 top-full z-30 mt-2 bg-white p-4 shadow-lg"><BookingDate checkInDate={checkInDate} checkOutDate={checkOutDate} setCheckInDate={setCheckInDate} setCheckOutDate={setCheckOutDate} /></div>}
              </div>

              <div className="relative">
                <button type="button" onClick={() => handlePopup('travelers')} className="flex w-full items-center gap-3 border border-stone-200 p-3 text-left">
                  <HowToRegIcon className="text-[#d86d43]" />
                  <span><span className="block text-xs font-bold uppercase tracking-wide text-stone-500">Travellers</span><span className="block text-sm text-[#173d38]">{adultesCount + enfantsCount || 1} guest{adultesCount + enfantsCount === 1 ? '' : 's'}</span></span>
                </button>
                {activePopup === 'travelers' && <div className="absolute left-0 top-full z-30 mt-2 w-full min-w-[300px]"><Travelers adultesCount={adultesCount} enfantsCount={enfantsCount} petsChecked={petChecked} setAdultesCount={setAdultesCount} setEnfantsCount={setEnfantsCount} setPetChecked={setPetChecked} /></div>}
              </div>

              <Button type="submit" className="bg-[#d86d43] px-6 text-white hover:bg-[#c45d36]" startIcon={loadingSearch && <CircularProgress size={16} />} disabled={loadingSearch}>{loadingSearch ? 'Searching...' : 'Search'}</Button>
            </div>
          </form>
        </div>
      </section>

      <section id="destinations" className="bg-[#fffaf2] px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl"><p className="text-sm font-bold uppercase tracking-[0.15em] text-[#d86d43]">Explore Africa</p><h2 className="mt-2 font-serif text-4xl font-semibold text-[#173d38]">Begin with a destination</h2>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{destinations.map((destination) => <a key={destination.name} href="#stays" className="group overflow-hidden bg-white shadow-sm"><img src={destination.image} alt={destination.name} className="h-56 w-full object-cover transition duration-500 group-hover:scale-105" /><div className="p-4"><h3 className="font-serif text-2xl font-semibold text-[#173d38]">{destination.name}</h3><p className="mt-1 text-sm text-stone-600">{destination.detail}</p></div></a>)}</div>
        </div>
      </section>

      <section id="stays" className="bg-white px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl"><p className="text-sm font-bold uppercase tracking-[0.15em] text-[#d86d43]">Places with character</p><h2 className="mt-2 font-serif text-4xl font-semibold text-[#173d38]">Featured stays</h2><p className="mt-3 max-w-2xl text-stone-600">Handpicked short-term rentals and hotels for a considered stay, with the space and amenities you need.</p>
          <div className="mt-9 grid gap-7 md:grid-cols-3">{stays.map((stay) => <article key={stay.name} className="overflow-hidden border border-stone-200 bg-white"><img src={stay.image} alt={stay.name} className="h-64 w-full object-cover" /><div className="p-5"><div className="flex items-start justify-between gap-4"><div><h3 className="font-serif text-2xl font-semibold text-[#173d38]">{stay.name}</h3><p className="mt-1 text-sm text-stone-600">{stay.place}</p></div><span className="text-sm font-bold text-[#173d38]">{stay.price}<span className="font-normal text-stone-500"> / night</span></span></div><p className="mt-4 text-sm text-stone-600">{stay.type}</p></div></article>)}</div>
        </div>
      </section>

      <section id="how-it-works" className="bg-[#e8eee7] px-5 py-20 lg:px-8"><div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1fr_1.5fr]"><div><p className="text-sm font-bold uppercase tracking-[0.15em] text-[#d86d43]">More than a booking</p><h2 className="mt-2 font-serif text-4xl font-semibold text-[#173d38]">Rental decisions, made simpler.</h2></div><div className="grid gap-7 sm:grid-cols-3"><div><p className="font-serif text-3xl text-[#d86d43]">01</p><h3 className="mt-3 font-bold text-[#173d38]">Search with purpose</h3><p className="mt-2 text-sm leading-6 text-stone-600">Compare stays by location, travel dates, space and what matters to you.</p></div><div><p className="font-serif text-3xl text-[#d86d43]">02</p><h3 className="mt-3 font-bold text-[#173d38]">Know your options</h3><p className="mt-2 text-sm leading-6 text-stone-600">Review property details before you reserve a holiday stay or apply for a lease.</p></div><div><p className="font-serif text-3xl text-[#d86d43]">03</p><h3 className="mt-3 font-bold text-[#173d38]">Secure your place</h3><p className="mt-2 text-sm leading-6 text-stone-600">Move from browsing to booking with one platform built around your next chapter.</p></div></div></div></section>
    </div>
  )
}

export default Home
