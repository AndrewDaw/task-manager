const mongoose = require('mongoose')


const dbName = 'task-manager-api'

mongoose.connect(process.env.MONGODB_URL+'/'+dbName ,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})
