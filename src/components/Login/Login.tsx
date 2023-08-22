import React, { useContext, useState } from 'react';
import { Button } from 'src/common/Button/Button';
import { Input } from 'src/common/Input/Input';
import { Label } from 'src/common/Label/Label';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { LoggedInContext } from 'src/App';
import { AuthUser } from 'src/shared.types';

const labelClass = 'login-form-label';

const inputPlaceholder = 'Input text';

const inputClass = 'login-form-input';

const buttonClass = 'login-form-button';

const Login = () => {
	const setUser = useContext(LoggedInContext).setLoggedInUser;
	const [requestErrorMessage, setRequestErrorMessage] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const nav = useNavigate();
	const onLogin = async (user) => {
		const response = await fetch('http://localhost:4000/login', {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const result = await response.json();
		if (result.successful) {
			console.log(result);
			const token = result.result;
			const user: AuthUser = {
				token: token,
				email: result.user.email,
				name: result.user.name,
			};
			localStorage.setItem('user', JSON.stringify(user));
			setUser(user);
			setRequestErrorMessage(undefined);
			nav('/courses');
		} else {
			console.log(result);
			setRequestErrorMessage(result.errors.join('\n'));
		}
	};

	const emailInput = register('email', { required: 'Email is required' });
	const passwordInput = register('password', {
		required: 'Password is required',
		minLength: {
			value: 6,
			message: 'Password should contains at list 6 characters',
		},
	});
	return (
		<div className='login'>
			<h3 className='login-header'>Login</h3>
			<form onSubmit={handleSubmit(onLogin)} className='login-form'>
				<span className='big-error-message'>{requestErrorMessage}</span>
				<div className='login-form-email'>
					<Label className={labelClass} text='Email' />
					<Input
						placeholder={inputPlaceholder}
						type='text'
						className={inputClass}
						{...emailInput}
					/>
					{errors[emailInput.name] && (
						<span className='error-message'>
							{errors[emailInput.name].message}
						</span>
					)}
				</div>
				<div className='login-form-password'>
					<Label className={labelClass} text='Password' />
					<Input
						placeholder={inputPlaceholder}
						type='password'
						className={inputClass}
						{...passwordInput}
					/>
					{errors[passwordInput.name] && (
						<span className='error-message'>
							{errors[passwordInput.name].message}
						</span>
					)}
				</div>
				<Button text='login' className={buttonClass} type='submit' />
				<div className='login-form-end'>
					If you don't have an account you may
					<Link to='/registration' className='login-form-end-bold'>
						{' '}
						Register
					</Link>
				</div>
			</form>
		</div>
	);
};

export { Login };
