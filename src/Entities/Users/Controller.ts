import { validateEmail } from "../../Utils/Validator";
import Confidence from "../../config_env";
import { ModelUser, User } from "./Model";
import bcrypt from "bcrypt"


export const register = async (userData: ModelUser) => {

    if (!userData.name || !userData.lastName || !userData.date || !userData.email || !userData.password ) return ("Todos los campos son requeridos")

    if (!validateEmail(userData.email)) return ("El formato email no es valido")

    const newUser = new User(userData)
    try {

        newUser.password = await bcrypt.hash(newUser.password, Confidence.Loop_db)

        newUser.role = "user" 

        newUser.isActive = true

        // await newUser.save()

        return ("Gracias por registrarte")

    } catch (error) {

        return ("Usuario no registrado " + error)

    }


}

