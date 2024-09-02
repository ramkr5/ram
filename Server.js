// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files (like HTML, CSS, JS) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Handle GET request to the login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Handle POST request from the login form
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Dummy credentials for demonstration purposes
    const validUsername = 'user';
    const validPassword = 'password';

    if (username === validUsername && password === validPassword) {
        res.send('Login successful');
    } else {
        res.send('Invalid credentials');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
