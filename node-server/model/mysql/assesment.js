import mysql from 'mysql2/promise';

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'root',
    database: 'type_assesment_db'
};

const databaseConnection = await mysql.createConnection(config);

export class AssesmentModel{
    static getById = async ({id}) => {
        const SELECT_QUERY = `SELECT text_id, text_content, difficult_level
                                FROM challenge_text
                                WHERE text_id = ?`;
        
        const [texts] = await databaseConnection.query(SELECT_QUERY, [id]);

        if(texts.lenght === 0) return null;
        
        return texts[0];
    }
}