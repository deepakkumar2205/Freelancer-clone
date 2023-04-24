//custom middleware

import jwt from "jsonwebtoken";

export const auth =async (request, response, next) =>{
    try{
        const token = request.header("x-auth-token");
        const data=await jwt.verify(token,process.env.SECRET_KEY);
        delete data.iat;
        request.info=data
            next(); //if error | next will be skiped
    }catch(err){
        response.status(401).send({
            message: err.message
        })
    }
}; 