//components/slider/index.js
import React, { useEffect, useState } from "react"
import { SliderContainer } from "./style.js"
import "swiper/dist/css/swiper.css"
import Swiper from "swiper"

function Slider(props: { bannerList: any }) {
	const [sliderSwiper, setSliderSwiper] = useState<any>(null)
	const { bannerList } = props

	useEffect(() => {
		if (bannerList.length && !sliderSwiper) {
			let newSliderSwiper = new Swiper(".slider-container", {
				loop: true,
				autoplay: {
					delay: 3000,
					disableOnInteraction: false,
				},
				pagination: { el: ".swiper-pagination" },
			})
			setSliderSwiper(newSliderSwiper)
		}
	}, [bannerList.length, sliderSwiper])

	return (
		<SliderContainer>
			<div className='before'></div>
			<div className='slider-container'>
				<div className='swiper-wrapper'>
					{bannerList.map(
						(slider: { imageUrl: string | undefined }, index: React.Key | null | undefined) => {
							return (
								<div className='swiper-slide' key={index}>
									<div className='slider-nav'>
										<img src={slider.imageUrl} width='100%' height='100%' alt='推荐' />
									</div>
								</div>
							)
						}
					)}
				</div>
				<div className='swiper-pagination'></div>
			</div>
		</SliderContainer>
	)
}

export default React.memo(Slider)
