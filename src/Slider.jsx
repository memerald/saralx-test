import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SimpleSlider = ({
	slides = [],
	moreAccessible = false,
	paused = false,
	noRotate = false,
	interval = 5000,
}) => {
	const sliderRef = useRef(null);
	const liveRegionRef = useRef(null);

	const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	const [isPlaying, setIsPlaying] = useState(!paused && !prefersReducedMotion && !noRotate);
	const [hasUserActivatedPlay, setHasUserActivatedPlay] = useState(false);
	const [hasFocus, setHasFocus] = useState(false);
	const [hasHover, setHasHover] = useState(false);
	const [currentIndex, setCurrentIndex] = useState(0);

	const settings = {
		infinite: true,
		arrows: false,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		beforeChange: (_, next) => setCurrentIndex(next),
	};

	const handlePlay = () => {
		setHasUserActivatedPlay(!isPlaying);
		setIsPlaying(!isPlaying);
	};

	const handlePrev = () => {
		sliderRef.current?.slickPrev();
	};

	const handleNext = () => {
		sliderRef.current?.slickNext();
	};

	useEffect(() => {
		if (noRotate) return;
		if (!isPlaying) return;

		const timer = setInterval(() => {
			if ((!hasFocus && !hasHover && isPlaying) || hasUserActivatedPlay) {
				sliderRef.current?.slickNext();
			}
		}, interval);

		return () => clearInterval(timer);
	}, [isPlaying, hasFocus, hasHover, hasUserActivatedPlay, noRotate, interval]);

	useEffect(() => {
		if (liveRegionRef.current) {
			liveRegionRef.current.setAttribute("aria-live", isPlaying ? "off" : "polite");
		}
	}, [isPlaying]);

	return (
		<div
			className={`carousel ${moreAccessible ? "carousel-moreaccessible" : ""}`}
			onMouseOver={(e) => {
				if (!e.currentTarget.contains(e.target)) return;
				if (!e.target.closest("button.rotation")) {
					setHasHover(true);
				}
			}}
			onMouseOut={() => setHasHover(false)}>
			<div className="carousel-items" ref={liveRegionRef}>
				<Slider ref={sliderRef} {...settings}>
					{slides.map((slide, index) => (
						<div
							key={index}
							className={`carousel-item ${index === currentIndex ? "active" : ""}`}
							onFocus={() => setHasFocus(true)}
							onBlur={() => setHasFocus(false)}>
							<div className="carousel-image">
								<a
									href={slide.link}
									target="_blank"
									rel="noreferrer"
									onFocus={() => liveRegionRef.current?.classList.add("focus")}
									onBlur={() => liveRegionRef.current?.classList.remove("focus")}>
									<img src={slide.src} alt={slide.alt} />
								</a>
							</div>
						</div>
					))}
				</Slider>
			</div>

			<div className="controls">
				{!noRotate && (
					<button
						type="button"
						className={`rotation ${isPlaying ? "pause" : "play"}`}
						aria-label={isPlaying ? "Stop automatic slide show" : "Start automatic slide show"}
						onClick={handlePlay}>
						{isPlaying ? "❚❚" : "▶"}
					</button>
				)}

				<button
					type="button"
					className="previous"
					aria-label="Previous Slide"
					onClick={handlePrev}
					onFocus={() => setHasFocus(true)}
					onBlur={() => setHasFocus(false)}>
					Prev
				</button>

				<button
					type="button"
					className="next"
					aria-label="Next Slide"
					onClick={handleNext}
					onFocus={() => setHasFocus(true)}
					onBlur={() => setHasFocus(false)}>
					Next
				</button>
			</div>
		</div>
	);
};

export default SimpleSlider;
