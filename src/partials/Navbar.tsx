import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'

const navigation = [
  { name: 'Explore stays', href: '#stays' },
  { name: 'Destinations', href: '#destinations' },
  { name: 'How it works', href: '#how-it-works' },
]

const Navbar = () => {
  return (
    <Disclosure as="nav" className="sticky top-0 z-30 border-b border-stone-200 bg-[#fffdf8]/95 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-[#173d38]" aria-label="AfriRentals home">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#d86d43] font-serif text-lg font-bold text-white">A</span>
          <span className="font-serif text-2xl font-semibold tracking-wide">AfriRentals</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {navigation.map((item) => (
            <a key={item.name} href={item.href} className="text-sm font-semibold text-stone-600 transition hover:text-[#d86d43]">
              {item.name}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Link to="/authentication/signin" className="text-sm font-semibold text-[#173d38]">Sign in</Link>
          <Link to="/host/bookings" className="text-sm font-semibold text-[#173d38]">Host bookings</Link>
          <Link to="/become-a-host" className="rounded-md bg-[#173d38] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#285a51]">Become a host</Link>
        </div>

        <div className="md:hidden">
          <DisclosureButton className="group inline-flex items-center justify-center rounded-md p-2 text-[#173d38] hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-[#d86d43]">
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
            <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
          </DisclosureButton>
        </div>
      </div>

      <DisclosurePanel className="border-t border-stone-200 bg-[#fffdf8] px-5 py-4 md:hidden">
        <div className="flex flex-col gap-3">
          {navigation.map((item) => <a key={item.name} href={item.href} className="text-sm font-semibold text-stone-700">{item.name}</a>)}
          <Link to="/authentication/signin" className="text-sm font-semibold text-[#173d38]">Sign in</Link>
          <Link to="/become-a-host" className="text-sm font-semibold text-[#d86d43]">Become a host</Link>
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}

export default Navbar
