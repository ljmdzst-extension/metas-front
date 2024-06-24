const HelpScreen = () => {
	return (
		<div className='container help-page'>
			<div className='help-container'>
				<h5>
					En esta sección se encuentran instructivos y manuales relacionados al uso del Gestor de
					Proyectos de Extensión , como también reglamentos , resoluciones, cronogramas y demás
					documentos relacionados a la convocatoria vigente de proyectos de extensión AET y PEIS.
				</h5>
				<hr />
				<h5>Inicio de los Proyectos de Extensión -Conv. 2023-</h5>
				<a href='https://drive.google.com/file/d/1fav89fNGNJ91fp3QS1TIkoHrVJ3ICeit/view'>
					Informacion General de PE - Conv. 23
				</a>
				<p>
					Los siguientes modelos de notas son editables. Para poder editar, debe descargar el
					documento en su computadora.
				</p>
				<ul>
					<li>Modelo de solicitud de prórroga de PE</li>
					<li>Modelo de nota para cambios de rubros</li>
					<li>Modelo de cuadro para cambios de rubros</li>
					<li>Modelo de Carta de Intención - Entidades privadas</li>
				</ul>
				<hr />
				<h5>Disposiciones generales y reglamentos</h5>
				<p>
					En la página de la UNL, se encuentra tanto las disposiciones generales de la convocatoria
					vigente donde figura el cronograma y marco teórico de la información solicitada en los
					formularios de carga. Por otro lado también se encuentra el reglamento del Sistema
					Integrado de Programas, Prácticas y Proyectos de Extensión (S.I.P.P.P.E), donde están las
					condiciones de aceptación de una idea proyecto.
					<br /> Puede acceder a esta documentación siguiendo este enlace:{' '}
					<a href='https://www.unl.edu.ar/extension/convocatoria-2023/'>
						Disposiciones generales de la Convocatoria 2023
					</a>
					.
				</p>
			</div>
			<div className='help-gestor'>
				<p>
					Por consultas relacionadas al gestor de proyectos comunicarse con Mesa de Ayuda enviando
					un correo a: <a href='mailto:gestor.extunl@gmail.com'>gestor.extunl@gmail.com</a>
				</p>
			</div>
		</div>
	);
};

export default HelpScreen;
