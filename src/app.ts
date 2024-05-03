import Confidence from "./config_env";
import cors from "cors";
import conection_bbd  from "./db_conection";
import express  from "express";
import router_user from "./Entities/Users/Router";


const app = express()

//el app escucha en el puerto proporcionado por el confidence, en caso de no existir automaticamente se coloca el puerto 3000
app.listen(Confidence.Port_db || 3000, ()=> {
    console.log('Servidor ok')
})

//estamos accediendo a un metodo get, estamos mandando una solicitud al servidor y estamos dando una respuesta
app.get('/', (request, response)=> {
    response.status(200).json({status:'OK', mensage:'Bienvenidos'})
})


app.use(express.json())

app.use(cors())


app.use('/', router_user)


conection_bbd




export default app


