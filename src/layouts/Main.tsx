import React from 'react'
import NavBar from '../components/NavBar'
import CardYear from '../components/CardYear'
export default function Main() {
  return (
    <><NavBar></NavBar>
    <div className='ConteinerCards'>
    <CardYear title='2022'></CardYear>
    <CardYear title='2023'></CardYear>
    </div>
    </>
  )
}
