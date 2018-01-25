require('dotenv').config();
var Gpio = require('onoff').Gpio;
var twilio = require('twilio');
var debounce = require('debounce');
var button = new Gpio(18, 'in', 'falling');

const { 
	ACCOUNT_SID,
	AUTH_TOKEN,
	FROM_PHONE_NUMBER,
	TO_PHONE_NUMBER_ONE,
	TO_PHONE_NUMBER_TWO
	} = process.env;
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


