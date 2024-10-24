import { OverlayTrigger, Tooltip } from 'react-bootstrap';

interface Props {
	tooltipText: string;
	Icon: React.ElementType;
	style?: React.CSSProperties;
}

const CommonIconWithTooltip: React.FC<Props> = ({ tooltipText, Icon, style }) => {
	const renderTooltip = (props: any) => (
		<Tooltip id='button-tooltip' {...props}>
			{tooltipText}
		</Tooltip>
	);

	return (
		<>
			<OverlayTrigger placement='top' overlay={renderTooltip}>
				<span>
					<Icon style={style} /> 
				</span>
			</OverlayTrigger>
		</>
	);
};

export default CommonIconWithTooltip;
