import db_queries from "./db/db_queries";

function getTasks(){
    return fetch('/gettasks').then(res => res.json());
}

function DeleteTask(id: number){
    let data = {
        id: id
    }
    fetch('/tasks', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

export default {
    getTasks,
    DeleteTask
}