import React from 'react';

const Logo = (props) => {
	return <img className='logo-img' src={props.logo.src} alt={props.logo.alt} />;
};

export { Logo };
