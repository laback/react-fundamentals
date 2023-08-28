import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Courses from './components/Courses/Courses';
import { CourseInfo } from './components/CourseInfo/CourseInfo';
import { Login } from './components/Login/Login';
import { Registration } from './components/Registration/Registration';
import { Container } from './components/Container/Container';
import { CourseForm } from './components/Courses/components/CourseForm/CourseForm';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<App />}>
				<Route element={<Container />}>
					<Route path='/courses' element={<Courses />} />
					<Route
						path='/courses/add'
						element={
							<PrivateRoute>
								<CourseForm />
							</PrivateRoute>
						}
					/>
					<Route
						path='/courses/update/:courseId'
						element={
							<PrivateRoute>
								<CourseForm />
							</PrivateRoute>
						}
					/>

					<Route path='/courses/:courseId' element={<CourseInfo />} />
					<Route path='/login' element={<Login />} />
					<Route path='/registration' element={<Registration />} />
				</Route>
			</Route>
		</Routes>
	</BrowserRouter>
);
