import React, { ForwardedRef } from 'react';

type InputProps = {
	type?: 'text' | 'number' | 'password';
	placeholder: string;
	className: string;
	name?: string;
	onChange?: (event) => void;
	value?: string | number;
};

const Input = React.forwardRef(
	(props: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
		return (
			<>
				<input
					ref={ref}
					name={props.name}
					type={props.type}
					placeholder={props.placeholder}
					className={`default-input ${props.className}`}
					onChange={(event) => props.onChange(event)}
					value={props.value}
				/>
			</>
		);
	}
);

export { Input };
