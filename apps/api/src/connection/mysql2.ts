import mysql from 'mysql2'

export const mySqlConnection = async() => {
    const db = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Mysql123avi#',
        database: 'db_perpus'
    });
    
    db.connect((error) => {
        if(error) return console.log('Error' + error.message)
    })
    return db
}
export default mySqlConnection;