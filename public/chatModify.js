const checkbox = document.getElementById('checkbox');

checkbox.addEventListener('change', (e) => {
	document.body.classList.toggle('dark')
});

const color = document.querySelectorAll('.color');

const item1 = document.querySelectorAll('.Message.Their p');
const item2 = document.querySelector('.sendMessage form button i');
const item4 = document.querySelector('.tableLeft #saveColor');
const item5 = document.querySelector('.tableLeft button i');
const item6 = document.querySelector('.tableRight img');
const item7 = document.querySelector('.tableRight button i');
const item8 = document.querySelector('.tableRight #usernameBtn');
// const item9 = document.querySelector('.container .nameChat button i');
const item9 = document.querySelectorAll('.container .nameChat button i');
const item10 = document.querySelector('.container .nameChat h1');
const item11 = document.querySelectorAll('.Message.Your p');

color1.addEventListener('click', (e) => {
	modColor('#772ce8', '#a970ff')
	for (i=0; i < color.length; i++) {
		color[i].classList.remove('active');
	} color1.classList.add('active')
});

color2.addEventListener('click', (e) => {
	modColor('#2ecf76', '#bdc473')
	for (i=0; i < color.length; i++) {
		color[i].classList.remove('active');
	} color2.classList.add('active')
});

color3.addEventListener('click', (e) => {
	modColor('#2856ba', '#588ca4')
	for (i=0; i < color.length; i++) {
		color[i].classList.remove('active');
	} color3.classList.add('active')
});

color4.addEventListener('click', (e) => {
	modColor('#e2563b', '#d3ce47')
	for (i=0; i < color.length; i++) {
		color[i].classList.remove('active');
	} color4.classList.add('active')
});

function modColor(color1, color2) {
	for (i = 0; i < item1.length; i++) {
		item1[i].style.backgroundColor = color1;
	}

	for (i = 0; i < item11.length; i++) {
		item11[i].style.backgroundColor = color2;
	}

	for (i = 0; i < item9.length; i++) {
		item9[i].style.color = color1;
	}

	item2.style.color = color1;
	item4.style.backgroundColor = color1;
	item5.style.color = color1;
	item6.style.border = '6px solid' + color1;
	item6.style.backgroundColor = color1;
	item7.style.color = color1;
	item8.style.backgroundColor = color1;
	item10.style.color = color1;
}