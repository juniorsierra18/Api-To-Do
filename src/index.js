import app from './app.js'
import { connectBD } from './db.js'

//inicia la conceccion a la db
connectBD();
//start the application
app.listen(4000)
//if the application starts correctly
console.log('Server on port', 4000);