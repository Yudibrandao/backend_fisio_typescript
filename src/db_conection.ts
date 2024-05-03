import Confidence from "./config_env";
import mongoose, { ConnectOptions } from "mongoose";


const conection_bbd = mongoose.connect(`${ Confidence.Url_db}`, {} as ConnectOptions)
.then(()=> console.log("Base de datos OK"))
.catch((error)=> console.log("La base de datos ha fallado"+ error))




export default conection_bbd




