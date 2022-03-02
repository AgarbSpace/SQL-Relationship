import connection from "../db.js";

export async function validateTokenMiddleware (request, response, next){

    try{

        const authorization = request.headers.authorization;
        const token = authorization?.replace('Bearer ', '');
    
        if(!token){
            response.sendStatus(401);
            return;
        }
    
        const findSessionQuery = await connection.query(`
            SELECT * FROM sessoes
            WHERE token = $1`, [token]);
        
        if(findSessionQuery.rows.length === 0){
            response.sendStatus(401);
            return;
        }
    
        const findUserQuery = await connection.query(`
            SELECT * FROM usuarios
            WHERE "id" = $1`, [findSessionQuery.rows[0].idUsuario]);
        
        if(findUserQuery.rows.length === 0){
            response.sendStatus(401)
            return;
        }

        response.locals.user = {id: findSessionQuery.rows[0].idUsuario};
    
        next();

    }catch (error){

        console.log(error)
        response.sendStatus(500);

    }
}