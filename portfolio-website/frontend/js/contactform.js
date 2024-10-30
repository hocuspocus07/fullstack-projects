document.getElementById('contactForm').addEventListener('submit', async(e) => {
    e.preventDefault(); // Prevent the default form submission

    const form = document.getElementById('contactForm');
    const formData = new FormData(form); // Create a FormData object with form fields
    if (!formData.get('name') || !formData.get('email') || !formData.get('message')) {
        alert('Please fill in all required fields.');
        return;
    }
    // Fetch API to submit the form data
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            body: formData, // Send form data as body
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(`Form submission failed: ${errorResponse.message}`);
        }

        const result = await response.json();
        alert(result.message); // Show success message from server
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error submitting the form: ' + error.message);
    }
});