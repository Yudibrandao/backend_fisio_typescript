import  express, { request }  from "express";
import { login, modify, register } from "./Controller";
import { authorization } from "../../Middleware/Authorization";


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


router.put('/modify', authorization, async (request, response)=> {
  try {

    response.status(201).json(await modify (request.body))

  } catch (error) {
    
    
  }

})





export default router

