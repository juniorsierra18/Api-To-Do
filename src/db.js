import mongoose from 'mongoose'

export const connectBD = async () => {
    try {
        //Coneccion a la base de datos en localhost
        mongoose.connect("mongodb://localhost/backToDo")
        //si la conceccion es exitosa
        console.log("The DB was conncected succerfully");
    } catch (error) {
        //si hay un errror al concectarse a la base de datos 
        console.log(error);
    }
}