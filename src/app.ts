import cors from "cors";
import express  from "express";



const app = express()

app.listen(3000, ()=> {
    console.log('Servidor ok')
})

app.get('/', (request, response)=> {
    response.status(200).json({status:'OK', mensage:'Bienvenidos'})
})

app.use(express.json())

app.use(cors())







export default app


