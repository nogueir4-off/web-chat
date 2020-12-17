const chat = document.getElementById('chat');
var userInput;//prompt('seu nome:') // document.querySelector('input[name=username]'); 
const messageInput = document.querySelector('#chat input'); 
const containerMessage = document.querySelector('.Messages');

const abrir = document.getElementById('sideBar');
const cont = document.querySelector('.container');
const pane = document.querySelector('.tableLeft');
const fechar = document.getElementById('fechar');
const imgProfile = document.getElementById('imgProfile');
const form = document.querySelector('.tableRight form')
const saveColor = document.getElementById('saveColor');

const color1 = document.querySelector('.color.um');
const color2 = document.querySelector('.color.dois');
const color3 = document.querySelector('.color.tres');
const color4 = document.querySelector('.color.quatro');

window.onload = genIcon();

saveColor.addEventListener('click', () => {
    cont.classList.remove('show');
    pane.style.opacity = '0';
    cont.style.pointerEvents = 'auto';
    pane.style.pointerEvents = 'none';
})

fechar.addEventListener('click', () => {
    cont.classList.remove('show');
    pane.style.opacity = '0';
    cont.style.pointerEvents = 'auto';
    pane.style.pointerEvents = 'none';
})

abrir.addEventListener('click', () => {
    cont.classList.add('show');
    pane.style.opacity = '1';
    cont.style.pointerEvents = 'none';
    pane.style.pointerEvents = 'auto';
})

const btnUpdateName = document.getElementById('usernameBtn');
const open1 = document.getElementById('nameUser');
const painel1 = document.querySelector('.tableRight');
const close1 = document.querySelector('#sideBarClose1');
const input1 = document.querySelector('.tableRight input')

const usersCont = document.querySelector('.peoples');

form.addEventListener('submit', (e) => {
	e.preventDefault();

	if (input1.value) { 
    	closeName();
	}
})

close1.addEventListener('click', () => {
	small = document.querySelector('.tableRight form small');
	small1 = document.getElementById('small1');

	if (input1.value || userInput) { 
	    cont.classList.remove('show');
	    painel1.style.opacity = '0';
	    cont.style.pointerEvents = 'auto';
	    painel1.style.pointerEvents = 'none';

		small.style.display = 'none';
		small1.style.display = 'none';
		// painel1.style.display = 'none';	
	}
})

open1.addEventListener('click', () => {
    cont.classList.add('show');
    painel1.style.opacity = '1';
    cont.style.pointerEvents = 'none';
	painel1.style.pointerEvents = 'auto';
	// painel1.style.display = 'flex';	
})

function closeName() {	
	const valueName = input1.value.toLowerCase().trim();
	small = document.querySelector('.tableRight form small');
	small1 = document.getElementById('small1');

	if (userInput == valueName) {
		small.style.display = 'flex';
		small1.style.display = 'none';
	} else {
		socket.emit('nameUserNow', valueName);

		socket.on('nameIsUsed', res => {
			if (res == false) {
				socket.emit('removeThisName', userInput);

				cont.classList.remove('show');
			    cont.style.pointerEvents = 'auto';
			    // pane.style.pointerEvents = 'none';
	    		painel1.style.pointerEvents = 'none';
				painel1.style.opacity = '0';
				small.style.display = 'none';
				small1.style.display = 'none';


	    		userInput = valueName;
			} else if (res == true) {
				small.style.display = 'none';
				small1.style.display = 'flex';
			}
		})
	}

}


var socket = io('https://web-chat-app-v01.herokuapp.com/')
// var socket = io('http://localhost:3000')

var colorYourNow = 'purple';
var colorTheirNow = 'purple1';

color1.addEventListener('click', () => {
	var colorYour= containerMessage.querySelectorAll('.Message.Your');
	var colorTheir = containerMessage.querySelectorAll('.Message.Their');

	for (i=0; i < colorYour.length; i++) {
		colorYour[i].classList.add('purple')
		colorYour[i].classList.remove('green')
		colorYour[i].classList.remove('orange')
		colorYour[i].classList.remove('blue')
	}

	colorYourNow = 'purple';
	colorTheirNow = 'purple1';
});

color2.addEventListener('click', () => {
	var colorYour= containerMessage.querySelectorAll('.Message.Your');
	var colorTheir = containerMessage.querySelectorAll('.Message.Their');

	for (i=0; i < colorYour.length; i++) {
		colorYour[i].classList.remove('purple')
		colorYour[i].classList.add('green')
		colorYour[i].classList.remove('orange')
		colorYour[i].classList.remove('blue')
	}

	colorYourNow = 'green';
	colorTheirNow = 'green1';
});

color3.addEventListener('click', () => {
	var colorYour= containerMessage.querySelectorAll('.Message.Your');
	var colorTheir = containerMessage.querySelectorAll('.Message.Their');

	for (i=0; i < colorYour.length; i++) {
		colorYour[i].classList.remove('purple')
		colorYour[i].classList.remove('green')
		colorYour[i].classList.add('blue')
		colorYour[i].classList.remove('orange')
	}

	colorYourNow = 'blue';
	colorTheirNow = 'blue1';
});

color4.addEventListener('click', () => {
	var colorYour= containerMessage.querySelectorAll('.Message.Your');
	var colorTheir = containerMessage.querySelectorAll('.Message.Their');

	for (i=0; i < colorYour.length; i++) {
		colorYour[i].classList.remove('purple')
		colorYour[i].classList.remove('green')
		colorYour[i].classList.remove('blue')
		colorYour[i].classList.add('orange')
	}

	colorYourNow = 'orange';
	colorTheirNow = 'orange1';
});


function renderMessage(message) {
	messageObj = document.createElement('div');

	if (message.author == userInput) {
		messageObj.classList.add('Message')
		messageObj.classList.add('Your')
		messageObj.classList.add(colorYourNow) //
	} else {
		messageObj.classList.add('Message')
		messageObj.classList.add('Their')
		messageObj.classList.add(colorTheirNow) //
	}
	
	messageObj.innerHTML = `<p><span class='nick'>${message.author}</span> ${message.message}</p>`	
	containerMessage.appendChild(messageObj);
}

socket.on('newUsers', users => {
	if(document.querySelector('.people')) {
		while(document.querySelector('.people')) {
			document.querySelector('.people').remove();
		}
	}
	
	users.forEach(element => {
		divU = document.createElement('div');
		divU.classList.add('people');
		divU.innerHTML = `<i class="fas fa-angle-right"></i><p>${element}</p>`;
		usersCont.appendChild(divU);
	})
})

socket.on('receivedMessage', function(message) {
	renderMessage(message)
})

chat.addEventListener('submit', function(event) {
	event.preventDefault();

	var author = userInput;
	var message = messageInput.value;

	if (author.length && message.length) {
		var messageObject = {
			author: author,
			message: message,
		};

		renderMessage(messageObject);

		socket.emit('sendMessage', messageObject);
	}

	containerMessage.scrollTop = containerMessage.scrollHeight - containerMessage.clientHeight;
	messageInput.value = "";
})

function genIcon() {
	letters = 'abcdefghijklmnopqrstuvwxyz0123456789'; //36
	seed = '';
	for(i=0; i < 8; i++) {
		gen = letters[Math.floor(Math.random() * 35)]
		seed += gen
	}

	url = `https://avatars.dicebear.com/4.5/api/gridy/:${seed}.svg?&m=6`
	imgProfile.src = url;
}