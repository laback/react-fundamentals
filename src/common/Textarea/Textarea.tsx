import React, { ForwardedRef } from 'react';

type TextareaProps = {
	placeholder: string;
	className: string;
	name?: string;
	onChange?: (event) => void;
	value?: string | number;
};

const Textarea = React.forwardRef(
	(props: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
		return (
			<>
				<textarea
					ref={ref}
					name={props.name}
					placeholder={props.placeholder}
					className={`default-textarea ${props.className}`}
					onChange={(event) => props.onChange(event)}
					value={props.value}
				/>
			</>
		);
	}
);

export { Textarea };
