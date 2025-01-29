const form = document.getElementById("beerMeetupForm");
const bestDateContainer = document.getElementById("bestDate");

// Replace this URL with the deployment URL of your Google Apps Script
const googleSheetApiUrl = "https://script.google.com/macros/s/AKfycbyHivdCVJGe5_ABuW5WCfh710z2eRnjTGg6srMfSXSYztBueBD-l76bWmx4aEMEwGNH/exec";

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const datePicker = document.getElementById("datePicker");
  const dates = Array.from(datePicker.selectedOptions).map((option) => option.value);

  if (!name || dates.length === 0) {
    alert("Please enter your name and at least one date.");
    return;
  }

  try {
    const response = await fetch(googleSheetApiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, dates }),
    });

    if (!response.ok) {
      throw new Error("Failed to send data to the server.");
    }

    const result = await response.json();
    if (result.status === "success") {
      alert("Your submission has been saved!");
      form.reset();
      loadBestDate(); // Reload the best date
    } else {
      alert("Error saving your submission: " + result.error);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
});

async function loadBestDate() {
  try {
    const response = await fetch(googleSheetApiUrl + "?action=getBestDate");
    if (!response.ok) {
      throw new Error("Failed to fetch the best date.");
    }

    const result = await response.json();
    if (result.status === "success") {
      bestDateContainer.textContent = `The best date is: ${result.bestDate}`;
    } else {
      bestDateContainer.textContent = "Could not determine the best date.";
    }
  } catch (error) {
    console.error("Error fetching best date:", error);
    bestDateContainer.textContent = "Error loading the best date.";
  }
}

// Load the best date on page load
document.addEventListener("DOMContentLoaded", loadBestDate);
