const dateInputsContainer = document.getElementById('date-inputs');
const submitterNameInput = document.getElementById('submitter-name');

// Function to add a new date input field
function addDateInput() {
  const input = document.createElement('input');
  input.type = 'date';
  dateInputsContainer.appendChild(input);
}

// Initial date input
addDateInput(); 

function submitDates() {
  const selectedDates = Array.from(document.querySelectorAll('#date-inputs input[type="date"]'))
    .map(input => input.value);
  const submitterName = submitterNameInput.value;

  fetch('https://script.google.com/macros/s/AKfycbyHivdCVJGe5_ABuW5WCfh710z2eRnjTGg6srMfSXSYztBueBD-l76bWmx4aEMEwGNH/exec', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ dates: selectedDates, name: submitterName })
  })
    .then(response => response.json()) // Parse JSON response
    .then(data => {
      if (data.success) {
        alert(data.message); // Show success message from the server
      } else {
        alert('Error: ' + data.message); // Show error message from the server
      }
    })
    .catch(error => {
      console.error('Error submitting data:', error);
      alert('Error submitting data. Please try again.');
    });
}
