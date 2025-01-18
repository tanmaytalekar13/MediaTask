require('dotenv').config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const userRoutes = require("./routes/userRouter.routes");
const adminRoutes = require("./routes/adminRoutes.routes");
const connectDB = require("./config/database");
const { PORT } = require('./config/config');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB connection
connectDB().catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
});

// Routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);

// Handle undefined routes
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.get("/", (req, res) => {
    res.send("Welcome to the API!");
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
