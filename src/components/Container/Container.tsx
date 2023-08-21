import React, { useContext, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LoggedInContext } from 'src/App';

const Container = () => {
	const loggedInUser = useContext(LoggedInContext).loggedInUser;
	const nav = useNavigate();
	const location = useLocation();
	useEffect(() => {
		if (loggedInUser != undefined) {
			nav('/courses');
		} else if (location.pathname.includes('registration')) {
			nav('/registration');
		} else {
			nav('/login');
		}
	}, []);

	return (
		<div className='container'>
			<Outlet />
		</div>
	);
};

export { Container };
