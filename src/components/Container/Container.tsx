import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getLoggedInUser } from 'src/store/selectors';

const Container = () => {
	const loggedInUser = useSelector(getLoggedInUser);
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
