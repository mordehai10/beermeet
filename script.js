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

  fetch('https://script.google.com/macros/s/1qd_FRhROAKpR3aQphii7LqL4POe7C1WF_3o10lR1DOM/exec', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ dates: selectedDates, name: submitterName }),
    mode: 'no-cors' // Disable CORS checks
  })
  .then(response => {
    // Handle the response, even though it's opaque (no access to data)
    if (response.ok) {
      alert('Data submitted successfully!'); 
    } else {
      alert('Error submitting data.'); 
    }
  })
  .catch(error => {
    console.error('Error submitting data:', error);
    alert('Error submitting data. Please try again.');
  });
}
