import React from 'react';

type LabelProps = {
	className: string;
	text: string;
};

const Label = (props: LabelProps) => {
	return <label className={props.className}>{props.text}</label>;
};

export { Label };
