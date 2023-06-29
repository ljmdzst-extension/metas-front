import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='ConteinerFooter'>
        <div className='ConteinerLinks'>
        <NavLink to={'/'}>Home</NavLink>
        <NavLink to={'/'}>Login</NavLink>
        </div>
        <div className='ConteinerContacto'>
        <p>Contacto:</p>
        <a href='mailto:evaluacion.extension@gmail.com'> evaluacion.extension@gmail.com</a>
        <p>Te: 45678910</p>
        </div>

    </div>
  )
}
