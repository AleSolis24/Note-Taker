const path = require('path');
const router = require('express').Router();
const fs = require('fs/promises');

const dbJSON = path.join(__dirname, 'db.json');



// get request for fetching the api notes route 
router.get('/api/notes', async (req, res) => {
    try {
        const data = await fs.readFile(dbJSON,'utf8');
        const notes = JSON.parse(data);
        res.json(notes); 
    } catch (err) {
        console.error('There a error with your notes!!', err);
        res.status(500).send('Server Error!!');
    }
})

// post request for the user to add a new note in the request body. 
router.post('/api/notes', async (req, res)=> {
    try {
        const data = await fs.readFile(dbJSON, 'utf8');
        const userNewNotes = {
            id: Math.floor(math.random() * 1000),
            text: req.body.text,
            title: req.body.title
        };
       note.push(userNewNotes);
       await fs.writeFile(dbJSON, JSON.stringify(data));
       res.json(userNewNotes);
    } catch (err) {
        console.error('There a Error!');
        // if there is a error send the user a 500 error with a provided message for error
        res.status(500).send('There a server error!!');
    }
})

module.exports = router; 
