// Load variables from .env
require("dotenv").config();

// Backend framework
const express = require("express");
// To determine the image directory
const path = require("path");
// Share backend with frontend
const cors = require("cors");

// backend server port loaded from dotEnv
//const port = process.env.PORT;
const port = process.env.API_PORT;

// Initialize the application
const app = express();

// configure JSON and form data response
// extended = false to allow formData to upload img
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Solve CORS - Requests origin - in our case localhost
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

//DB connection
require("./config/db.js");
// Routes from routes/Router.js
const router = require("./routes/Router.js");
app.use(router);

app.listen(port, () => {
  console.log(`Backend rodando na porta ${port}`);
});
