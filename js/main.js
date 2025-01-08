document.addEventListener('DOMContentLoaded', function () {
	updateThemePreference()
	setupThemeToggle()
	initMobileMenu()
	if (
		document.querySelector('.fixtures-slider') ||
		document.querySelector('.hero-slider') ||
		document.querySelector('.pagination-projects-slider') ||
		document.querySelector('.projects-slider')
	) {
		initSwiper()
	}

	Fancybox.bind('[data-fancybox]', {})

	// Updates the theme based on system settings
	function updateThemePreference() {
		const html = document.documentElement
		const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches
		const themeClass = 'dark-theme'

		withoutTransition(() => {
			if (prefersDarkScheme) {
				html.classList.add(themeClass)
				updateButtonState(true)
			} else {
				html.classList.remove(themeClass)
				updateButtonState(false)
			}
		})
	}

	// Regular expression
	document.addEventListener('input', function (event) {
		if (event.target.matches('input[type="tel"]')) {
			event.target.value = event.target.value.replace(/[^0-9\+\-\(\)\s]/g, '')
		}
	})

	// Configures switching between themes
	function setupThemeToggle() {
		const buttons = document.querySelectorAll('.theme-toggle')

		buttons.forEach(button => {
			button.addEventListener('click', event => {
				event.preventDefault()

				const isDarkMode = button.classList.contains('dark')

				withoutTransition(() => {
					document.documentElement.classList.toggle('dark-theme', isDarkMode)
					updateButtonState(isDarkMode)
				})
			})
		})
	}

	// Updates the state of the buttons (highlights the active one)
	function updateButtonState(isDarkMode) {
		const lightButton = document.querySelector('.theme-toggle.light')
		const darkButton = document.querySelector('.theme-toggle.dark')

		if (isDarkMode) {
			lightButton.classList.remove('active')
			darkButton.classList.add('active')
		} else {
			lightButton.classList.add('active')
			darkButton.classList.remove('active')
		}
	}

	// Temporarily disables animations
	function withoutTransition(callback) {
		const html = document.documentElement
		html.style.transition = 'none'
		callback()
		setTimeout(() => {
			html.style.transition = ''
		}, 0)
	}

	function initMobileMenu() {
		const burgerMenu = document.querySelector('.menu-burger')
		const closeBurgerMenu = document.querySelector('.menu-close')
		const menu = document.querySelector('.header__menu')
		const overlay = document.querySelector('.overlay')
		const menuItem = document.querySelectorAll('.menu-item')

		burgerMenu.addEventListener('click', () => {
			menu.classList.toggle('active')
		})

		closeBurgerMenu.addEventListener('click', () => {
			menu.classList.remove('active')
		})

		overlay.addEventListener('click', () => {
			menu.classList.remove('active')
		})

		menuItem.forEach(link => {
			link.addEventListener('click', () => {
				menu.classList.remove('active')
			})
		})
	}

	if (document.getElementById('playButton')) {
		document.getElementById('playButton').addEventListener('click', function () {
			const video = document.getElementById('myVideo')

			if (video.requestFullscreen) {
				video.requestFullscreen()
			} else if (video.webkitRequestFullscreen) {
				video.webkitRequestFullscreen()
			} else if (video.msRequestFullscreen) {
				video.msRequestFullscreen()
			}

			video.muted = false
			video.play()
		})
	}

	const linksInfoBlock = document.querySelectorAll('.test a')

	linksInfoBlock.forEach(link => {
		link.addEventListener('mouseover', () => {
			link.parentElement.classList.add('hovered')
		})

		link.addEventListener('mouseout', () => {
			link.parentElement.classList.remove('hovered')
		})

		link.addEventListener('mousedown', () => {
			link.parentElement.classList.add('actived')
		})

		link.addEventListener('mouseup', () => {
			link.parentElement.classList.remove('actived')
		})

		link.addEventListener('mouseleave', () => {
			link.parentElement.classList.remove('actived')
		})
	})

	document.addEventListener('fullscreenchange', function () {
		const video = document.getElementById('myVideo')

		if (!document.fullscreenElement) {
			video.muted = true

			ScrollTrigger.refresh()
		}
	})

	// For Safari
	document.addEventListener('webkitfullscreenchange', function () {
		const video = document.getElementById('myVideo')

		if (!document.webkitFullscreenElement) {
			video.muted = true

			ScrollTrigger.refresh()
		}
	})

	function initSwiper() {
		let fixturesSwiper = new Swiper('.fixtures-slider', {
			spaceBetween: 16,
			slidesPerView: 'auto',
			navigation: {
				nextEl: '.fixtures__nav .nav-slider__button-next',
				prevEl: '.fixtures__nav .nav-slider__button-prev',
			},
		})

		let heroSwiper = new Swiper('.hero-slider', {
			effect: 'fade',
			autoplay: {
				delay: 7000,
				disableOnInteraction: false,
			},
			fadeEffect: {
				crossFade: true,
			},
			speed: 800,
			slidesPerView: 1,
			navigation: {
				nextEl: '.hero__nav .nav-slider__button-next',
				prevEl: '.hero__nav .nav-slider__button-prev',
			},
			pagination: false,
		})

		heroSwiper.on('slideChange', () => {
			const activeIndex = heroSwiper.activeIndex
			document.querySelectorAll('.pagination-hero__item').forEach((el, index) => {
				el.classList.toggle('active', index === activeIndex)
			})
		})

		document.querySelectorAll('.pagination-hero__item').forEach((item, index) => {
			item.addEventListener('click', () => {
				heroSwiper.slideTo(index)
				document.querySelectorAll('.pagination-hero__item').forEach(el => el.classList.remove('active'))
				item.classList.add('active')
			})
		})

		let paginationProjectsSwiper = new Swiper('.pagination-projects-slider', {
			spaceBetween: 16,
			slidesPerView: 'auto',
			freeMode: true,
			watchSlidesProgress: true,
			breakpoints: {
				1280: {
					spaceBetween: 24,
				},
			},
		})

		let projectsSwiper = new Swiper('.projects-slider', {
			effect: 'fade',
			fadeEffect: {
				crossFade: true,
			},
			speed: 800,
			autoHeight: true,
			slidesPerView: 1,
			navigation: {
				nextEl: '.projects__nav .nav-slider__button-next',
				prevEl: '.projects__nav .nav-slider__button-prev',
			},
			thumbs: {
				swiper: paginationProjectsSwiper,
			},
		})
		const slidesCount = document.querySelectorAll('.projects-slider .swiper-slide').length

		if (slidesCount <= 5) {
			document.querySelector('.projects__nav').style.display = 'none'
		}

		let notificationClose = document.querySelector('.notification__close')
		let notification = document.querySelector('.notification')

		if (sessionStorage.getItem('notificationHidden') === 'true') {
			notification.classList.add('hide')
		}

		notificationClose.addEventListener('click', function () {
			notification.classList.add('hide')
			sessionStorage.setItem('notificationHidden', 'true')
		})
	}
})
