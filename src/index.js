const express = require('express')
const path = require('path')
const hbs = require('hbs')

require('dotenv').config()
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')






const maintenance = false


const app = express()
const port = process.env.PORT

//express paths
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

//constants
const name = 'Andrew Daw'

//handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//static directories
app.use(express.static(publicDirectoryPath))


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





app.get('', (req, res) => {
    res.render('index', {
        title: "Home",
        name 
    })
})


app.get('/my-tasks', (req, res) => {
    res.render('my-tasks', {
        title: "my-tasks",
        name,
        message: "This is where the tasks will go"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name,
        message: "Sign up, sign in, add tasks."
    })
})





app.listen(port, () => {
    console.log('sever is up on port '+ port)
})
