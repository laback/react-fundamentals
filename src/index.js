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
import { CreateCourse } from './components/Courses/components/CreateCourse/CreateCourse';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<App />}>
				<Route element={<Container />}>
					<Route path='/courses' element={<Courses />} />
					<Route path='courses/add' element={<CreateCourse />} />
					<Route path='/courses/:courseId' element={<CourseInfo />} />
					<Route path='/login' element={<Login />} />
					<Route path='/registration' element={<Registration />} />
				</Route>
			</Route>
		</Routes>
	</BrowserRouter>
);
