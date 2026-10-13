import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-[#173d38] px-5 py-10 text-stone-200 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="font-serif text-2xl font-semibold text-white">AfriRentals</div>
          <p className="mt-3 max-w-sm text-sm leading-6 text-stone-300">Thoughtful places to stay across Africa, from a weekend escape to the home you will settle into.</p>
        </div>
        <div>
          <p className="text-sm font-bold text-white">Discover</p>
          <div className="mt-3 flex flex-col gap-2 text-sm"><a href="#destinations">Destinations</a><a href="#stays">Stays</a><a href="#how-it-works">How it works</a></div>
        </div>
        <div>
          <p className="text-sm font-bold text-white">For members</p>
          <div className="mt-3 flex flex-col gap-2 text-sm"><Link to="/become-a-host">Become a host</Link><Link to="/authentication/signin">Sign in</Link><a href="mailto:hello@afrirentals.com">Contact us</a></div>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-7xl border-t border-white/15 pt-5 text-xs text-stone-400">© 2026 AfriRentals. Find your place, wherever life takes you.</div>
    </footer>
  )
}

export default Footer
