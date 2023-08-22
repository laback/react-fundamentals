import React from 'react';

type TextareaProps = {
	type?: 'text' | 'number';
	placeholder: string;
	className: string;
	name?: string;
	onChange?: (event) => void;
	value?: string | number;
};

const Textarea = React.forwardRef((props: TextareaProps, ref) => {
	return (
		<>
			<textarea
				ref={ref}
				name={props.name}
				type={props.type}
				placeholder={props.placeholder}
				className={`default-textarea ${props.className}`}
				onChange={(event) => props.onChange(event)}
				value={props.value}
			/>
		</>
	);
});

export { Textarea };
