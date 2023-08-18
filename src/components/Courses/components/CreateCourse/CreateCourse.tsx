import React, { useEffect, useState } from 'react';
import { Input } from 'src/common/Input/Input';
import { Label } from 'src/common/Label/Label';
import { Textarea } from 'src/common/Textarea/Textarea';
import { toHoursAndMinutes } from 'src/constants';
import { useForm } from 'react-hook-form';
import { Button } from 'src/common/Button/Button';

const labelClass = 'edit-create-course-form-label';

const textareaClass = 'edit-create-course-form-textarea';

const inputClass = 'edit-create-course-form-input';
const placeholder = 'Input text';

const CreateCourse = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();

	const durationInput = register('durationInput', {
		required: 'Email is required',
	});

	const hoursWatch = watch(durationInput.name, '0');
	const [hours, setHours] = useState('00:00');
	useEffect(() => {
		setHours(toHoursAndMinutes(hoursWatch));
	}, [hoursWatch]);
	return (
		<div className='edit-create-course'>
			<h3 className='edit-create-course-title'>Course Edit/Create Page</h3>
			<form className='edit-create-course-form'>
				<div className='edit-create-course-form-head'>Main Info</div>
				<div className='edit-create-course-form-title'>
					<Label className={labelClass} text='Title' />
					<Input className={inputClass} placeholder={placeholder} />
				</div>
				<div className='edit-create-course-form-description'>
					<Label className={labelClass} text='Description' />
					<Textarea className={textareaClass} placeholder={placeholder} />
				</div>
				<div className='edit-create-course-form-additional-info'>
					<div className='edit-create-course-form-additional-info-left'>
						<div className='edit-create-course-form-additional-info-left-duration'>
							<div className='edit-create-course-form-additional-info-left-duration-head'>
								Duration
							</div>
							<Label className={labelClass} text='Duration' />
							<div className='edit-create-course-form-additional-info-left-duration-inputs'>
								<Input
									className={inputClass}
									placeholder={placeholder}
									{...durationInput}
									type='number'
								/>
								<div className='edit-create-course-form-additional-info-left-duration-inputs-hours'>
									{hours} hours
								</div>
							</div>
						</div>
						<div className='edit-create-course-form-additional-info-left-authors'>
							<div className='edit-create-course-form-additional-info-left-authors-head'>
								Authors
							</div>
							<Label className={labelClass} text='Author name' />
							<div className='edit-create-course-form-additional-info-left-duration-inputs'>
								{/* <Input
									className={inputClass}
									placeholder={placeholder}
									{...durationInput}
								/> */}
								{/* <Button text='test' /> */}
							</div>
						</div>
					</div>
					<div className='edit-create-course-form-additional-info-right'></div>
				</div>
			</form>
		</div>
	);
};

export { CreateCourse };
