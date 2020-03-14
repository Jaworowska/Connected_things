var serial; // variable to hold an instance of the serialport library
var portName = '/dev/ttyACMO';
var inData;
var options = { baudrate: 9600}; // change the data rate to whatever you wish
var circleSize = 50;
 
//function setup() {
 //serial = new p5.SerialPort(); // make a new instance of the serialport library
 //serial.on('list', printList); // set a callback function for the serialport list event
 
 //serial.list(); // list the serial ports
//}

function setup() {
  createCanvas(400, 300);
  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
  serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
  
  
serial.open(portName, options);
}



function serverConnected() {
  console.log('connected to server.');
}
 
function portOpen() {
  console.log('the serial port opened.')
}



function serialEvent() {
  // read a line of text in from the serial port:
  var data = serial.readLine();
  console.log(data);
  // if you've got a valid line, convert it to a number:
  if (data.length > 0) {
    circleSize = int(data) / 4;
  }
  // send a byte to the microcontroller
  // to prompt it to respond with another reading:
  serial.write('x');
}


 
//function serialEvent() {
  //inData = Number(serial.read());
//}
 
function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  console.log('The serial port closed.');
}

function draw() {
  
  background('#3399FF');
 fill('#DDFFFF');
 // draw a circle at the middle of the screen:
 ellipse(width/2, height/2, circleSize, circleSize);
  
  //background(0);
  //fill(255);
  text("sensor value: " + inData, 30, 30);
}



  

// get the list of ports:
function printList(portList) {
 // portList is an array of serial port names
 for (var i = 0; i < portList.length; i++) {
 // Display the list the console:
 console.log(i + " " + portList[i]);
 }
}