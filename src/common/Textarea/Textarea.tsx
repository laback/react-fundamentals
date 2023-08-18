import React from 'react';

const Textarea = React.forwardRef(
	({ type, placeholder, className, name, onChange, value }, ref) => {
		return (
			<>
				<textarea
					ref={ref}
					name={name}
					type={type}
					placeholder={placeholder}
					className={`default-textarea ${className}`}
					onChange={(event) => onChange(event)}
					value={value}
				/>
			</>
		);
	}
);

export { Textarea };
