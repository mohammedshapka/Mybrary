const express = require('express');
const router = express.Router();

// Define the home route
router.get('/', (req, res) => {
  res.render('index'); // send a simple response
});




module.exports = router;