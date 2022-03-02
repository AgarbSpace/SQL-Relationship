import connection from "../db.js";
import bcrypt from "bcrypt"

export async function postSignUp (request, response){

    try {

        const {nome, email, senha, senhaConfirmada} = request.body;

        if(!nome){

            return response.sendStatus(400)
        }

        const findEmailQuery = connection.query(`
            SELECT * FROM usuarios
            WHERE email = $1`, [email]);
        
        if(findEmailQuery.rows > 0){
            return response.sendStatus(422);
        }

        if(senha !== senhaConfirmada){
            return response.sendStatus(422);
        }

        const passwordHashed = bcrypt.hashSync(senha, 10);
        const insertUserQuery = await connection.query(`
            INSERT INTO usuarios (nome, email, senha)
            VALUES ($1, $2, $3)`, [nome, email.toLowerCase(), passwordHashed]);

        if(!insertUserQuery){
            return response.sendStatus(401);
        }

        response.sendStatus(200);
        
    } catch (error) {

        response.status(500).send(error);
    }
    
}