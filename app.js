const express = require("express");
const cors = require("cors");
const db = require("./models");
require("dotenv").config();

const app = express();


app.use(cors({
  origin: 'http://localhost:3000', // Your React app's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require('../Backend/Routes/auth');
const adminRoutes = require('../Backend/Routes/admin');
const userRoutes = require('../Backend/Routes/user');
const ownerRoutes = require('../Backend/Routes/owner');
const storeRoutes = require('../Backend/Routes/store')
const ratingRoutes = require('../Backend/Routes/rating');

app.use('/api/rating', ratingRoutes);
app.use('/api/auth', authRoutes);

// Protecting routes based on roles
app.use('/api/admin', verifyToken, isAdmin, adminRoutes); // Only Admin can access
app.use('/api/user', verifyToken, isUser, userRoutes); // Only User can access
app.use('/api/owner', verifyToken, isStoreOwner, ownerRoutes); // Only Store Owners can access
app.use('/api/stores', storeRoutes); // No authentication for public store routes



// connecting db
db.sequelize.sync({ alter: true }).then(() => {
  console.log("Database connected");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
