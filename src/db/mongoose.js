const mongoose = require('mongoose')

const connectionURL = 'mongodb://127.0.0.1:27017'
const dbName = 'task-manager-api'


mongoose.connect(connectionURL+'/'+dbName ,{
    useNewUrlParser: true,
    useCreateIndex: true
})

const Task = mongoose.model('Task', {
    description: {
        type: String,
        trim: true,
        required: true
    }, 
    completed: {
        type: Boolean,
        default: false
    }
})