document.getElementById('contactForm').addEventListener('submit', async(e) => {
    e.preventDefault();

    const form = document.getElementById('contactForm');
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (!formData.get('name') || !formData.get('email') || !formData.get('message')) {
        alert('Please fill in all required fields.');
        return;
    }
    try {
        const response = await fetch('http://localhost:3000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(`Form submission failed: ${errorResponse.message}`);
        }

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error submitting the form: ' + error.message);
    }
});