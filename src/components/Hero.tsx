import { JSX, useEffect, useRef, useState } from 'react';
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { VideoPreview } from './VideoPreview';

gsap.registerPlugin(ScrollTrigger);

type VideoElement = HTMLVideoElement | null;

interface HeroProps {}

const Hero = ({}: HeroProps): JSX.Element => {
	const [currentIndex, setCurrentIndex] = useState<number>(1);
	const [backgroundSrc, setBackgroundSrc] =
		useState<string>('videos/hero-1.mp4');
	const [hasClicked, setHasClicked] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [loadedVideos, setLoadedVideos] = useState<number>(0);
	const [isHovered, setIsHovered] = useState<boolean>(false); // Новое состояние для наведения

	const totalVideos: number = 4;
	const nextVideoRef = useRef<VideoElement>(null);
	const miniVideoRef = useRef<VideoElement>(null);

	const handleVideoLoad = (index: number): void => {
		setLoadedVideos((prev) => {
			const newCount = prev + 1;
			console.log(`Video ${index} loaded. Total: ${newCount}/${totalVideos}`);
			return newCount;
		});
	};

	const handleMouseEnter = (): void => {
		if (!isHovered) {
			setIsHovered(true); // Активируем анимацию при первом наведении
		}
	};

	useEffect(() => {
		if (loadedVideos >= totalVideos) {
			setLoading(false);
		}
		// Увеличим задержку до 3 сек, чтобы Safari успел загрузить
		const timeout = setTimeout(() => {
			if (loadedVideos < totalVideos) {
				console.warn('⚠️ Not all videos loaded, but continuing...');
				setLoading(false);
			}
		}, 3000);
		return () => clearTimeout(timeout);
	}, [loadedVideos]);

	const handleMiniVdClick = (): void => {
		setHasClicked(true);
		setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
	};

	useGSAP(
		() => {
			if (hasClicked) {
				gsap.set('#next-video', { visibility: 'visible' });
				gsap.to('#next-video', {
					transformOrigin: 'center center',
					scale: 1,
					width: '100%',
					height: '100%',
					duration: 1,
					ease: 'power1.inOut',
					onStart: () => {
						// Здесь вызов play() без асинхронности
						nextVideoRef.current?.play();
					},
				});

				gsap.from('#current-video', {
					transformOrigin: 'center center',
					scale: 0,
					duration: 1.5,
					ease: 'power1.inOut',
				});
			}
		},
		{
			dependencies: [currentIndex],
			revertOnUpdate: true,
		}
	);

	// Бесконечная анимация масштабирования при наведении
	useGSAP(() => {
		if (isHovered) {
			gsap.killTweensOf('#current-video'); // Удаляем возможные старые анимации
			gsap.set('#current-video', { scale: 1 });
			gsap.to('#current-video', {
				scale: 1.1,
				duration: 0.9,
				ease: 'power1.inOut',
				repeat: -1,
				yoyo: true,
			});
		}
	}, [isHovered, currentIndex]);

	useGSAP(() => {
		if (!loading) {
			gsap.set('#video-frame', {
				clipPath: 'polygon(14% 0, 72% 0, 88% 90%, 0 95%)',
				borderRadius: '0% 0% 40% 10%',
			});
			gsap.from('#video-frame', {
				clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
				borderRadius: '0% 0% 0% 0%',
				ease: 'power1.inOut',
				scrollTrigger: {
					trigger: '#video-frame',
					start: 'center center',
					end: 'bottom center',
					scrub: true,
				},
			});
		}
	}, [loading]);

	const getVideoSrc = (index: number): string => `videos/hero-${index}.mp4`;

	return (
		<div className='relative h-dvh w-screen overflow-x-hidden'>
			{loading && (
				<div className='flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50'>
					<div className='three-body'>
						<div className='three-body__dot'></div>
						<div className='three-body__dot'></div>
						<div className='three-body__dot'></div>
					</div>
				</div>
			)}

			<div
				id='video-frame'
				className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'
			>
				<div>
					<div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
						<VideoPreview>
							<div
								onClick={handleMiniVdClick}
								className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'
							>
								<video
									ref={miniVideoRef}
									src={getVideoSrc((currentIndex % totalVideos) + 1)}
									loop
									muted
									playsInline
									id='current-video'
									className='size-64 origin-center scale-150 object-cover object-center'
									onLoadedData={() => handleVideoLoad(currentIndex)}
									onMouseEnter={handleMouseEnter}
								/>
							</div>
						</VideoPreview>
					</div>

					<video
						ref={nextVideoRef}
						src={getVideoSrc(currentIndex)}
						loop
						muted
						playsInline
						id='next-video'
						className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
						onLoadedData={() => handleVideoLoad(currentIndex)}
					/>
					<video
						src={backgroundSrc}
						autoPlay
						loop
						muted
						playsInline
						className='absolute left-0 top-0 size-full object-cover object-center'
						onLoadedData={() => handleVideoLoad(currentIndex)}
					/>
				</div>

				<h1 className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75'>
					G<b>A</b>MING
				</h1>

				<div className='absolute  left-0 top-0 z-40 size-full'>
					<div className='mt-24 px-5 sm:px-10'>
						<h1 className='special-font hero-heading text-blue-100'>
							redefi<b>n</b>e
						</h1>

						<p className='mb-5 max-w-64 font-robert-regular text-blue-100'>
							Enter the Metagame Layer <br /> Unleash the Play Economy
						</p>

						<Button
							id='watch-trailer'
							title='Watch trailer'
							leftIcon={<TiLocationArrow />}
							containerClass='bg-yellow-300 flex-center gap-1'
							rightIcon={undefined}
						/>
					</div>
				</div>
			</div>

			<h1 className='special-font hero-heading absolute bottom-5 right-5 text-black'>
				G<b>A</b>MING
			</h1>
		</div>
	);
};

export default Hero;
