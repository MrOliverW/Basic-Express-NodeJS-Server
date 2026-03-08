// Imports the express module
const express = require('express');

// Defines the application instance (it's the main object that will handle routing and server logic)
const app = express();

// Sets the port for the server to listen on (either from environment variable or default) to 3000
const PORT = process.env.PORT || 3000;

// --- Basic Routes ---

// Route for the root path (when the user visits http://localhost:3000/) that sends a "Hello World" message as a response
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Route for the /about path
app.get('/about', (req, res) => {
    res.send('About page');
});

// --- Conditional Routing  (/appdev)---
// First handler for /appdev
app.get('/appdev', (req, res, next) => {
    if (Math.random() > 0.5) {
        res.send('Welcome to the App Development page!');
    } else {
        next(); // Passes control to the next handler for /appdev
    }
});

// Second handler for /appdev
app.get('/appdev', (req, res) => {
    res.send('App Development page');
});

// --- Regular Expression Routes ---
// Matches any path that starts with /user/ followed by a username (e.g., /user/johndoe)
app.get(/^\/user(name)?$/, (req, res) => {
    res.send('This route matches exactly /user or /username');
});

// --- Dynamic Route Handling  ---
app.get('/user/:username', (req, res) => {
    const name = req.params.username;
    res.send(`Hello ${name}`);
});


// --- Dynamic Route Handling  ---
app.get('/get',(req, res) => {
    console.log('Query Parameters:', req.query);
    res.send('Check your VS Code console to see the query parameters!');
});

// --- Query String Handling ---
app.get('/get', (req, res) => {
    console.log('Query Parameters:', req.query);
    res.send('Check your VS Code console!');
});

// --- 404 Error Handler  ---

app.use((req, res) => {
    res.status(404).send('404 - Not Found LMAO');
});

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});