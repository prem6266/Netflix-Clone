import React from 'react'
import logo from "../../logo.png"
import { Link } from 'react-router-dom'
import { CiSearch } from "react-icons/ci";

const Header = () => {
  return (
    
    <nav className="header">
      <img  src={logo} alt="Netflix" />
        <div>
            <Link to="/tvshows">TV shows</Link>
            <Link to="/Movies">Movies</Link>
            <Link to="/Recently Added">Recently Added</Link>
            <Link to="/My List">My List</Link>
        </div>
        <CiSearch />
    </nav>
  )
}

export default Header