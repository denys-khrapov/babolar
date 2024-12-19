document.addEventListener('DOMContentLoaded', function () {
	updateThemePreference();
	setupThemeToggle();

	// Обновляет тему на основе системных настроек
	function updateThemePreference() {
		const html = document.documentElement;
		const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const themeClass = 'dark-theme';

		withoutTransition(() => {
			if (prefersDarkScheme) {
				html.classList.add(themeClass);
				updateButtonState(true);
			} else {
				html.classList.remove(themeClass);
				updateButtonState(false);
			}
		});
	}

	// Настраивает переключение между темами
	function setupThemeToggle() {
		const buttons = document.querySelectorAll('.theme-toggle');

		buttons.forEach(button => {
			button.addEventListener('click', event => {
				event.preventDefault();

				const isDarkMode = button.classList.contains('dark');

				withoutTransition(() => {
					document.documentElement.classList.toggle('dark-theme', isDarkMode);
					updateButtonState(isDarkMode);
				});
			});
		});
	}

	// Обновляет состояние кнопок (выделяет активную)
	function updateButtonState(isDarkMode) {
		const lightButton = document.querySelector('.theme-toggle.light');
		const darkButton = document.querySelector('.theme-toggle.dark');

		if (isDarkMode) {
			lightButton.classList.remove('active');
			darkButton.classList.add('active');
		} else {
			lightButton.classList.add('active');
			darkButton.classList.remove('active');
		}
	}

	// Временно отключает анимации
	function withoutTransition(callback) {
		const html = document.documentElement;
		html.style.transition = 'none';
		callback();
		setTimeout(() => {
			html.style.transition = '';
		}, 0);
	}
});
