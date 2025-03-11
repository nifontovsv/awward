import gsap from 'gsap';
import { useEffect, useRef, useState, ReactNode } from 'react';

interface VideoPreviewProps {
	children: ReactNode; // Типизация для детей компонента
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({ children }) => {
	const [isHovering, setIsHovering] = useState<boolean>(false);

	const sectionRef = useRef<HTMLOptionElement | null>(null); // Типизация для рефа на <section>
	const contentRef = useRef<HTMLDivElement | null>(null); // Типизация для рефа на <div>

	const handleMouseMove = (e: React.MouseEvent<HTMLOptionElement>) => {
		const { clientX, clientY, currentTarget } = e;
		const rect = currentTarget.getBoundingClientRect();

		const xOffset = clientX - (rect.left + rect.width / 2);
		const yOffset = clientY - (rect.top + rect.height / 2);

		if (isHovering) {
			gsap.to(sectionRef.current, {
				x: xOffset,
				y: yOffset,
				rotationY: xOffset / 2,
				rotationX: -yOffset / 2,
				transformPerspective: 500,
				duration: 1,
				ease: 'power1.out',
			});

			gsap.to(contentRef.current, {
				x: -xOffset,
				y: -yOffset,
				duration: 1,
				ease: 'power1.out',
			});
		}
	};

	useEffect(() => {
		if (!isHovering) {
			gsap.to(sectionRef.current, {
				x: 0,
				y: 0,
				rotationY: 0,
				rotationX: 0,
				duration: 1,
				ease: 'power1.out',
			});

			gsap.to(contentRef.current, {
				x: 0,
				y: 0,
				duration: 1,
				ease: 'power1.out',
			});
		}
	}, [isHovering]);

	return (
		<section
			ref={sectionRef}
			onMouseMove={handleMouseMove}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			className='absolute z-50 size-full overflow-hidden rounded-lg'
			style={{
				perspective: '500px',
			}}
		>
			<div
				ref={contentRef}
				className='origin-center rounded-lg'
				style={{
					transformStyle: 'preserve-3d',
				}}
			>
				{children}
			</div>
		</section>
	);
};
