if (process.env.NODE_ENV !== 'production') {
	// Load .env into process.env when not in production.
	const dotenvResult = require('dotenv').config();
	if (dotenvResult.error) {
		// Don't throw — just warn so the app can still start without a .env file.
		console.warn('dotenv: no .env file loaded or parse error:', dotenvResult.error.message || dotenvResult.error);
	}
}
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');


const indexRouter = require('./routes/index');



// Set EJS as templating engine
app.set('view engine','ejs')
// Set the views directory
app.set('views', __dirname + '/views')
// Set the layout file for express-ejs-layouts middleware 
app.set('layout', 'layouts/layout')
// Use express-ejs-layouts middleware
app.use(expressLayouts);
// Serve static files from the 'public' directory
app.use(express.static('public'));


const mongoose = require('mongoose');
const DB_URI = process.env.DATABASE_URL || 'mongodb://localhost:27017/mydatabase';

// Connect to MongoDB but don't let an initial failure crash the whole app.
mongoose.connect(DB_URI, {useNewUrlParser:true})


const db = mongoose.connection;
db.on('error', error => console.error('Mongoose connection error (event):', error));
db.once('open', () => console.log('Connected to MongoDB'));
app.use('/', indexRouter);


const PORT = process.env.PORT || 5000 ;
app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});