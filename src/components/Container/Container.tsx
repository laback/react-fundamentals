import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getIsUserLoaded } from 'src/store/selectors';
import { GetUser } from 'src/store/user/actions';

const Container = () => {
	const nav = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch<any>();
	const token = localStorage.getItem('token');
	const isLoaded = useSelector(getIsUserLoaded);
	useEffect(() => {
		if (token) {
			if (isLoaded) {
				nav('/courses');
			} else {
				(async () => {
					await dispatch(GetUser(token));
					nav('courses');
				})();
			}
		} else if (location.pathname.includes('registration')) {
			nav('/registration');
		} else {
			nav('/login');
		}
	}, [isLoaded]);

	return (
		<div className='container'>
			<Outlet />
		</div>
	);
};

export { Container };
