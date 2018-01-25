var Gpio = require('onoff').Gpio;
var twilio = require('twilio');
var debounce = require('debounce');
var button = new Gpio(18, 'in', 'falling');

const ACCOUNT_SID = "AC27da05dc90ddba09205ec309d13fbf8e";
const AUTH_TOKEN = "c9a66fa30dd52452d15ad3178faa8a92";
const FROM_PHONE_NUMBER = "+17276148649";
const TO_PHONE_NUMBER_ONE = "+17279024583";
const TO_PHONE_NUMBER_TWO = "+17276887576";
const UNOCCUPIED_MESSAGE = "The room is unoccupied!";
const OCCUPIED_MESSAGE = "The room is occupied";
const SECONDS_DELAY = 30;

var phone = new twilio(ACCOUNT_SID, AUTH_TOKEN);
var occupied = false;

const sendMessages = debounce((message) => {
	phone.messages.create({
		from: FROM_PHONE_NUMBER,
		to: TO_PHONE_NUMBER_ONE,
		body: message, 
	});
	
	phone.messages.create({
		from: FROM_PHONE_NUMBER,
		to: TO_PHONE_NUMBER_TWO,
		body: message, 
	});
	
	occupied = !occupied;
	
	console.log('sent');
}, (1000 * SECONDS_DELAY), true);

button.watch(function(err, value) {
	if(err) {
		throw err;
	}
	
	if(occupied) {
		sendMessages(UNOCCUPIED_MESSAGE);
	} else {
		sendMessages(OCCUPIED_MESSAGE);
	}
	
	console.log('pressed');
});

process.on('SIGINT', function() {
	led.unexport();
	button.unexport();
});


