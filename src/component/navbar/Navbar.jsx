import React from 'react'
import { Link } from 'react-router-dom'

//CSS Import
import "./Navbar.css"
function Navbar() {
  return (
 
      <section id='nav'>
            <ul>
                 <Link to="/"><li>Add Note</li></Link>
                 <Link to="/notes"><li>Notes</li></Link>
                 <Link to="/admin"><li>Admin</li></Link>
                 
            </ul>
      </section>
 
  )
}

export default Navbar
