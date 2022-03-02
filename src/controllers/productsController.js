import connection from "../db.js";

export async function getProducts (request, response){

    try {
        
        const {id} = response.locals.user;

        const productsQuery = await connection.query(`
            SELECT * FROM produtos
            WHERE "idUsuario" = $1`, [id]
        );

        response.send(productsQuery.rows);

    } catch (error) {

        response.status(500).send(error);
    }
}

export async function postProduct (request, response){

    try {
        
        const {nome, preco} = request.body;
        const {id} = response.locals.user;

        await connection.query(`
            INSERT INTO produtos (nome, preco, "idUsuario")
            VALUES ($1, $2, $3)`,[nome, preco, id] 
        );

        response.sendStatus(201);

    } catch (error) {
        response.status(500).send(error)
    }

}

export async function putProduct (request, response){

    try {

        const {id} = response.locals.user;
        const {nome, preco} = request.body;
        const productID = request.params;
    
        await connection.query(`
            UPDATE produtos 
            SET nome = $1, preco = $2
            WHERE id = $3 AND "idUsuario" = $4`, [nome, preco, productID.id, id] 
        );
    
        response.sendStatus(201);
    
        
    } catch (error) {
        response.status(500).send(error);
    }
}

export async function deleteProduct (request, response){
    try {

        const {id} = response.locals.user
        const productID = request.params;
    
        await connection.query(`
            DELETE FROM produtos 
            WHERE id = $1 AND "idUsuario" = $2`, [productID.id, id] 
        );
    
        response.sendStatus(201);
    
        
    } catch (error) {
        response.status(500).send(error);
    }
}