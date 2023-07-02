var Gpio = require('onoff').Gpio; 
var LED = new Gpio(4, 'out'); 
var pushButton = new Gpio(17, 'in', 'both'); //GPIO pin 17 input

pushButton.watch(function (err, value) { 
  if (err) { 
    console.error('An unexpected error occurred.', err); 
  return;
  }
  LED.writeSync(value); 
});
function unexportOnClose() {
  LED.writeSync(0); 
  LED.unexport(); 
  pushButton.unexport(); 
};
process.on('SIGINT', unexportOnClose); 
