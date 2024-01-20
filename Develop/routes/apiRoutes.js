const router = require('express').Router();
const fs = require('fs/promises');
const dbJSON = path.join(__dirname, 'db.json');


// get request for fetching the api notes route 
router.get('/api/notes', async (req, res) => {
    try {
        const u = await fs.readFile(dbJSON,'utf8');
        const n = JSON.parse(u);
        res.json(n); 
    } catch (err) {
        console.error('There a error with your notes!!', err);
        res.status(500).send('Server Error!!');
    }
})



module.exports = router; 