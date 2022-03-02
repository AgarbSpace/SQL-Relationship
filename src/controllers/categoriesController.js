import connection from "../db.js";

export async function postCategory (request, response){

    try {
        
        const {nome} = request.body;

        const findCategoryQuery = await connection.query(`
            SELECT * FROM categorias
            WHERE nome = $1`, [nome]
        );

        if(findCategoryQuery.rows.length > 0){
            return response.sendStatus(409);
        }

        await connection.query(`
            INSERT INTO categorias (nome)
            VALUES ($1)`, [nome]
        );

        response.sendStatus(201);

    } catch (error) {
        response.status(500).send(error)
    }
}

