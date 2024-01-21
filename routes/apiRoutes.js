// const path = require('path');
const router = require('express').Router();
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');
const dbPath = "db/db.json"

let notes = [];

// get request for fetching the api notes route 
router.get('/notes', async (req, res) => {
    try {
        
        const data = await fs.readFile(dbPath, 'utf8');
        const notes = data ? JSON.parse(data) : [];
        res.json(notes);
    } catch (err) {
        console.error('There is an error with your notes!!', err);
        res.status(500).send('Server Error!!');
    }
});

// post request for the user to add a new note in the request body. 
router.post('/notes', async (req, res) => {
    try {
        const userNewNotes = {
            id: uuidv4(),
            text: req.body.text,
            title: req.body.title
        };
        notes.push(userNewNotes);
        await fs.writeFile(dbPath, JSON.stringify(notes));
        res.json(userNewNotes);
    } catch (err) {
        console.error('There a Error!');
        // if there is an error send the user a 500 error with a provided message for error
        res.status(500).send('There a server error!!');
    }
});


router.



module.exports = router; 

