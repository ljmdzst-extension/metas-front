import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { UserData, Categoria, Area } from '@/types/UserProps';

interface DetailsUserProps {
	user: UserData;
}

const DetailsUser: React.FC<DetailsUserProps> = ({ user }) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const renderValue = (key: string, value: any) => {
		if (key === 'pass') {
			return (
				<span>
					{showPassword ? value : '********'}
					<IconButton onClick={toggleShowPassword} style={{ marginLeft: '10px' }}>
						{showPassword ? <VisibilityOff /> : <Visibility />}
					</IconButton>
				</span>
			);
		} else if (Array.isArray(value)) {
			return (
				<ul>
					{value.map((item, index) => (
						<li key={index}>
							{Object.entries(item).map(([k, v]) => (
								<p key={k}>
									<strong>{k}:</strong> {v}
								</p>
							))}
						</li>
					))}
				</ul>
			);
		} else if (typeof value === 'object' && value !== null) {
			return (
				<div>
					{Object.entries(value).map(([k, v]) => (
						<p key={k}>
							<strong>{k}:</strong> {v}
						</p>
					))}
				</div>
			);
		} else {
			return value;
		}
	};

	return (
		<div style={{ textAlign: 'left' }}>
			{Object.entries(user).map(([key, value]) => (
				<p key={key}>
					<strong>{key}:</strong> {renderValue(key, value)}
				</p>
			))}
		</div>
	);
};

export default DetailsUser;
