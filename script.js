const messageElement = document.getElementById('message');

fetch('https://script.google.com/macros/s/AKfycbyHivdCVJGe5_ABuW5WCfh710z2eRnjTGg6srMfSXSYztBueBD-l76bWmx4aEMEwGNH/exec')
  .then(response => response.text())
  .then(data => {
    messageElement.textContent = data;
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    messageElement.textContent = 'Error loading message.';
  });
