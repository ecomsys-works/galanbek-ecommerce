/*-------------------------------------------------------------------------------------------------------------------------------------------
Импорт в main.js
---------------------------------------------------------------------------------------------------------------------------------------------*/
// import autoREM from './helpers/auto-rem';
// autoREM(1440, 16);

/* -------------------------------------------------------------------------------------------------------------------------------------------------
AutoREM - функция для установки масштабирования в автоматическом режиме (на всю ширину экрана) 
-----------------------------------------------------------------------------------------------------------------------------------------------------*/
export default function autoREM(baseSiteWidth, baseFontSize) {
	const htmlElement = document.documentElement;
	const widthFactor = 0.69; // сайт занимает 80% ширины

	function updateFontSize() {
		const screenWidth = window.innerWidth;

		// масштаб с учётом 80%
		const scaleFactor = (screenWidth * widthFactor) / baseSiteWidth;

		const newFontSize = baseFontSize * scaleFactor;

		if (screenWidth >= baseSiteWidth) {
			htmlElement.style.fontSize = `${newFontSize}px`;
		}
	}

	window.addEventListener("resize", updateFontSize);
	updateFontSize();
}