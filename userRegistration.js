const EventEmitter = require('events');


const eventEmitter = new EventEmitter();


eventEmitter.on('userRegistered', (username, email) => {
  console.log(`User ${username} has been successfully registered with email ${email}!`);

  
  setTimeout(() => {
    eventEmitter.emit('sendConfirmationEmail', email);
  }, 2000);
});


eventEmitter.on('sendConfirmationEmail', (email) => {
  console.log(`Confirmation email sent to ${email}`);
});


const sampleUsername = 'JohnDoe';
const sampleEmail = 'johndoe@example.com';

eventEmitter.emit('userRegistered', sampleUsername, sampleEmail);
