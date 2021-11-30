import { Query } from "./index";

// retrieves all chirps from database
const all = async (table: string) => Query(`SELECT * FROM ${table}`);

// retrieves single chirp with given id
// Weird thing with quotes happening here that keeps me from using template literals for both table and id. 
const one = async (table: string, id: string) => Query(`SELECT * FROM ${table} WHERE id = ?`, [id])

//const getID = async() => Query('SELECT MAX(id) as id from chirps');

//const createMention = async(userName: any, chirpid: number) => Query('INSERT into mentions(userid, chirpid) values(?, ?)', [userName, chirpid])

//const sendMentions = async(userName: any) => Query('SELECT chirpid from mentions WHERE userid = ?', [userName])

const createTask = (content: string) => {Query('INSERT INTO tasks(task_content) values(?)', [content])};

const updateNote = (content: string, id: string) => Query('UPDATE notes set note_content = ? WHERE id = ?', [content, id]);

const deleteNote = (id: number) => Query('DELETE from notes WHERE id = ?', [id])

//const deleteMention = (id: number) => Query('DELETE from mentions WHERE chirpid = ?', [id])

export default {
    all,
    one,
    createTask,
    updateNote,
    deleteNote
    //getID,
    //createMention,
    //sendMentions,
    //deleteMention
}