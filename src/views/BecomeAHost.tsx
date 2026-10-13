import { Link } from 'react-router-dom'

const hostSteps = [
  ['Tell us about your place', 'Share the essentials: location, property type, rooms and the details that make it special.'],
  ['Set your availability', 'Choose when guests can book and how you want to welcome them. You stay in control.'],
  ['Welcome your guests', 'Use one place to manage requests, reservations and the rhythm of hosting.'],
]

const BecomeAHost: React.FC = () => {
  return (
    <div>
      <section className="bg-[#173d38] px-5 py-20 text-white lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div><p className="text-sm font-bold uppercase tracking-[0.2em] text-[#f4bf77]">Host with AfriRentals</p><h1 className="mt-4 max-w-xl font-serif text-5xl font-semibold leading-tight sm:text-6xl">Open your door to more possibility.</h1><p className="mt-6 max-w-xl text-lg leading-8 text-stone-200">Turn a spare room, holiday home or rental property into a welcoming stay. AfriRentals helps you reach travellers looking for a meaningful place to land.</p><Link to="/authentication/signup" className="mt-8 inline-block bg-[#d86d43] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#c45d36]">Start listing your place</Link></div>
          <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85" alt="A welcoming, light-filled living room" className="h-[360px] w-full object-cover sm:h-[460px]" />
        </div>
      </section>

      <section className="bg-[#fffaf2] px-5 py-20 lg:px-8"><div className="mx-auto max-w-7xl"><p className="text-sm font-bold uppercase tracking-[0.15em] text-[#d86d43]">Hosting, made human</p><h2 className="mt-2 max-w-xl font-serif text-4xl font-semibold text-[#173d38]">Share your space on your terms.</h2><div className="mt-10 grid gap-8 md:grid-cols-3">{hostSteps.map(([title, copy], index) => <div key={title} className="border-t-2 border-[#d86d43] pt-5"><p className="font-serif text-3xl text-[#d86d43]">0{index + 1}</p><h3 className="mt-4 text-lg font-bold text-[#173d38]">{title}</h3><p className="mt-3 text-sm leading-6 text-stone-600">{copy}</p></div>)}</div></div></section>

      <section className="bg-white px-5 py-20 text-center lg:px-8"><div className="mx-auto max-w-2xl"><p className="text-sm font-bold uppercase tracking-[0.15em] text-[#d86d43]">Your home, your story</p><h2 className="mt-3 font-serif text-4xl font-semibold text-[#173d38]">Ready when you are.</h2><p className="mt-4 text-stone-600">Join a growing community of hosts creating thoughtful stays across Africa.</p><Link to="/authentication/signup" className="mt-7 inline-block bg-[#173d38] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#285a51]">Become a host</Link></div></section>
    </div>
  )
}

export default BecomeAHost
