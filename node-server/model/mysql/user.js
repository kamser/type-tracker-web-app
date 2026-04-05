import mysql from 'mysql2/promise';
//import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from '../../config/serverConfig.js';

const config = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'root',
    database: 'type_assesment_db'
};

const databaseConnection = await mysql.createConnection(config);

export class UserModel{
    static getById = async({id}) => {

        const SELECT_QUERY = `SELECT BIN_TO_UUID(user_id) id, username, user_password, best_score_achived
                                FROM app_user
                                WHERE user_id = UUID_TO_BIN(?)`;

        const [user] = await databaseConnection.query(SELECT_QUERY, [id]);

        if(user.length === 0) return null;

        return user[0];

    };

    static create = async ({input}) => {
        const {
            username,
            password,
            bestScoreAchived
        } = input;

        const [uuidResult] = await databaseConnection.query('SELECT UUID() uuid;');
        const [{uuid}] = uuidResult;

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        try{
            const INSERT_QUERY = `INSERT INTO app_user (user_id, username, user_password, best_score_achived)
                                    VALUES (UUID_TO_BIN('${uuid}'), ?, ?, ?);`
            await databaseConnection.query(INSERT_QUERY,
                [username, hashedPassword, bestScoreAchived]
            );
        } catch(error){
            console.log(error);
            return null;
        }

        const user = await this.getById({uuid});

        return user;
    }

    static update = async ({id, bestScoreAchived}) => {
        console.log(id, bestScoreAchived);
        try {
            const updateQuery = `UPDATE app_user
                                 SET best_score_achived = ${bestScoreAchived}
                                 WHERE BIN_TO_UUID(user_id) = '${id}'`
            const queryInformation = await databaseConnection.query(updateQuery);

            const [resultSetHeader] = queryInformation;

            console.log(resultSetHeader);

            if(resultSetHeader.affectedRows > 0){
                const updatedUser = await this.getById({id});
                return updatedUser;
            }

            return -1;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static findOneByUsername = async ({username}) => {
        const SELECT_QUERY = `SELECT BIN_TO_UUID(user_id) id, username, user_password, best_score_achived
                                FROM app_user
                                WHERE username = ?`;

        const [users] = await databaseConnection.query(SELECT_QUERY, [username]);

        if(users.length === 0) return null;

        console.log(users[0]);

        return users[0];
    }
}