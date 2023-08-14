import React from 'react';
import { Logo } from './components/Logo/Logo';
import { Button } from 'src/common/Button/Button';
import logo from '../../assets/logo.png';

const handleLogout = () => {
	alert('You are trying to logout');
};

const mockedLogo = {
	src: logo,
	alt: 'logo',
};
const mockedLogoutButton = {
	buttonText: 'logout',
	onClick: handleLogout,
	buttonClass: 'logout-button',
};

const name = 'Bulka';

const Header = () => {
	return (
		<header>
			<nav>
				<Logo logo={mockedLogo} />

				<div className='name-logout'>
					<div className='name'>{name}</div>
					<Button button={mockedLogoutButton} />
				</div>
			</nav>
		</header>
	);
};

export { Header };
