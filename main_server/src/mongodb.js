const mongoose = require("mongoose");

// Connecting to MongoDB
mongoose.connect("mongodb://localhost:27017/User", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("MongoDB connected");
})
.catch(() => {
    console.log("Failed to connect to MongoDB");
});

// Define the user schema
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create collection (model)
const collection = mongoose.model("Users", UserSchema);

module.exports = collection;
