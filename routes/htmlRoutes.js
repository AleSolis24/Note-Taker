const path = require('path');
const router = require('express').Router();

// homepage get request that links to the index.html file 
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// get request to work on the notes.html 
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

module.exports = router;
