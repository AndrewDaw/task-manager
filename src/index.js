const express = require('express')
require('dotenv').config()
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const maintenance = false


const app = express()
const port = process.env.PORT



app.use( (req, res, next) => {
    if (maintenance) {
        res.status(503).send("Server currently under maintenance, try again later")
    }else {
        next()
    }
})


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('sever is up on port '+ port)
})
