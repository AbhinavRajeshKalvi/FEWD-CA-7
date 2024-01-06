import React from 'react'
import Content from './Content'
import { Link } from 'react-router-dom'
import Search from './Search'
import RegisterForm from './Registration'
import logo from "../assets/logo.png"


const Navbar = () => {
  return (
    <div className='navbar'>

        <img width={"200vw"} src={logo}/>
        <Link to='/'><button>Home</button></Link>
        <Link to="/about"> <button>About</button></Link>
        <Link className='register' to="/registerForm" style={{textDecoration:"none"}} > <button>Register</button> </Link>

    </div>
  )
}

export default Navbar