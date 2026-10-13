import type React from 'react'
import { Link } from 'react-router-dom'

interface SignInFormProps {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  formData: {
    email: string
    password: string
  }
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SignInForm: React.FC<SignInFormProps> = ({ handleSubmit, formData, onInputChange }) => {
  return (
    <section className="min-h-[calc(100vh-72px)] bg-[#e8eee7] px-5 py-12 lg:px-8">
      <div className="mx-auto grid max-w-6xl overflow-hidden bg-white shadow-xl md:grid-cols-[1.05fr_0.95fr]">
        <div className="flex min-h-[360px] flex-col justify-end bg-[#173d38] p-8 text-white md:min-h-[620px] md:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f4bf77]">Welcome back</p>
          <h1 className="mt-4 max-w-md font-serif text-4xl font-semibold leading-tight sm:text-5xl">Your next place is waiting.</h1>
          <p className="mt-5 max-w-md text-base leading-7 text-stone-200">Sign in to manage your trips, saved homes and rental applications in one calm place.</p>
          <Link to="/become-a-host" className="mt-8 text-sm font-bold text-[#f4bf77] underline underline-offset-4">Thinking of hosting? Start here</Link>
        </div>

        <div className="p-7 sm:p-10 md:p-12">
          <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#d86d43]">Member access</p>
          <h2 className="mt-2 font-serif text-4xl font-semibold text-[#173d38]">Sign in</h2>
          <p className="mt-3 text-sm leading-6 text-stone-600">Use the email address connected to your AfriRentals account.</p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="block text-sm font-bold text-[#173d38]">Email address
              <input required type="email" id="email" name="email" value={formData.email} onChange={onInputChange} autoComplete="email" className="mt-2 block w-full border border-stone-300 bg-white px-4 py-3 text-base text-stone-900 outline-none transition focus:border-[#d86d43] focus:ring-1 focus:ring-[#d86d43]" />
            </label>
            <label className="block text-sm font-bold text-[#173d38]">Password
              <input required type="password" id="password" name="password" value={formData.password} onChange={onInputChange} autoComplete="current-password" className="mt-2 block w-full border border-stone-300 bg-white px-4 py-3 text-base text-stone-900 outline-none transition focus:border-[#d86d43] focus:ring-1 focus:ring-[#d86d43]" />
            </label>
            <button type="submit" className="w-full bg-[#d86d43] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#c45d36] focus:outline-none focus:ring-2 focus:ring-[#d86d43] focus:ring-offset-2">Sign in</button>
          </form>
          <p className="mt-7 text-sm text-stone-600">New to AfriRentals? <Link to="/authentication/signup" className="font-bold text-[#173d38] underline underline-offset-4">Create an account</Link></p>
        </div>
      </div>
    </section>
  )
}

export default SignInForm
