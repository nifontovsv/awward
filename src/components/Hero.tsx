import { JSX, useRef, useState } from 'react';

export default function Hero(): JSX.Element {
	const [currentIndex, setCurrentIndex] = useState<number>(1);
	const [hasClicked, setHasClicked] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [loadedVideos, setLoadedVideos] = useState<number>(0);

	const totalVideos: number = 4;
	const nextVideoRef = useRef<HTMLVideoElement | null>(null);

	// Вычисляем следующий индекс (циклически)
	const upcomingVideoIndex: number = (currentIndex % totalVideos) + 1;

	const handleMiniVideoClick = (): void => {
		setHasClicked(true);
		setCurrentIndex(upcomingVideoIndex);
	};

	const handleVideoLoad = (): void => {
		setLoadedVideos((prev) => prev + 1);
	};

	const getVideoSrc = (index: number): string => `videos/hero-${index}.mp4`;

	return (
		<div className='relative h-dvh w-screen overflow-x-hidden'>
			<div
				id='video-frame'
				className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'
			>
				<div>
					<div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
						<div
							onClick={handleMiniVideoClick}
							className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'
						>
							<video
								src={getVideoSrc(upcomingVideoIndex)}
								ref={nextVideoRef}
								loop
								muted
								id='current-video'
								className='size-64 origin-center scale-150 object-cover object-center'
								onLoadedData={handleVideoLoad}
							/>
						</div>
					</div>

					<video
						src={getVideoSrc(currentIndex)}
						ref={nextVideoRef}
						loop
						muted
						id='next-video'
						className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
						onLoadedData={handleVideoLoad}
					/>

					<video
						src={getVideoSrc(currentIndex)}
						autoPlay
						loop
						muted
						className='absolute left-0 top-0 size-full object-cover object-center'
					/>
				</div>

				<h1 className='special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75'>
					G<b>a</b>ming
				</h1>

				<div className='absolute left-0 top-0 z-40 size-full'>
					<div className='mt-24 px-5 sm:px-10'>
						<h1 className='font-zentry special-font hero-heading text-blue-100'>
							redefi<b>n</b>e
						</h1>
						<p className='mb-5 max-w-64 font-robert-regular text-blue-100'>
							Enter the Metagame Layer <br /> Unleash the Play Economy
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
