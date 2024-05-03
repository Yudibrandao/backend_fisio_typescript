import  express  from "express";
import { register } from "./Controller";


const router = express.Router()

router.post('/register', async (request, response)=> {
   try { 

     response.status(201).json(await register(request.body))
    
   } catch (error) {
    
   }
})





export default router

