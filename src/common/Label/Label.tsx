import React from 'react';

const Label = ({ className, text }) => {
	return <label className={`default-button ${className}`}>{text}</label>;
};

export { Label };
