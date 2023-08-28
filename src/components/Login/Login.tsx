import React, { useState } from 'react';
import { Button } from 'src/common/Button/Button';
import { Input } from 'src/common/Input/Input';
import { Label } from 'src/common/Label/Label';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Login as LoginAction } from 'src/store/user/actions';

const labelClass = 'login-form-label';

const inputPlaceholder = 'Input text';

const inputClass = 'login-form-input';

const buttonClass = 'login-form-button';

const Login = () => {
	const dispatch = useDispatch<any>();
	const [requestErrorMessage, setRequestErrorMessage] = useState([]);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const nav = useNavigate();
	const onLogin = async (user) => {
		const res = await dispatch(LoginAction(user));
		if (res.meta.requestStatus === 'rejected') {
			setRequestErrorMessage(res.payload.join('\n'));
		} else {
			nav('/courses');
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
							{errors[emailInput.name].message as string}
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
							{errors[passwordInput.name].message as string}
						</span>
					)}
				</div>
				<Button text='login' className={buttonClass} />
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
