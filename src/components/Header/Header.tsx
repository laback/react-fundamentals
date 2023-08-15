import React from 'react';
import { Logo } from './components/Logo/Logo';
import { Button } from 'src/common/Button/Button';
import logo from '../../assets/logo.png';

const logoSrc = logo;
const alt = 'logo';

const buttonText = 'logout';
const buttonClass = 'logout-button';

const name = 'Bulka';

const Header = () => {
	return (
		<header>
			<nav>
				<Logo src={logoSrc} alt={alt} />

				<div className='name-logout'>
					<div className='name'>{name}</div>
					<Button text={buttonText} className={buttonClass} />
				</div>
			</nav>
		</header>
	);
};

export { Header };
