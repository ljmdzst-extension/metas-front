import React from 'react';
import { Card, Col } from 'react-bootstrap';

interface CardProps {
	title: string;
	info: string | number;
	buttonLabel?: string;
	onButtonClick?: () => void;
	link?: { href: string; text: string };
	variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'; // Variantes de color
	textColor?: string; // Color personalizado para el texto
	customButton?: React.ReactNode; // Botón personalizado
	centerText?: boolean; // Prop para centrar el texto
	infoFontSize?: string; // Tamaño personalizado para el font-size de "info"
}

const InfoCard: React.FC<CardProps> = ({
	title,
	info,
	buttonLabel,
	onButtonClick,
	link,
	variant = 'light',
	textColor = variant === 'light' ? 'dark' : 'white',
	customButton,
	centerText = false,
	infoFontSize = '1rem', // Tamaño de fuente por defecto para "info"
}) => {
	const textAlignmentClass = centerText ? 'text-center' : '';

	return (
		<Col md={4} className='mb-4'>
			<Card className={`h-100 shadow-sm bg-${variant}`}>
				<Card.Body className={`d-flex flex-column justify-content-between ${textAlignmentClass}`}>
					<Card.Title style={{ color: textColor }}>{title}</Card.Title>
					<Card.Text style={{ color: textColor, fontSize: infoFontSize }}>
						<p>{info}</p>
					</Card.Text>

					{link && (
						<Card.Text>
							<a
								href={link.href}
								target='_blank'
								rel='noopener noreferrer'
								style={{ color: textColor }}
							>
								{link.text}
							</a>
						</Card.Text>
					)}

					{customButton
						? customButton
						: buttonLabel &&
						  onButtonClick && (
								<button
									className={`btn btn-${variant === 'light' ? 'primary' : 'light'}`}
									onClick={onButtonClick}
								>
									{buttonLabel}
								</button>
						  )}
				</Card.Body>
			</Card>
		</Col>
	);
};

export default InfoCard;
