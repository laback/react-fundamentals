import React, { useContext } from 'react';
import { Logo } from './components/Logo/Logo';
import { Button } from 'src/common/Button/Button';
import logo from '../../assets/logo.png';
import { LoggedInContext } from 'src/App';
import { useLocation, useNavigate } from 'react-router-dom';

const logoSrc = logo;
const alt = 'logo';

const logoutButtonText = 'logout';
const logoutButtonClass = 'logout-button';

const loginButtonText = 'login';
const loginButtonClass = 'login-button';

const Header = () => {
	const location = useLocation();

	const context = useContext(LoggedInContext);
	const loggedInUser = context.loggedInUser;
	const setLoggedInUser = context.setLoggedInUser;
	const nav = useNavigate();
	const onLogoutAction = () => {
		localStorage.removeItem('user');
		setLoggedInUser(undefined);
		nav('/login');
	};
	let right;
	if (
		loggedInUser != undefined &&
		location.pathname != '/login' &&
		location.pathname != '/register'
	) {
		right = (
			<div className='name-logout'>
				<div className='name'>{loggedInUser.name}</div>
				<Button
					text={logoutButtonText}
					className={logoutButtonClass}
					onClick={() => onLogoutAction()}
				/>
			</div>
		);
	} else {
		right = <Button text={loginButtonText} className={loginButtonClass} />;
	}
	return (
		<header>
			<nav>
				<Logo src={logoSrc} alt={alt} />
				{right}
			</nav>
		</header>
	);
};

export { Header };
