var Gpio = require('onoff').Gpio;
var button = new Gpio(18, 'in', 'falling');

button.watch(function(err, value) {
	if(err) {
		throw err;
	}
	
	console.log('button pressed');
});

process.on('SIGINT', function() {
	led.unexport();
	button.unexport();
});



//const twilio = require('twilio')
//const debounce = require('debounce')

//const ACCOUNT_SID = "AC27da05dc90ddba09205ec309d13fbf8e"
//const AUTH_TOKEN = "c9a66fa30dd52452d15ad3178faa8a92"
//const FROM_PHONE_NUMBER = "+17276148649"
//const TO_PHONE_NUMBER = "+17279024583"
/*
const button = new Gpio(3, 'in', 'falling')

const phone = new twilio(ACCOUNT_SID, AUTH_TOKEN)

const sendMessage = debounce(() => {
  phone.messages.create({
    from: FROM_PHONE_NUMBER,
    to: TO_PHONE_NUMBER,
    body: 'I need to go to the bathroom!', 
  }).then((message) => console.log(message.sid));
}, 10000, true)

button.watch((err) => {
  if (err) {
    throw err
  }
	console.log("Pressed")
  sendMessage()
})

process.on('SIGINT', () => {
  button.unexport() 
})
*/
