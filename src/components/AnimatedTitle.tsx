import { gsap } from 'gsap';
import { JSX, useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import clsx from 'clsx';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTitleProps {
	title: string;
	containerClass: string;
}

const AnimatedTitle = ({
	title,
	containerClass,
}: AnimatedTitleProps): JSX.Element => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!containerRef.current) return; // Проверка на существование элемента

		const ctx = gsap.context(() => {
			const titleAnimation = gsap.timeline({
				scrollTrigger: {
					trigger: containerRef.current,
					start: '100 bottom',
					end: 'center bottom',
					toggleActions: 'play none none reverse',
				},
			});

			titleAnimation.to(
				'.animated-word',
				{
					opacity: 1,
					transform: 'translate3d(0, 0, 0) rotateY(0deg) rotateX(0deg)',
					ease: 'power2.inOut',
					stagger: 0.02,
				},
				0
			);
		}, containerRef);

		return () => ctx.revert(); // Очистка на размонтирование компонента
	}, []);

	return (
		<div ref={containerRef} className={clsx('animated-title', containerClass)}>
			{title.split('<br />').map((line, index) => (
				<div
					key={index}
					className='flex-center max-w-full flex-wrap gap-2 px-10 md:gap-3'
				>
					{line.split(' ').map((word, idx) => (
						<span
							key={idx}
							className='animated-word'
							dangerouslySetInnerHTML={{ __html: word }}
						/>
					))}
				</div>
			))}
		</div>
	);
};

export default AnimatedTitle;
