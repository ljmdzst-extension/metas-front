import { useState } from 'react';
import { navLinkProps } from '../../../types/AppProps';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import './SideBarNav.css';
interface SideBarNavProps {
	data: navLinkProps[];
}

const SideBarNav = ({ data }: SideBarNavProps) => {
	const [indexesOpen, setIndexesOpen] = useState<string[]>([]);

	const handleOpen = (index: string) => {
		if (indexesOpen.includes(index)) {
			setIndexesOpen(indexesOpen.filter((i) => i !== index));
		} else {
			setIndexesOpen([...indexesOpen, index]);
		}
	};
	return (
		<div className='sidebar-nav me-2'>
			{data.map((nav: navLinkProps) => {
				return (
					<div key={nav.index} className='nav-item'>
						<div
							className='nav-item-container'
							onClick={() => handleOpen(nav.index)}
							onKeyDown={() => handleOpen(nav.index)}
						>
							<div className='nav-item-text'>{nav.title}</div>
							{nav.SubNav && (
								<ArrowForwardIosIcon
									className={`nav-item-arrow ${indexesOpen.includes(nav.index) ? 'rotate' : ''}`}
								/>
							)}
						</div>
						{nav.SubNav && indexesOpen.includes(nav.index) && (
							<ul className='sub-nav'>
								{nav.SubNav.map((subNav: navLinkProps) => {
									return (
										<li key={subNav.index} className='sub-nav-item'>
											{subNav.title}
										</li>
									);
								})}
							</ul>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default SideBarNav;
