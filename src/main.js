//burger-menu
document.querySelector(".burger-menu").addEventListener("click", () => {
	document.querySelector(".burger-menu").classList.toggle("burger-menu-close");
	document.querySelector(".menu").classList.toggle("menu-show");
	document.querySelector("body").classList.toggle("no-scroll");
});
document.querySelectorAll(".menu-link").forEach (item => {
	item.addEventListener("click", () => {
		document.querySelector("body").classList.toggle("no-scroll");
		document.querySelector(".burger-menu").classList.toggle("burger-menu-close");
		document.querySelector(".menu").classList.toggle("menu-show");		
	});
})
// slider
const images = [{
	url: './images/slider-image1.jpg'
}, {
	url: './images/slider-image2.jpg'
}, {
	url: './images/slider-image3.jpg'
}
];

function initSlider() {
	if (!images || !images.length) {
		console.log('error');
		return;
	}

	const sliderImages = document.querySelector(".slider-images");
	const sliderImagesMobile = document.querySelector(".slider-images-mobile");
	const sliderControl = document.querySelector(".slider-control");
	const sliderButtons = document.querySelector(".slider-buttons");
	const projectInfo = document.querySelector(".completed-info");

	initImages();
	initArrows();
	initDots();
	initButtons();

	function initImages() {
		images.forEach((image, index) => {
			let imageDiv = `<div class="image n${index} ${index === 0 ? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
			sliderImages.innerHTML += imageDiv;
			sliderImagesMobile.innerHTML += imageDiv
		});
	}

	/* below there are a little bit complicated combinations of selectors because i did not want to add/remove classes from "design studio project part of which this slider is */

	function initArrows() {
		sliderControl.querySelectorAll(".arrow").forEach(arrow => {
			arrow.addEventListener("click", () => {
				let currNumber = +sliderImages.querySelector(".active").dataset.index;
				let nextNumber;

				if (arrow.classList.contains("left")) {
					nextNumber = currNumber === 0 ? images.length - 1 : currNumber - 1;
				} else {
					nextNumber = currNumber === images.length - 1 ? 0 : currNumber + 1;
				}
				moveSlider(nextNumber);
			})
		})
		document.querySelector(".slider-mobile").querySelectorAll(".arrow").forEach(arrow => {
			arrow.addEventListener("click", () => {
				let currNumber = +sliderImages.querySelector(".active").dataset.index;
				let nextNumber;

				if (arrow.classList.contains("left") && arrow.classList.contains("left")) {
					nextNumber = currNumber === 0 ? images.length - 1 : currNumber - 1;
				} else {
					nextNumber = currNumber === images.length - 1 ? 0 : currNumber + 1;
				}

				moveSlider(nextNumber);
			})
		})
	}

	function initDots() {
		sliderControl.querySelectorAll(".nav-button:nth-child(2), .nav-button:nth-child(3),	.nav-button:nth-child(4)").forEach((dot, index) => {
			dot.classList.add(`n${index}`);

			if (index === +sliderImages.querySelector(".active").dataset.index) {
				dot.classList.add("active");
			}

			dot.addEventListener("click", () => {
				moveSlider(index);
			})
		})
	}

	function changeInfo(index) {
		//array of objects with project's info
		let completedProjects = [{
			"city": "Rostov-on-Don<br>LCD admiral",
			"time": "3.5 months",
			"area": "81 m2"
		}, {
			"city": "Sochi<br>Thieves",
			"time": "4 months",
			"area": "105 m2"
		}, {
			"city": "Rostov-on-Don<br>Patriotic",
			"time": "3 months",
			"area": "93 m2"
		}]

		switch (index) {
			case 0:
				projectInfo.querySelector("dl:first-child .list-details:nth-child(2)").innerHTML = completedProjects[index].city;
				projectInfo.querySelector("dl:first-child .list-details:nth-child(4)").textContent = completedProjects[index].time;
				projectInfo.querySelector("dl:last-child .list-details:nth-child(2)").textContent = completedProjects[index].area;
				break;
		}
		switch (index) {
			case 1:
				projectInfo.querySelector("dl:first-child .list-details:nth-child(2)").innerHTML = completedProjects[index].city;
				projectInfo.querySelector("dl:first-child .list-details:nth-child(4)").textContent = completedProjects[index].time;
				projectInfo.querySelector("dl:last-child .list-details:nth-child(2)").textContent = completedProjects[index].area;
				break;
		}
		switch (index) {
			case 2:
				projectInfo.querySelector("dl:first-child .list-details:nth-child(2)").innerHTML = completedProjects[index].city;
				projectInfo.querySelector("dl:first-child .list-details:nth-child(4)").textContent = completedProjects[index].time;;
				projectInfo.querySelector("dl:last-child .list-details:nth-child(2)").textContent = completedProjects[index].area;
				break;
		}
	};

	function initButtons() {
		sliderButtons.querySelectorAll(".slider-button").forEach((btn, index) => {
			btn.classList.add(`n${index}`)

			if (index === +sliderImages.querySelector(".active").dataset.index) {
				btn.classList.add("active");
			}

			btn.addEventListener("click", () => {
				moveSlider(index);
			})
		})
	}

	function moveSlider(num) {
		sliderImages.querySelector(".active").classList.remove("active");
		sliderImages.querySelector(`.n${num}`).classList.add("active");
		sliderImagesMobile.querySelector(".active").classList.remove("active");
		sliderImagesMobile.querySelector(`.n${num}`).classList.add("active");
		sliderControl.querySelector(".nav-button.active").classList.remove("active");
		sliderControl.querySelector(`.nav-button.n${num}`).classList.add("active");
		sliderButtons.querySelector(".slider-button.active").classList.remove("active");
		sliderButtons.querySelector(`.slider-button.n${num}`).classList.add("active");
		//function changes completed projects
		changeInfo(num);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	initSlider();
});