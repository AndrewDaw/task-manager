

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const dbName = 'task-manager'

MongoClient.connect(connectionURL, { useNewUrlParse: true }, (error, client) => {
    if(error){
        return console.log('oops, database couldnt connect );')
    }
    console.log("aaay, we connected")

} )


