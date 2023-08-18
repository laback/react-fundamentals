import React, { useContext, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { LoggedInContext } from 'src/App';

const Container = () => {
	const loggedInUsers = useContext(LoggedInContext).loggedInUsers;
	const nav = useNavigate();

	useEffect(() => {
		if (loggedInUsers.length > 0) {
			nav('/courses');
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
