import Confidence from "../config_env";
import jwt from "jsonwebtoken";


const authorization = (request, response, next) => {
    try {
        const token = request.header("Authorization")

        if (!token) {
            return response.status(401).json({ succes: false, message: "NO AUTORIZADO" })
        }

        const tokenParts = token.split(" ")

        if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
            return response.status(401).json({ succes: false, message: "Formato de Token invalido" })
        }

        const validateToken = tokenParts[1]
        request.user = jwt.verify(validateToken, Confidence.Secret_db)
        next()

    } catch (error) {

        if (error instanceof jwt.JsonWebTokenError) {
            return response.status(403).json({ error: "Token inválido" });
        }
        next(error);

    }

}

export { authorization }