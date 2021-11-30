import { Query } from "./index";

// retrieves all chirps from database
const all = async () => Query(`SELECT * FROM tasks`);

// retrieves single chirp with given id
// Weird thing with quotes happening here that keeps me from using template literals for both table and id. 
const one = async (id: string) => Query(`SELECT * FROM tasks WHERE id = ?`, [id])

//const getID = async() => Query('SELECT MAX(id) as id from chirps');

//const createMention = async(userName: any, chirpid: number) => Query('INSERT into mentions(userid, chirpid) values(?, ?)', [userName, chirpid])

//const sendMentions = async(userName: any) => Query('SELECT chirpid from mentions WHERE userid = ?', [userName])

const createTask = (content: string) => {Query('INSERT INTO tasks(task_content) values(?)', [content])};

const updateNote = (content: string, id: string) => Query('UPDATE tasks set task_content = ? WHERE id = ?', [content, id]);

const deleteNote = (id: number) => Query('DELETE from tasks WHERE id = ?', [id])

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