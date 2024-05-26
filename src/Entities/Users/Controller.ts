import { get } from "mongoose";
import { validateEmail } from "../../Utils/Validator";
import Confidence from "../../config_env";
import { ModelUser, User } from "./Model";
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"

export const register = async (userData: ModelUser) => {

    if (!userData.name || !userData.lastName || !userData.date || !userData.email || !userData.password) return ("Todos los campos son requeridos")

    const yearNow = new Date().getFullYear()
    const monthNow = new Date().getMonth()
    const dayNow = new Date().getDate()

    const userDate = new Date(userData.date)

    const yearUser = userDate.getFullYear()
    const monthUser = userDate.getMonth()
    const dayUser = userDate.getDate()


    const dateCompare = new Date((yearNow - 18), monthNow, (dayNow + 1))
    const dateUSer = new Date(yearUser, monthUser, (dayUser + 1))

    if (dateUSer > dateCompare) return ("No estas autorizado para crear un usuario")


    if (!validateEmail(userData.email)) return ("El formato email no es valido")

    const emailExist = await User.findOne({ email: userData.email })

    if (emailExist) return ("Email o contraseña invalida")

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


export const login = async (userData: ModelUser) => {

    const userExist = await User.findOne({ email: userData.email })


    if (!userExist) return ("Email o contraseña invalida")


    if (!userExist.isActive) return ("Cuenta inactiva")


    const match = bcrypt.compareSync(userData.password, userExist.password)

    if (!match) return ("Email o contraseña invalida")


    try {

        const token = jwt.sign({ user: userExist }, Confidence.Secret_db, { expiresIn: '24h' })

        return {
            succes: true,
            data: userExist,
            token: token
        }

    } catch (error) {

        return ("Algo a fallado " + error)
    }
}

export const modify = async (token, data) => {
    try {
        let data_modify: any = {}

        const yearNow = new Date().getFullYear()
        const monthNow = new Date().getMonth()
        const dayNow = new Date().getDate()

        if (data.name) data_modify.name = data.name
        if (data.lastName) data_modify.lastName = data.lastName

        if (data.date) {
            const userDate = new Date(data.date)
            const yearUser = userDate.getFullYear()
            const monthUser = userDate.getMonth()
            const dayUser = userDate.getDate()

            const dateCompare = new Date((yearNow - 18), monthNow, (dayNow + 1))
            const dateUSer = new Date(yearUser, monthUser, (dayUser + 1))

            if (dateUSer > dateCompare) return ("No estas autorizado para crear un usuario")

            data_modify.date = dateUSer
        }

        if (data.email) {

            if (!validateEmail(data.email)) return ("El formato email no es valido")

            const emailExist = await User.findOne({ email: data.email })

            if (emailExist) return ("Email o contraseña invalida")
            data_modify.email = data.email
        }

        if (data.password) data_modify.password = await bcrypt.hash(data.password, Confidence.Loop_db)
            console.log(data_modify)
        await data_modify.save()

        return (data_modify)

    } catch (error) {
    }
}