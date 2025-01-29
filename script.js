const messageElement = document.getElementById('message');

fetch('https://script.google.com/macros/s/AKfycbyHivdCVJGe5_ABuW5WCfh710z2eRnjTGg6srMfSXSYztBueBD-l76bWmx4aEMEwGNH/exec', {
  mode: 'no-cors'
})
.then(response => {
  // Handle the response even if it's opaque (no access to data)
  console.log('Response:', response);
})
.catch(error => {
  console.error('Error fetching data:', error);
  messageElement.textContent = 'Error loading message.';
});
