import express, { Express, NextFunction, Request, Response } from "express";
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.use(cors({
  origin: '*'
}))
app.use(express.json())


import router from "./routers";
app.use('/api', router)

interface IError extends Error {
  msg: string,
  status: number
}

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    error: true,
    // message: err.msg ? err.msg : err.message == 'jwt expired' ? err.message : 'Something went wrong!',
    message: err.msg ? err.msg : err.message,
    data: {}
  })
})
app.listen(port, () => {
  console.log(`[server] Server is running at http://localhost:${port}`)
})