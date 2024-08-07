import express, { json } from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import authRoutes from './routes/auth.router.js'
import toDoRoutes from './routes/toDo.router.js'

const app = express();

app.use(express,json())
app.use(cors())
app.use(cookieParser())
app.use("/api", authRoutes)
app.use("/api", toDoRoutes)

export default app