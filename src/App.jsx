import "./App.css";
import SimpleSlider from "./Slider";
import { slide_1, slide_2, slide_3 } from "./assets";

function App() {
	const slides = [
		{
			src: slide_1,
			alt: "First slide",
			link: "https://google.com",
		},
		{ src: slide_2, alt: "Second slide", link: "https://google.com" },
		{
			src: slide_3,
			alt: "Third slide",
			link: "https://google.com",
		},
	];

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}>
			<SimpleSlider
				slides={slides}
				moreAccessible={true}
				paused={false}
				noRotate={false}
				interval={1000}
			/>
		</div>
	);
}

export default App;
