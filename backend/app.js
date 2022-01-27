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

app.use("/api/sauces", stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;

