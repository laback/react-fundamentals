import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getIsLoggedIn, getIsUserLoaded } from 'src/store/selectors';
import { GetUser } from 'src/store/user/actions';

const Container = () => {
	const nav = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch<any>();
	const isLoaded = useSelector(getIsUserLoaded);
	const isLoggedIn = useSelector(getIsLoggedIn);
	useEffect(() => {
		if (localStorage.getItem('token') && !isLoaded) {
			(async () => {
				await dispatch(GetUser());
				nav('courses');
			})();
		} else if (isLoaded) {
			nav('courses');
		} else if (location.pathname.includes('registration')) {
			nav('/registration');
		} else {
			nav('/login');
		}
	}, [isLoggedIn]);

	return (
		<div className='container'>
			<Outlet />
		</div>
	);
};

export { Container };
