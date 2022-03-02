import connection from "../db.js";
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid";

export async function postSignIn (request, response){

    try {

        const {email, senha} = request.body;

        const findUserQuery = await connection.query(`
            SELECT * FROM usuarios
            WHERE email = $1`, [email]
        );
        
        if(findUserQuery.rows.length === 0){
            return response.sendStatus(401);
        }

        const userPasswordHashed = findUserQuery.rows[0].senha;

        const isAuthorized = bcrypt.compareSync(senha, userPasswordHashed);
        
        if(isAuthorized){
            const token = uuid();
            
            const sessionExistsQuery = await connection.query(`
            SELECT * FROM sessoes
            WHERE "idUsuario" = $1`, [findUserQuery.rows[0].id]);
            
            if(sessionExistsQuery.rows.length > 0){
                await connection.query(`
                UPDATE sessoes
                SET token = $1
                WHERE "idUsuario" = $2`, [token, findUserQuery.rows[0].id]
                );
                
                return response.status(200).send(token);
            }
            
            await connection.query(`
            INSERT INTO sessoes ("idUsuario", token)
                VALUES ($1, $2)`, [findUserQuery.rows[0].id, token]
            );

            return response.status(200).send(token);
        }

        response.sendStatus(401);

    } catch (error) {
        response.status(500).send(error)
    }

}