import  express  from "express";
import { login, register } from "./Controller";


const router = express.Router()

router.post('/register', async (request, response)=> {
   try { 

     response.status(201).json(await register(request.body))
    
   } catch (error) {
    
   }
})


router.post('/login', async (request, response)=> {
   try { 

     response.status(201).json(await login(request.body))
    
   } catch (error) {
    
   }
})





export default router

