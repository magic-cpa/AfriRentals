import type React from 'react'
import { Link } from 'react-router-dom'

interface SignUpFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  formData: {
    firstName: string
    lastName: string
    email: string
    dateOfBirth: string
    password: string
    confirmPassword: string
  }
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SignUpForm: React.FC<SignUpFormProps> = ({ handleSubmit, formData, onInputChange }) => {
  return (
    <section className="min-h-[calc(100vh-72px)] bg-[#fffaf2] px-5 py-12 lg:px-8">
      <div className="mx-auto grid max-w-6xl overflow-hidden bg-white shadow-xl md:grid-cols-[0.9fr_1.1fr]">
        <div className="flex min-h-[360px] flex-col justify-end bg-[#d86d43] p-8 text-white md:min-h-[720px] md:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#fff1d5]">Join AfriRentals</p>
          <h1 className="mt-4 max-w-md font-serif text-4xl font-semibold leading-tight sm:text-5xl">A better way to find your place.</h1>
          <p className="mt-5 max-w-md text-base leading-7 text-orange-50">Save the stays you love, organise your rental plans and move forward with clarity.</p>
          <Link to="/become-a-host" className="mt-8 text-sm font-bold text-white underline underline-offset-4">Have a space to share? Become a host</Link>
        </div>

        <div className="p-7 sm:p-10 md:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#d86d43]">Create your account</p>
          <h2 className="mt-2 font-serif text-4xl font-semibold text-[#173d38]">Start exploring</h2>
          <p className="mt-3 text-sm leading-6 text-stone-600">Set up your profile to book stays and keep your housing search organised.</p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-bold text-[#173d38]">First name<input required autoFocus autoComplete="given-name" type="text" id="firstName" name="firstName" value={formData.firstName} onChange={onInputChange} className="mt-2 block w-full border border-stone-300 px-4 py-3 text-base outline-none transition focus:border-[#d86d43] focus:ring-1 focus:ring-[#d86d43]" /></label>
              <label className="block text-sm font-bold text-[#173d38]">Last name<input required autoComplete="family-name" type="text" id="lastName" name="lastName" value={formData.lastName} onChange={onInputChange} className="mt-2 block w-full border border-stone-300 px-4 py-3 text-base outline-none transition focus:border-[#d86d43] focus:ring-1 focus:ring-[#d86d43]" /></label>
            </div>
            <label className="block text-sm font-bold text-[#173d38]">Email address<input required autoComplete="email" type="email" id="email" name="email" value={formData.email} onChange={onInputChange} className="mt-2 block w-full border border-stone-300 px-4 py-3 text-base outline-none transition focus:border-[#d86d43] focus:ring-1 focus:ring-[#d86d43]" /></label>
            <label className="block text-sm font-bold text-[#173d38]">Date of birth<input required type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={onInputChange} className="mt-2 block w-full border border-stone-300 px-4 py-3 text-base outline-none transition focus:border-[#d86d43] focus:ring-1 focus:ring-[#d86d43]" /></label>
            <label className="block text-sm font-bold text-[#173d38]">Password<input required autoComplete="new-password" type="password" id="password" name="password" value={formData.password} onChange={onInputChange} className="mt-2 block w-full border border-stone-300 px-4 py-3 text-base outline-none transition focus:border-[#d86d43] focus:ring-1 focus:ring-[#d86d43]" /></label>
            <label className="block text-sm font-bold text-[#173d38]">Confirm password<input required autoComplete="new-password" type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={onInputChange} className="mt-2 block w-full border border-stone-300 px-4 py-3 text-base outline-none transition focus:border-[#d86d43] focus:ring-1 focus:ring-[#d86d43]" /></label>
            <button type="submit" className="w-full bg-[#173d38] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#285a51] focus:outline-none focus:ring-2 focus:ring-[#173d38] focus:ring-offset-2">Create account</button>
          </form>
          <p className="mt-7 text-sm text-stone-600">Already have an account? <Link to="/authentication/signin" className="font-bold text-[#173d38] underline underline-offset-4">Sign in</Link></p>
        </div>
      </div>
    </section>
  )
}

export default SignUpForm
