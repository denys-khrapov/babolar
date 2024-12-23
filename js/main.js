document.addEventListener('DOMContentLoaded', function () {
	updateThemePreference()
	setupThemeToggle()
	initMobileMenu()
	initSwiper()
	// Updates the theme based on system settings
	function updateThemePreference() {
		const html = document.documentElement
		const prefersDarkScheme = window.matchMedia(
			'(prefers-color-scheme: dark)'
		).matches
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

		burgerMenu.addEventListener('click', () => {
			menu.classList.toggle('active')
		})

		closeBurgerMenu.addEventListener('click', () => {
			menu.classList.remove('active')
		})
	}

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

	document.addEventListener('fullscreenchange', function () {
		const video = document.getElementById('myVideo')

		if (!document.fullscreenElement) {
			video.muted = true
		}
	})

	// For Safari
	document.addEventListener('webkitfullscreenchange', function () {
		const video = document.getElementById('myVideo')

		if (!document.webkitFullscreenElement) {
			video.muted = true
		}
	})

	function initSwiper() {
		let fixturesSwiper = new Swiper('.fixtures-slider', {
			spaceBetween: 16,
			slidesPerView: 'auto',
			navigation: {
				nextEl: '.nav-slider__button-next',
				prevEl: '.nav-slider__button-prev',
			},
		})
	}
})
