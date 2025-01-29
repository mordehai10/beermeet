const googleSheetApiUrl = "https://script.google.com/macros/s/AKfycbwZ9XulKeu7oE8qYzt3rrVJHQupXpD6lz2IWiwvPEm0kuzx3mjlc_QFvSA5li7cIQ6o/exec"; // Replace with your Apps Script URL

// DOM elements
const form = document.getElementById('meetupForm');
const bestDateEl = document.getElementById('bestDate');
const submissionsList = document.getElementById('submissionsList');

// Submit form
form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const dates = document.getElementById('dates').value;

  if (!name || !dates) return alert('Please fill out all fields!');

  // Send data to Google Sheets API
  const response = await fetch(googleSheetApiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, dates }),
  });

  if (response.ok) {
    alert('Your submission has been saved!');
    form.reset();
    fetchSubmissions(); // Refresh submissions list
  } else {
    alert('Error saving your data. Please try again.');
  }
});

// Fetch data from Google Sheets API
async function fetchSubmissions() {
  const response = await fetch(googleSheetApiUrl);
  const data = await response.json();

  renderSubmissions(data.slice(1)); // Remove header row
  updateBestDate(data.slice(1));
}

// Render submissions
function renderSubmissions(submissions) {
  submissionsList.innerHTML = ''; // Clear the list

  submissions.forEach(([name, dates]) => {
    const li = document.createElement('li');
    li.textContent = `${name}: ${dates}`;
    submissionsList.appendChild(li);
  });
}

// Calculate the best date
function updateBestDate(submissions) {
  if (submissions.length === 0) return;

  const dateCounts = {};

  submissions.forEach(([_, dates]) => {
    dates.split(',').forEach((date) => {
      dateCounts[date] = (dateCounts[date] || 0) + 1;
    });
  });

  const bestDate = Object.keys(dateCounts).reduce((a, b) =>
    dateCounts[a] > dateCounts[b] ? a : b
  );

  bestDateEl.textContent = bestDate;
}

// Initial fetch
fetchSubmissions();
