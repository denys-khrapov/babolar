document.addEventListener('DOMContentLoaded', function () {
	updateThemePreference()
	setupThemeToggle()
	initMobileMenu()
	// Обновляет тему на основе системных настроек
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

	// Настраивает переключение между темами
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

	// Обновляет состояние кнопок (выделяет активную)
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

	// Временно отключает анимации
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

	Fancybox.bind('[data-fancybox]', {
		// Your custom options
	})

	document.getElementById('playButton').addEventListener('click', function () {
		const video = document.getElementById('myVideo')

		// Відкрити відео у повноекранному режимі
		if (video.requestFullscreen) {
			video.requestFullscreen()
		} else if (video.webkitRequestFullscreen) {
			// Safari
			video.webkitRequestFullscreen()
		} else if (video.msRequestFullscreen) {
			// IE/Edge
			video.msRequestFullscreen()
		}

		// Увімкнути звук і запустити відео
		video.muted = false
		video.play()
	})

	// Відстеження виходу з повноекранного режиму
	document.addEventListener('fullscreenchange', function () {
		const video = document.getElementById('myVideo')

		if (!document.fullscreenElement) {
			// Якщо відео вийшло з повноекранного режиму, вимикаємо звук
			video.muted = true
		}
	})

	// Для Safari
	document.addEventListener('webkitfullscreenchange', function () {
		const video = document.getElementById('myVideo')

		if (!document.webkitFullscreenElement) {
			// Якщо відео вийшло з повноекранного режиму, вимикаємо звук
			video.muted = true
		}
	})
})
