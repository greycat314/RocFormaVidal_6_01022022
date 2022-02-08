const express = require("express");
const mongoose = require("mongoose");
const path = require('path');

const stuffRoutes  = require("./routes/stuffRoutes"); 
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

// ==================== MONGOOSE ====================
mongoose.connect("mongodb+srv://roc:31412718@cluster0.dnzfw.mongodb.net/hotTakesDatabase?retryWrites=true&w=majority", {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
	.then(() => console.log("Connecting to MongoDB : YES :-)"))
	.catch(error => console.log("Connecting to MongoDB : NO :-( \n" + error));

// ==================== CORS ====================
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Access, Content-Type, Authorization");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
	next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

// The app.use() method allows you to assign middleware to a specific route in your application.
// "/api/sauces": string, additional argument passed to the use method corresponding to the route for which we are registering this middleware. In this case, that route is http://localhost:3000/api/stuff (the URL requested by the front-end application).
app.use("/api/sauces", stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
