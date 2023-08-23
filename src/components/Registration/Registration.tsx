import React, { useState } from 'react';
import { Button } from 'src/common/Button/Button';
import { Input } from 'src/common/Input/Input';
import { Label } from 'src/common/Label/Label';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { registerUser } from 'src/store/services';

const labelClass = 'registration-form-label';

const inputPlaceholder = 'Input text';

const inputClass = 'registration-form-input';

const buttonClass = 'registration-form-button';

const Registration = () => {
	const [requestErrorMessage, setRequestErrorMessage] = useState([]);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const nav = useNavigate();
	const onRegister = async (user) => {
		const result = registerUser(user);
		if (Array.isArray(result)) {
			setRequestErrorMessage(result);
		} else {
			setRequestErrorMessage(undefined);
			nav('/login');
		}
	};

	const nameInput = register('name', { required: 'Name is required' });
	const emailInput = register('email', { required: 'Email is required' });
	const passwordInput = register('password', {
		required: 'Password is required',
		minLength: {
			value: 6,
			message: 'Password should contains at list 6 characters',
		},
	});
	// const nameError = errors[nameInput.name];
	console.log(errors);
	return (
		<div className='registration'>
			<h3 className='registration-header'>Registration</h3>
			<form onSubmit={handleSubmit(onRegister)} className='registration-form'>
				<span className='big-error-message'>{requestErrorMessage}</span>
				<div className='registration-form-name'>
					<Label className={labelClass} text='Name' />
					<Input
						placeholder={inputPlaceholder}
						type='text'
						className={inputClass}
						{...nameInput}
					/>
					{errors[nameInput.name] && (
						<span className='error-message'>
							{errors[nameInput.name].message}
						</span>
					)}
				</div>
				<div className='registration-form-email'>
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
				<div className='registration-form-password'>
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
				<Button text='register' className={buttonClass} type='submit' />
				<div className='registration-form-end'>
					If you have an account you may
					<Link to='/login' className='registration-form-end-bold'>
						{' '}
						Login
					</Link>
				</div>
			</form>
		</div>
	);
};

export { Registration };
