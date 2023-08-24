import React from 'react';
import { Logo } from './components/Logo/Logo';
import { Button } from 'src/common/Button/Button';
import logo from '../../assets/logo.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from 'src/store/user/actions';
import { TUser } from 'src/shared.types';
import { getLoggedInUser } from 'src/store/selectors';

const logoSrc = logo;
const alt = 'logo';

const logoutButtonText = 'logout';
const logoutButtonClass = 'logout-button';

const loginButtonText = 'login';
const loginButtonClass = 'login-button';

const Header = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const loggedInUser: TUser = useSelector(getLoggedInUser);
	const nav = useNavigate();
	const onLogoutAction = () => {
		dispatch(Logout());
		nav('/login');
	};
	let right;
	if (
		loggedInUser &&
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
