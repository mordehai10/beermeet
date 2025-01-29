const form = document.getElementById('meetupForm');
const bestDateEl = document.getElementById('bestDate');
const submissionsList = document.getElementById('submissionsList');
const resetButton = document.getElementById('resetButton');

// Load saved submissions from local storage
let submissions = JSON.parse(localStorage.getItem('submissions')) || [];

// Display the saved data
renderSubmissions();
updateBestDate();

form.addEventListener('submit', (event) => {
  event.preventDefault(); // Stop form from refreshing the page

  const name = document.getElementById('name').value;
  const dates = document.getElementById('dates').value;

  if (!name || !dates) return alert('Please fill out all fields!');

  const newSubmission = { name, dates: [dates] };

  // Save submission to the array and local storage
  submissions.push(newSubmission);
  localStorage.setItem('submissions', JSON.stringify(submissions));

  // Update UI
  renderSubmissions();
  updateBestDate();

  // Clear the form
  form.reset();
});

// Function to update the best date
function updateBestDate() {
  if (submissions.length === 0) return;

  const dateCounts = {};

  submissions.forEach(({ dates }) => {
    dates.forEach((date) => {
      dateCounts[date] = (dateCounts[date] || 0) + 1;
    });
  });

  const bestDate = Object.keys(dateCounts).reduce((a, b) =>
    dateCounts[a] > dateCounts[b] ? a : b
  );

  bestDateEl.textContent = bestDate;
}

// Function to render the submissions list
function renderSubmissions() {
  submissionsList.innerHTML = ''; // Clear the list
  submissions.forEach(({ name, dates }) => {
    const li = document.createElement('li');
    li.textContent = `${name}: ${dates.join(', ')}`;
    submissionsList.appendChild(li);
  });

  resetButton.style.display = submissions.length > 0 ? 'block' : 'none';
}

// Reset button to clear all data
resetButton.addEventListener('click', () => {
  if (confirm('Are you sure you want to reset all data?')) {
    submissions = [];
    localStorage.removeItem('submissions');
    renderSubmissions();
    updateBestDate();
  }
});
