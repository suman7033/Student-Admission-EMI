import React from 'react'
import AllRoutes from './Routes/AllRoutes'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <div className='bg-[#f5f3f3]'>
    <AllRoutes className=''/>
      <ToastContainer
      className={"text-xs"}/>
    </div>
  )
}

export default App
