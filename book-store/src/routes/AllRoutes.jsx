import React from 'react'
import { Routes , Route } from 'react-router-dom'
import Content from '../components/Content'
import RegisterForm from '../components/Registration'
import NoPage from '../components/ErrorPage'
import About from '../components/About'

const AllRoutes = () => {
  return (
    <>
        <Routes>
            <Route path='/' element={<Content />} />
            <Route path='/registerForm' element={<RegisterForm />} />
            <Route path="*" element={<NoPage />} />
            <Route path='/registersuccess' element={<Content />}/>
            <Route path='/about' element={<About />}></Route>
        </Routes>
    </>
  )
}

export default AllRoutes