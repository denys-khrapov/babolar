gsap.registerPlugin(ScrollTrigger)

initGSAPAnimations()

window.addEventListener('resize', () => {
	location.reload()
	ScrollTrigger.refresh()
	initGSAPAnimations()
})

function initGSAPAnimations() {
	if (window.innerWidth >= 1280) {
		gsap.to('.hero', {
			scale: 0.7,
			scrollTrigger: {
				trigger: '.two-block',
				start: 'top-=100 50%',
				end: 'bottom 100%',
				scrub: 2,
				// markers: true,
			},
		})

		// Анімація для непарних елементів
		gsap.from('.box-two-block:nth-child(odd)', {
			x: 1800,
			scrollTrigger: {
				trigger: '.hero',
				start: 'top start',
				end: 'bottom-=100 end',
				scrub: 2,
				// markers: true,
			},
		})

		// Анімація для парних елементів
		gsap.from('.box-two-block:nth-child(even)', {
			x: -1800,
			scrollTrigger: {
				trigger: '.hero',
				start: 'top start',
				end: 'bottom-=100 end',
				scrub: 2,
				// markers: true,
			},
		})

		// Анімація для масштабування .two-block
		gsap.to('.two-block', {
			scale: 0.7,
			scrollTrigger: {
				trigger: '.about',
				start: 'top 50%',
				end: 'bottom 100%',
				scrub: 2,
				// markers: true,
			},
		})

		gsap.from('.about__video-holder', {
			scale: 0.5,
			scrollTrigger: {
				trigger: '.about',
				start: 'top-=380 50%',
				end: 'bottom-=180 100%',
				scrub: 2,
				// markers: true,
			},
		})

		gsap.from('.about__title-box .title-box__title', {
			scale: 0.5,
			scrollTrigger: {
				trigger: '.about',
				start: 'top-=380 50%',
				end: 'bottom-=180 100%',
				scrub: 2,
				// markers: true,
			},
		})

		gsap.from('.about__title-box .title-box__text-holder', {
			scale: 0.5,
			scrollTrigger: {
				trigger: '.about',
				start: 'top-=380 50%',
				end: 'bottom-=180 100%',
				scrub: 2,
				// markers: true,
			},
		})

		gsap.from('.about__item', {
			x: 2200,
			duration: 1.2,
			stagger: 0.3,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: '.about',
				start: 'top 20%',
				end: 'bottom 20%',
				toggleActions: 'play reverse play reverse',
				// markers: true,
			},
		})

		gsap.to('.about', {
			scale: 0.7,
			scrollTrigger: {
				trigger: '.fixtures',
				start: 'top 50%',
				end: 'bottom 100%',
				scrub: 2,
				// markers: true,
			},
		})

		gsap.from('.fixtures__title-box .title-box__title', {
			opacity: 0,
			scrollTrigger: {
				trigger: '.fixtures',
				start: 'top-=100 50%',
				end: 'bottom 100%',
				scrub: 2,
				// markers: true,
			},
		})

		gsap.from('.fixtures-slider', {
			x: 1800,
			scrollTrigger: {
				trigger: '.fixtures',
				start: 'top-=150 50%',
				end: 'bottom-=50 100%',
				scrub: 2,
				// markers: true,
			},
		})

		gsap.to('.fixtures', {
			scale: 0.7,
			scrollTrigger: {
				trigger: '.services',
				start: 'top 50%',
				end: 'bottom 100%',
				scrub: 2,
				// markers: true,
			},
		})

		gsap.from('.services__title-box .title-box__title', {
			opacity: 0,
			scrollTrigger: {
				trigger: '.services',
				start: 'top-=250 50%',
				end: 'bottom-=150 100%',
				scrub: 2,
				// markers: true,
			},
		})

		gsap.from('.item-services:nth-child(odd)', {
			x: 1800,
			opacity: 0,
			scrollTrigger: {
				trigger: '.fixtures',
				start: 'top start',
				end: 'bottom-=100 end',
				scrub: 2,
				// markers: true,
			},
		})

		gsap.from('.item-services:nth-child(even)', {
			x: -1800,
			opacity: 0,
			scrollTrigger: {
				trigger: '.fixtures',
				start: 'top start',
				end: 'bottom-=100 end',
				scrub: 2,
				// markers: true,
			},
		})

		gsap.to('.services', {
			scale: 0.7,
			scrollTrigger: {
				trigger: '.projects',
				start: 'top 50%',
				end: 'bottom 100%',
				scrub: 2,
				// markers: true,
			},
		})

		gsap.from('.projects__title-box .title-box__title', {
			opacity: 0,
			scrollTrigger: {
				trigger: '.projects',
				start: 'top-=200 50%',
				end: 'bottom-=850 100%',
				scrub: 2,
				// markers: true,
			},
		})

		gsap.from('.projects__title-box .title-box__text-holder', {
			opacity: 0,
			scrollTrigger: {
				trigger: '.projects',
				start: 'top-=200 50%',
				end: 'bottom-=850 100%',
				scrub: 2,
				// markers: true,
			},
		})

		gsap.to('.projects', {
			scale: 0.7,
			scrollTrigger: {
				trigger: '.reviews',
				start: 'top 50%',
				end: 'bottom 100%',
				scrub: 2,
				// markers: true,
			},
		})

		if (window.innerHeight < 800) {
			gsap.from('.projects-slide__right-col', {
				scale: 0.5,
				scrollTrigger: {
					trigger: '.projects',
					start: 'top-=850 50%',
					end: 'bottom-=880 100%',
					scrub: 2,
					// markers: true,
				},
			})

			gsap.from('.projects-slide__left-col', {
				scale: 0.5,
				scrollTrigger: {
					trigger: '.projects',
					start: 'top-=850 50%',
					end: 'bottom-=880 100%',
					scrub: 2,
					// markers: true,
				},
			})

			gsap.from('.pagination-projects-slide', {
				x: 2200,
				duration: 1.2,
				stagger: 0.3,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: '.projects-slider',
					start: 'top+=750 50%',
					end: 'bottom+=220 100%',
					toggleActions: 'play none none none',
					// markers: true,
				},
			})
		} else {
			gsap.from('.projects-slide__right-col', {
				scale: 0.5,
				scrollTrigger: {
					trigger: '.projects',
					start: 'top-=250 50%',
					end: 'bottom-=450 100%',
					scrub: 2,
					// markers: true,
				},
			})

			gsap.from('.projects-slide__left-col', {
				scale: 0.5,
				scrollTrigger: {
					trigger: '.projects',
					start: 'top-=250 50%',
					end: 'bottom-=450 100%',
					scrub: 2,
					// markers: true,
				},
			})

			gsap.from('.pagination-projects-slide', {
				x: 2200,
				duration: 1.2,
				stagger: 0.3,
				ease: 'power3.out',
				scrollTrigger: {
					trigger: '.projects-slider',
					start: 'top+=250 50%',
					end: 'bottom+=230 0%',
					toggleActions: 'play none none none',
					// markers: true,
				},
			})
		}

		gsap.from('.reviews__title-box .title-box__title', {
			opacity: 0,
			scrollTrigger: {
				trigger: '.reviews',
				start: 'top-=100 50%',
				end: 'bottom 100%',
				scrub: 2,
				// markers: true,
			},
		})

		gsap.from('.reviews__title-box .title-box__text-holder', {
			opacity: 0,
			scrollTrigger: {
				trigger: '.reviews',
				start: 'top-=100 50%',
				end: 'bottom 100%',
				scrub: 2,
				// markers: true,
			},
		})

		gsap.from('.reviews__card', {
			x: 1800,
			duration: 1.2,
			stagger: 0.3,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: '.reviews',
				start: 'top 75%',
				end: 'bottom 0%',
				toggleActions: 'play reverse play reverse',
				// markers: true,
			},
		})

		gsap.from('.reviews__right-col .btn', {
			opacity: 0,
			duration: 2,
			scrollTrigger: {
				trigger: '.reviews',
				start: 'top 75%',
				end: 'bottom 0%',
				toggleActions: 'play reverse play reverse',
				// markers: true,
			},
		})

		gsap.to('.reviews', {
			scale: 0.7,
			scrollTrigger: {
				trigger: '.footer',
				start: 'top 50%',
				end: 'bottom 100%',
				scrub: 2,
				// markers: true,
			},
		})
	}
}
