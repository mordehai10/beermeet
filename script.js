fetch('https://script.google.com/macros/s/1qd_FRhROAKpR3aQphii7LqL4POe7C1WF_3o10lR1DOM/exec', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ dates: selectedDates, name: submitterName }),
  mode: 'no-cors' // Disable CORS checks (caution advised)
})
.then(response => {
  // You won't be able to access the response data due to CORS
  console.log('Response:', response);
})
.catch(error => {
  console.error('Error submitting data:', error);
  alert('Error submitting data. Please try again.');
});
