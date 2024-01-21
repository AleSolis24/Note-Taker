// const path = require('path');
const router = require('express').Router();
const fs = require('fs/promises');
// the user id
const { v4: uuidv4 } = require('uuid');
const dbPath = "db/db.json"

// this will allow the user to input there notes 
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
            id: uuidv4(), // getting the unique id using "uuid"
            text: req.body.text,
            title: req.body.title
        };
        // pushing the user new notes 
        notes.push(userNewNotes);
        // write the new note in the file by stringify the user notes. 
        await fs.writeFile(dbPath, JSON.stringify(notes));
        res.json(userNewNotes);
    } catch (err) {
        console.error('There a Error!');
        // if there is an error send the user a 500 error with a provided message for error
        res.status(500).send('There a server error!!');
    }
});

// delete request for the user to delete one of there notes. 
router.delete('/notes/:id', async (req, res) => {
    const noteId = req.params.id;
    try {
        const deleteUserNotes = notes.filter(notes => notes.id !== noteId);

        if (deleteUserNotes.length < notes.length) {
            notes = deleteUserNotes;
            await fs.writeFile(dbPath, JSON.stringify(notes));
        } else {
            // this will let me know if there is a error on deleting my note 
            res.status(404).json({message: 'cant delete'});
        }
    } catch (err) {
        // this will let me know if there is a error on deleting my notes 
        // if there is a error with my server trying to delete my note I will get a 500 status error 
        console.error('There a ERROR on deleting your notes!');
        res.status(500).send('Check your SERVER!');
    }
});



module.exports = router; 

