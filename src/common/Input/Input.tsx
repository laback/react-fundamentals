import React from 'react';

const Input = React.forwardRef(
	({ type, placeholder, className, name, onChange, value }, ref) => {
		return (
			<>
				<input
					ref={ref}
					name={name}
					type={type}
					placeholder={placeholder}
					className={`default-input ${className}`}
					onChange={(event) => onChange(event)}
					value={value}
				/>
			</>
		);
	}
);

export { Input };
