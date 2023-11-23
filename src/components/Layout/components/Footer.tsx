import { NavLink } from 'react-router-dom';
import logoUNL from '../../../assets/unl_identidad.svg';

// enlace a pagina de ayuda

// Seccion de contactos
// Área Proyectos de Extensión Tel: (0342) 4575136 Int. 108 /109
// Correo Electrónico : proyectosextensionunl@gmail.com
// Evaluacion de Proyectos de Extensión Tel: (0342) 45678910
// Correo Electrónico : evaluacion.extension@gmail.com

export default function Footer() {
	return (
		<div className='bg-color-secondary'>
			<div className='d-flex justify-content-between align-items-center py-3 container'>
				<div className='d-flex align-items-center pe-2'>
					<img src={logoUNL} alt='logo UNL' style={{ width: '2.5rem', height: '2.5rem' }} />
				</div>
				<div className='d-flex  '>
					<NavLink to='/ayuda' className='text-white text-decoration-none'>
						<h6 className='text-white mb-0 ms-3' style={{ fontSize: '0.8rem' }}>
							Ayuda
						</h6>
					</NavLink>
					<div className='d-flex '>
						<h6 className='text-white mb-0 ms-3 border-end pe-3' style={{ fontSize: '0.8rem' }}>
							Contactos
						</h6>
						<div >
							<p className='text-white mb-0 ms-3' style={{ fontSize: '0.7rem' }}>
								Área Proyectos de Extensión
							</p>
							<p className='text-white mb-0 ms-3' style={{ fontSize: '0.7rem' }}>
								Tel: (0342) 4575136 Int. 108 /109
							</p>
							<p className='text-white mb-0 ms-3' style={{ fontSize: '0.7rem' }}>
								Correo Electrónico:{' '}
								<a
									href='mailto:proyectosextensionunl@gmail.com'
									style={{ color: 'white', textDecoration: 'underline' }}
								>
									proyectosextensionunl@gmail.com
								</a>
							</p>
						</div>
						<div>
							<p className='text-white mb-0 ms-3' style={{ fontSize: '0.7rem' }}>
								Evaluacion de Proyectos de Extensión
							</p>
							<p className='text-white mb-0 ms-3' style={{ fontSize: '0.7rem' }}>
								Tel: (0342) 45678910
							</p>
							<p className='text-white mb-0 ms-3' style={{ fontSize: '0.7rem' }}>
								Correo Electrónico:{' '}
								<a
									href='mailto:evaluacion.extension@gmail.com'
									style={{ color: 'white', textDecoration: 'underline' }}
								>
									evaluacion.extension@gmail.com
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
