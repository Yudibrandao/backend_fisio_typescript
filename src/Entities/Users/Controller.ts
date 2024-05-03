import Confidence from "../../config_env";
import { ModelUser, User } from "./Model";
import bcrypt from "bcrypt"


export const register = async (userData: ModelUser) =>{

    const newUser = new User(userData)
    try {

        newUser.password = await bcrypt.hash(newUser.password, Confidence.Loop_db)

        newUser.role = "user" 

        newUser.isActive = true

        await newUser.save()

        return ("Gracias por registrarte")
        
    } catch (error) {

        return ("Usuario no registrado " + error)
        
    }
    

}

