import dotenv from "dotenv"
dotenv.config()
const Confidence  = {
    Url_db: process.env.DB_DATABASE,
    User_db: process.env.DB_USER,
    Password_db: process.env.DB_PASSWORD,
    Loop_db: Number(process.env.BCRYTP_LOOP),
    Secret_db: String( process.env.SECRET),
    Port_db: Number(process.env.PORT),
  };

  
  export default Confidence;