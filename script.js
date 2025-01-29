$(document).ready(function() {
    $("#dates").datepicker({
        multiDate: true,
        dateFormat: "yy-mm-dd" 
    });

    const form = document.getElementById('meetup-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const dates = document.getElementById('dates').value;

        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbyHivdCVJGe5_ABuW5WCfh710z2eRnjTGg6srMfSXSYztBueBD-l76bWmx4aEMEwGNH/exec', {
                method: 'POST',
                body: JSON.stringify({ name, dates }),
                headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();

            if (data.success) {
                alert('Your information has been submitted successfully!');
                form.reset();
            } else {
                alert('There was an error submitting your information. Please try again.');
            }

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    });
});
