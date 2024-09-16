import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';

interface CardProps {
	title?: string; // Make title optional
	info?: string | number; // Make info optional
	buttonLabel?: string;
	onButtonClick?: () => void;
	link?: { href: string; text: string };
	variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'; // Variantes de color
	textColor?: string; // Color personalizado para el texto
	customButton?: React.ReactNode; // Botón personalizado
	centerText?: boolean; // Prop para centrar el texto
	titleFontSize?: string; // Tamaño personalizado para el font-size de "title"
	infoFontSize?: string; // Tamaño personalizado para el font-size de "info"
	buttonVariant?: string; // Variante del botón (puede ser un color de Bootstrap o un color custom)
	buttonSize?: 'sm' | 'lg'; // Tamaño del botón (pequeño o grande)
	buttonDisabled?: boolean; // Deshabilitar el botón
	renderChart?: boolean; // Prop to render the chart
	showTitle?: boolean; // Prop to control whether to show title
	chartComponent?: React.ReactNode; // The chart component to render
	colProps?: any; // Props for react-bootstrap Col to control the card size
	height?: string; // Custom height for the card
	maxHeight?: string; // Maximum height for the card
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
	titleFontSize = '1.5rem',
	infoFontSize = '1rem',
	buttonVariant = 'primary',
	buttonSize = 'sm',
	buttonDisabled = false,
	renderChart = false,
	showTitle = true,
	chartComponent,
	colProps,
	height = 'auto', // Set default height
	maxHeight = '400px', // Set default max height
}) => {
	const textAlignmentClass = centerText ? 'text-center' : '';

	return (
		<Col {...colProps} className='mb-4'>
			<Card className={`h-100 shadow-sm bg-${variant}`} style={{ height, maxHeight }}>
				<Card.Body className={`d-flex flex-column justify-content-between ${textAlignmentClass}`}>
					{showTitle && (
						<Card.Title style={{ color: textColor, fontSize: titleFontSize }}>{title}</Card.Title>
					)}

					{renderChart && chartComponent ? (
						<div className='chart-container'>{chartComponent}</div>
					) : (
						<Card.Text style={{ color: textColor, fontSize: infoFontSize }}>
							{info}
						</Card.Text>
					)}

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
								<Button
									variant={buttonVariant}
									onClick={onButtonClick}
									size={buttonSize}
									disabled={buttonDisabled}
									className={`mt-2`}
								>
									{buttonLabel}
								</Button>
						  )}
				</Card.Body>
			</Card>
		</Col>
	);
};

export default InfoCard;
