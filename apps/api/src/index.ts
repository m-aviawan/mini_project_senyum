import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from 'dotenv'
dotenv.config()

const app: Express = express()
const port = process.env.PORT


app.use(express.json())

interface IError extends Error {
  msg: string,
  status: number
}
app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    error: true,
    message: err.msg || 'Something went wrong!',
    data: {}
  })
})

import router from "./routers";
app.use('/api', router)

app.listen(port, () => {
  console.log(`[server] Server is running at http://localhost:${port}`)
})