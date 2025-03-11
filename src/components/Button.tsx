import React, { JSX } from 'react';

interface ButtonProps {
	title: string;
	id: string;
	rightIcon: React.ReactNode;
	leftIcon: React.ReactNode;
	containerClass: string;
}

const Button = ({
	title,
	id,
	rightIcon,
	leftIcon,
	containerClass,
}: ButtonProps): JSX.Element => {
	return (
		<button
			id={id}
			className={`group flex relative z-10 w-fit cursor-pointer overflow-hidden rounded-full bg-violet-50 px-7 py-3 text-black hover:text-white ${containerClass}`}
		>
			{leftIcon}
			<span className='relative inline-flex overflow-hidden font-general text-xs uppercase'>
				<div className='translate-y-0 skew-y-0 transition duration-500 group-hover:translate-y-[-160%] group-hover:skew-y-12'>
					{title}
				</div>
				<div className='absolute bg-violet-300 translate-y-[164%] skew-y-12 transition duration-500 group-hover:translate-y-0 group-hover:skew-y-0'>
					{title}
				</div>
			</span>
			{rightIcon}
		</button>
	);
};

export default Button;
