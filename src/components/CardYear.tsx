import React from 'react'
import { useState } from 'react';

export default function CardYear(props:{ title: string}) {
    const programas = [ 'Programa Intervención Sociocultural', 
                        'Programa de Integración de Funciones', 
                        'Programa de Formación y Capacitación', 
                        'Programa de publicaciones', 
                        'Áreas Estratégicas',
                        'Programas de extensión (SIPPE)'];
        const [isMenuOpen, setIsMenuOpen] = useState(false);
      
        const handleCardClick = () => {
          setIsMenuOpen(!isMenuOpen);
        };

  return (
    <div className='ConteinerCardMenu'>
        <div className="card" onClick={handleCardClick}>
        <img className="imgCard" src="" alt="imagen carta" />
        {props.title}
        </div>
        {isMenuOpen && (
        <div className="menu">
          {programas.map((item, index) => (
            <div className="programa" key={index}>{item}</div>
          ))}
        </div>
      )}
    </div>
   
  )
}
