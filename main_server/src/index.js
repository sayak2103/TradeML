const express = require("express");
const session = require("express-session");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");
const socketIOClient = require("socket.io-client");

// Setting up the template path
const templatePath = path.join(__dirname, "../templates");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setting up Handlebars as the view engine
app.set("view engine", "hbs");
app.set("views", templatePath);

app.use(express.static(path.join(__dirname, "../public")));

// Session management
app.use(session({
    secret: "mysecretkey",  // Secret key to sign the session ID
    resave: false,          // Prevents resaving the session if nothing changed
    saveUninitialized: false // Prevents saving uninitialized sessions
}));

// Routes
app.get("/", (req, res) => {
    if (req.session.user) {
        res.render("home", { name: req.session.user.name }); // Pass user data to home page
    } else {
        res.render("login");
    }
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

// Signup route
app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await collection.findOne({ email });

    if (existingUser) {
        return res.send("Email already exists. Try logging in.");
    }

    const newUser = new collection({ name, email, password });
    await newUser.save(); // Save user to MongoDB

    req.session.user = { name, email }; // Store user info in session
    res.render("home", { name });
});

// Login route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Find user in database
    const user = await collection.findOne({ email, password });

    if (!user) {
        return res.send("Invalid email or password.");
    }

    req.session.user = { name: user.name, email: user.email }; // Store user in session
    res.render("home", { name: user.name }); // Redirect to home page
});

// Logout route
app.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

// WebSocket client connection to Flask server
const socket = socketIOClient("http://127.0.0.1:5000"); // Flask server URL

socket.on("connect", () => {
    console.log("Connected to Flask server via WebSocket");
});

// Listen for the 'model_output' event from Flask server
socket.on("model_output", (data) => {
    console.log("Received result from Flask server:", data.result);
    // You can now send this data to your clients or do other things with it
    // For example, you can pass it to the template when rendering a page
    app.get("/result", (req, res) => {
        res.render("result", { result: data.result });
    });
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
