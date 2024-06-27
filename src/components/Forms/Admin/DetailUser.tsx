import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface User {
	id: number;
	nom: string;
	ape: string;
	email: string;
	pass: string;
	roles: string[];
	areas: number[];
	[key: string]: any;
}

interface DetailsUserProps {
	user: User;
}

const DetailsUser: React.FC<DetailsUserProps> = ({ user }) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const toggleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<div style={{ textAlign: 'left' }}>
			{Object.keys(user).map((key) => (
				<p key={key}>
					<strong>{key}:</strong>{' '}
					{key === 'pass' ? (
						<span>
							{showPassword ? user[key] : '********'}
							<IconButton onClick={toggleShowPassword} style={{ marginLeft: '10px' }}>
								{showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</span>
					) : (
						user[key]
					)}
				</p>
			))}
		</div>
	);
};

export default DetailsUser;
