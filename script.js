const datePicker = document.getElementById('date-picker');
const submitterNameInput = document.getElementById('submitter-name');

// Create an instance of Flatpickr
flatpickr(datePicker, {
  mode: "multiple", 
});

function submitDates() {
  const selectedDates = flatpickr.instance(datePicker).getSelectedDates().map(date => date.toISOString()); 
  const submitterName = submitterNameInput.value;

  fetch('https://script.google.com/macros/s/1qd_FRhROAKpR3aQphii7LqL4POe7C1WF_3o10lR1DOM/exec', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ dates: selectedDates, name: submitterName }) 
  })
  .then(response => response.json()) 
  .then(data => {
    alert(data.message); // Display success message from the web app
  })
  .catch(error => {
    console.error('Error submitting data:', error);
    alert('Error submitting data. Please try again.');
  });
}
