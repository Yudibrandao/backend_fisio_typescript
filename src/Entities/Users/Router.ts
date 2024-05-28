import  express  from "express";
import { login, modify, register } from "./Controller";
import { authorization } from "../../Middleware/Authorization";


const router = express.Router()

router.post('/register', async (request, response)=> {
   try { 

     response.status(201).json(await register(request.body))
    
   } catch (error) {
    response.status(401).json()
   }
})

router.post('/login', async (request, response)=> {
   try { 

     response.status(201).json(await login(request.body))
    
   } catch (error) { 
    response.status(401).json()
   }
})


router.put('/modify', authorization, async (request, response)=> {
  try {

    response.status(201).json(await (request.body))

  } catch (error) {
    response.status(401).json({sucess: false, msg: "No Autorizado"})
  }
})





export default router

