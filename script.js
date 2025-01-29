document.addEventListener("DOMContentLoaded", function () {
    // Form Submission Handler
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

    // Function to load the best date from Google Script
    async function loadBestDate() {
        try {
            const response = await fetch(
                "https://script.google.com/macros/s/AKfycbyHivdCVJGe5_ABuW5WCfh710z2eRnjTGg6srMfSXSYztBueBD-l76bWmx4aEMEwGNH/exec?action=getBestDate"
            );
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            document.getElementById("best-date").innerHTML = `<p>Best date for the meetup: ${result.bestDate}</p>`;
        } catch (error) {
            console.error("Error fetching best date:", error);
            document.getElementById("best-date").innerHTML = "<p>Could not fetch best date.</p>";
        }
    }

    // Call loadBestDate when the page loads
    loadBestDate();
});
