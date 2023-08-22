import React from 'react';

type ButtonProps = {
	onClick?: () => void;
	className?: string;
	text?: string;
	type?: 'button' | undefined;
};

const Button = (props: ButtonProps) => {
	return (
		<button
			type={props.type}
			onClick={props.onClick}
			className={`default-button ${props.className}`}
		>
			{props.text}
		</button>
	);
};

export { Button };
