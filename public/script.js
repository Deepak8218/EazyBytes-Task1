document.getElementById('myForm').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent form from refreshing the page

    // Get form data
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Send data to the backend using fetch API
    try {
        const response = await fetch('/api/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Send the form data as JSON
        });

        // Handle response from server
        const result = await response.json().catch(err => {
            console.error("Invalid JSON response:", err);
            return { message: "Invalid response from server" };
        });

        const messageBox = document.getElementById('messageBox');
        
        if (response.ok) {
            messageBox.innerHTML = `<span style="color: #61b752; font-size: 16px;">Data submitted successfully!</span>`;
        } else {
            messageBox.innerHTML = `<span style="color: red; font-size: 16px;">Failed to submit data: ${result.message}</span>`;
        }

        // Reset the form after submission
        document.getElementById('myForm').reset();

        // Hide the message after 5 seconds
        setTimeout(() => {
            messageBox.innerHTML = '';
        }, 5000); // 5 seconds delay
        
    } catch (error) {
        const messageBox = document.getElementById('messageBox');
        messageBox.innerHTML = `<span style="color: red; font-size: 16px;">Error: ${error}</span>`;
        
        // Hide the error message after 5 seconds
        setTimeout(() => {
            messageBox.innerHTML = '';
        }, 5000); // 5 seconds delay
    }
});
