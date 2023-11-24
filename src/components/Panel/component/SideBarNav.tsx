import { navLinkProps } from '../../../types/AppProps';
import './sideBarNav.css';

interface SideBarNavProps {
	data: navLinkProps[];
}

const SideBarNav = ({ data }: SideBarNavProps) => {
	return (
		<div className='sidebar-nav'>
			{data.map((nav: navLinkProps) => {
				return (
					<div key={nav.index} className='nav-item'>
						<div className='nav-title'>{nav.title}</div>

						{nav.SubNav && (
							<ul className='sub-nav'>
								{nav.SubNav.map((subNav: navLinkProps) => {
									return (
										<li key={subNav.index} className='sub-nav-item'>
											<div>{subNav.title}</div>
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
