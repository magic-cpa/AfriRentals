import react from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../partials/Navbar'
import Footer from '../partials/Footer'

const MainLayout = ()=>{
    return(
        <>
        <div className='flex flex-col min-h-screen'>
            <Navbar/>
              <main className="flex-grow"> 
                <Outlet/>
              </main> 
        
        </div>
        </>
    )
}
export default MainLayout