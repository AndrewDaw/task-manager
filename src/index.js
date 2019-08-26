const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const maintenance = false


const app = express()
const port = process.env.PORT || 3000

// app.use( (req, res, next) => {
//     const authenticated = true
//     if (req.method === 'GET'){
//         res.send('You need to be logged in')
//     } else {
//         next()
//     }
// } )

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


// const User = require('./models/user')
// const main = async () => {
//     const user = await User.findById('5d61c4571089e9377054e8e0')
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()









// const Task = require ('./models/task')

// const main = async () => {
//     const task = await Task.findById('5d61c4671089e9377054e8e2')
//     await task.populate('owner').execPopulate()
//     console.log(task.owner)
// }

// main()









// const pet = {
//     name: 'Puss in boots',
//     password: 'how it do'
// }

// pet.toJSON = function () {
//     delete this.password
//     return this
// }

// console.log(JSON.stringify(pet))



// const jwt = require('jsonwebtoken')

// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'thisislegit', { expiresIn: '7 days' })
//     console.log(token)


//     const data = jwt.verify(token, 'thisislegit')
//     console.log(data)
// }

// myFunction()



