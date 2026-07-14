const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.static('../frontend'));

app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    const time = new Date().toLocaleString();

    const log = `\n--- New Message ---\nTime: ${time}\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}\n-------------------\n`;

    // Save to file
    fs.appendFile('messages.txt', log, (err) => {
        if (err) console.error("Error saving message:", err);
        else console.log("Message saved to messages.txt");
    });

    console.log("✅ Message Received:", { name, email, subject, message });

    res.json({ success: true, message: "Thank you! Your message has been saved." });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});