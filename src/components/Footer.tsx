import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='ConteinerFooter'>
        <div className='ConteinerLinks'>
        <NavLink to={'/'} style={{color:"black",textDecoration:"none"}}>Home</NavLink>
        <NavLink to={'/'} style={{color:"black",textDecoration:"none"}}>Login</NavLink>
        </div>
        <div className='ConteinerContacto'>
        <p style={{margin:"0",fontWeight:"bolder"}}>Contacto:</p>
        <a href='mailto:evaluacion.extension@gmail.com'  style={{color:"black",textDecoration:"none"}}> evaluacion.extension@gmail.com</a>
        <p>Te: 45678910</p>
        </div>

    </div>
  )
}
