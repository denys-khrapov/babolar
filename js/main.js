document.addEventListener('DOMContentLoaded', function () {
	updateThemePreference()
	setupThemeToggle()
	initMobileMenu()
	initSwiper()

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
				nextEl: '.fixtures__nav .nav-slider__button-next',
				prevEl: '.fixtures__nav .nav-slider__button-prev',
			},
		})

		let heroSwiper = new Swiper('.hero-slider', {
			effect: 'fade',
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
		const projectsNextButton = document.querySelector('.projects__nav .nav-slider__button-next')
		const projectsPrevButton = document.querySelector('.projects__nav .nav-slider__button-prev')
		const paginationSlides = document.querySelectorAll('.pagination-projects-slide')

		function scrollToProjectsSection() {
			const projectsSection = document.querySelector('#projects-section')
			const header = document.querySelector('.header')

			if (projectsSection) {
				if (window.innerWidth < 1279 && header) {
					const heightHeader = header.clientHeight - 1
					console.log(`${heightHeader}`)

					const sectionTopPosition = projectsSection.getBoundingClientRect().top + window.scrollY
					window.scrollTo({
						top: sectionTopPosition - heightHeader,
					})
				} else if (window.innerWidth >= 1279) {
					projectsSection.scrollIntoView({
						block: 'start',
					})
				}
			}
		}

		paginationSlides.forEach(slide => {
			let isDragging = false

			slide.addEventListener('pointerdown', () => {
				isDragging = false
			})

			slide.addEventListener('pointermove', () => {
				isDragging = true
			})

			slide.addEventListener('pointerup', () => {
				if (!isDragging) {
					scrollToProjectsSection()
				}
			})

			slide.addEventListener('pointercancel', () => {
				isDragging = false
			})
		})

		projectsNextButton.addEventListener('click', () => {
			scrollToProjectsSection()
		})

		projectsPrevButton.addEventListener('click', () => {
			scrollToProjectsSection()
		})

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

	///////////////////////

	const updateDeleteIcons = () => {
		const fileHolders = document.querySelectorAll('.form__file-holder')
		fileHolders.forEach((holder, index) => {
			const deleteIcon = holder.querySelector('.delete-file')
			if (fileHolders.length === 1) {
				deleteIcon.style.display = 'none' // Ховаємо іконку, якщо блок один
			} else {
				deleteIcon.style.display = '' // Повертаємо іконку, якщо блоків більше одного
			}
		})
	}

	// Функція для обробки вибору файлу
	document.body.addEventListener('change', e => {
		if (e.target.classList.contains('wpcf7-file')) {
			const fileInput = e.target
			const fileName = fileInput.files[0]?.name || 'Select file to upload'
			const fileLabel = fileInput.closest('.form__row--file').querySelector('.file-label')

			// Обрізаємо назву файлу до 15 символів
			fileLabel.textContent = fileName.length > 25 ? fileName.substring(0, 25) + '...' : fileName
		}
	})

	// Додавання нового поля для завантаження файлу
	const addButton = document.querySelector('.another-file')
	addButton.addEventListener('click', () => {
		const fileRow = document.querySelector('.form__row--file')
		if (!fileRow) return // Перевірка, якщо немає жодного блоку

		const newFileRow = fileRow.cloneNode(true) // Копіюємо існуючий елемент

		// Очищуємо скопійований input та текст
		const input = newFileRow.querySelector('.wpcf7-file')
		input.value = ''
		newFileRow.querySelector('.file-label').textContent = 'Select file to upload'

		// Створюємо унікальний ID для нового поля і відповідної мітки
		const uniqueId = `file-${Date.now()}`
		input.id = uniqueId
		newFileRow.querySelector('label').setAttribute('for', uniqueId)

		// Додаємо скопійований елемент у розмітку
		fileRow.parentNode.insertBefore(newFileRow, addButton.closest('.form__row'))

		updateDeleteIcons() // Оновлюємо видимість іконок видалення
	})

	// Видалення блоку при кліку на "крестик"
	document.body.addEventListener('click', e => {
		if (e.target.classList.contains('delete-file')) {
			const fileRow = e.target.closest('.form__row--file') // Знаходимо батьківський блок .form__row--file
			if (fileRow) {
				fileRow.remove() // Видаляємо блок .form__row--file
				updateDeleteIcons() // Оновлюємо видимість іконок видалення
			}
		}
	})

	// Виклик функції для початкової перевірки
	updateDeleteIcons()
})
