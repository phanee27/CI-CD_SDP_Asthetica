import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'

import Navbar from './navbar/Navbar';

function App() {

  return (

    <div>
      <BrowserRouter>
        <Navbar/>
      </BrowserRouter>
    </div>
  )
}

export default App
