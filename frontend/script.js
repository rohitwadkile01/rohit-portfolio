// Simple Contact Form with Debugging
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();   // Prevent page reload

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    console.log("Form Data:", { name, email, subject, message });

    if (!name || !email || !message) {
        alert("Please fill all required fields!");
        return;
    }

    try {
        const res = await fetch('http://localhost:5000/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, subject, message })
        });

        const data = await res.json();
        console.log("Server Response:", data);

        if (data.success) {
            alert("✅ Thank you! Your message has been received.");
            document.getElementById('contact-form').reset();
        } else {
            alert("❌ " + (data.error || "Something went wrong"));
        }
    } catch (err) {
        console.error("Fetch Error:", err);
        alert("❌ Could not connect to server. Make sure server is running.");
    }
});