// Fetch best date from Google Sheets and display it
async function loadBestDate() {
    try {
        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbyHivdCVJGe5_ABuW5WCfh710z2eRnjTGg6srMfSXSYztBueBD-l76bWmx4aEMEwGNH/exec?action=getBestDate"
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        document.getElementById("best-date").textContent =
            data.bestDate || "No common date yet.";
    } catch (error) {
        console.error("Error fetching best date:", error);
    }
}

// Handle form submission to send data to Google Sheets
document.getElementById("meetup-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const name = formData.get("name");
    const dates = Array.from(formData.getAll("dates[]")); // Get multiple selected dates

    if (!name || dates.length === 0) {
        alert("Please enter your name and select at least one date.");
        return;
    }

    try {
        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbyHivdCVJGe5_ABuW5WCfh710z2eRnjTGg6srMfSXSYztBueBD-l76bWmx4aEMEwGNH/exec",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, dates }),
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        alert(result.message || "Data submitted successfully!");

        // Reload the best date after submission
        loadBestDate();
    } catch (error) {
        console.error("Error submitting data:", error);
    }
});

// Initial call to load the best date
document.addEventListener("DOMContentLoaded", loadBestDate);
