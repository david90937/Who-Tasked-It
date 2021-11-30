import * as express from 'express';

import db from './db';

const router = express.Router();

// Returns all records for the table that is passed in.
router.get('/gettasks', async (req, res) => {
    try {
        const table = req.body.table
        res.json(await db.db_queries.all(table))
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

// Returns a single record from the passed in table with id = passed in id
router.get('/gettask', async(req, res) => {
    try {
        const table = req.body.table;
        const id = req.body.id;
        res.json(await db.db_queries.one(table, id))
    }
    catch(err) {
        console.log(err);
        res.sendStatus(500);
    }
});

// Sends post request to database to create new note.
router.post('/tasks', (req, res) => {
    try {
        const content = req.body.content;
        db.db_queries.createTask(content)
        res.sendStatus(200);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

//Sends put request to database to update note with id = to the id on the request body
router.put('/tasks', (req, res) => {
    try{
        const content = req.body.content;
        const id = req.body.id;
        db.db_queries.updateNote(content, id)
        res.sendStatus(200);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

//Sends delete request to database to delete note with id = to the id on the request body
router.delete('/tasks', (req, res) => {
    try{
        const id = req.body.id;
        db.db_queries.deleteNote(id);
        res.sendStatus(200);
    }
    catch(err){
        console.log(err);
        res.sendStatus(500);
    }
});

export default router;