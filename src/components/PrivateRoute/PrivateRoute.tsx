import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getIsAdmin } from '../../store/selectors';

export function PrivateRoute({ children }) {
	const auth = useSelector(getIsAdmin);

	return auth ? children : <Navigate to={'/courses'} />;
}
