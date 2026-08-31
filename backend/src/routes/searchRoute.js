const express = require('express');
const router = express.Router();

const { searchHandler } = require('../controllers/searchController');


router.get('/api/search', searchHandler);


module.exports = router;
