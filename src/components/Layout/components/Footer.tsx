import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Footer() {
	return (
		<div className='bg-color-secondary'>
			<div className='d-flex justify-content-between align-items-center py-3 container'>
				<div>
					<NavLink to={'/'} style={{ color: 'white', textDecoration: 'none', marginRight: '20px' }}>
						Home
					</NavLink>
					<NavLink to={'/'} style={{ color: 'white', textDecoration: 'none' }}>
						Login
					</NavLink>
				</div>
				<div className=''>
					<p style={{ color: 'white', margin: '0', fontWeight: 'bolder' }}>Contacto:</p>
					<a
						href='mailto:evaluacion.extension@gmail.com'
						style={{ color: 'white', textDecoration: 'none' }}
					>
						evaluacion.extension@gmail.com
					</a>
					<p style={{ color: 'white' }}>Tel: 45678910</p>
				</div>
			</div>
		</div>
	);
}
