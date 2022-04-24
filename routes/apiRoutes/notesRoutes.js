const router = require('express').Router();
const db = require('../../db/db.json');
const uniqid = require('uniqid');
const fs = require('fs')

router.get('/notes', (req, res) => {
    let results = db
    res.json(results);
});

router.post('/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uniqid();

    if (!newNote) {
        res.send(400)
    }

    db.push(newNote)

    fs.writeFile('../../db/db.json', JSON.stringify(newNote) , (err) => {
        if (err) {
            console.log (err)
        }
        console.log('success')
    })
});

router.delete('/notes/:id', (req, res) => {
    const params = [req.params.id];

    for (let i = 0; i < db.length ; i++) {
        if (db[i].id === params) {
            db.splice(i, 1);
        }
    }

    fs.writeFile('../../db/db.json', newNotes, (err) => {
        if (err) {
            console.log (err)
        }
        console.log('deleted')
    })
})

module.exports = router;

