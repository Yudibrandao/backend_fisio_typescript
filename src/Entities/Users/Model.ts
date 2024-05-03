import {model,Schema,Document} from "mongoose";


export interface ModelUser extends Document{
    id: any, 
    name: string, 
    lastName: string, 
    date: string, 
    email: string, 
    role: string, 
    password: string, 
    isActive: boolean 
}

export const SchemaUser = new Schema({
    name : {
        type: String, 
        require: true,
    },

    lastName : {
        type: String, 

    }, 
    
    date : {
        type: String, 
        require: true,
    }, 

    email : {
        type: String, 
        require: true,
        unique: true, 
    }, 

    role : {
        type: String, 
        enum: ["user", "admin", "doctor"],  
        default: "user"
    }, 
    
    password: {
        type: String, 
        require: true,   
    
    }, 

    isActive: {
        type: Boolean, 
        default: true,
    
    }, 
        

},{versionkey:true,timestamps:true}); //fecha cuando se crea o se modifica un usuario

export const User = model<ModelUser>('User',SchemaUser)
