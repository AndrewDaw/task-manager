const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')

const router = new express.Router()

router.post('/tasks', auth, async (req, res) => {
    

    const task = new Task({
        ...req.body,
        owner: req.user._id
    })

    try{
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})


//GET /tasks?completed=true
//GET /tasks?limit=10&skip=10
//GET /tasks?sortBy=createdAt_desc
router.get('/tasks', auth, async (req, res) => {
    var ascending = ''//used later for sort command
    var completedReq
    try {
        
        if(req.query.sortBy == null){
            var field='createdAt'
        } else {//no query string provided so dont try do things with it

        //checks to see if desending has been specified and sets ascending to negative if so
        const sortPatt = /(?<=_)[\w+.-]+/
        if(sortPatt.exec(req.query.sortBy)[0] == 'desc'){
            ascending = '-'
        }

        const fieldPatt = /\w+(?=.*_)/
        field = fieldPatt.exec(req.query.sortBy)[0]

        
    }


        if(req.query.completed){
            var tasks = await Task.find({owner: req.user._id})
            .where({completed: req.query.completed})
            .limit(parseInt(req.query.limit))
            .skip(parseInt(req.query.skip))
            .sort(ascending+field)
        }else{
            tasks = await Task.find({owner: req.user._id}) 
            .limit(parseInt(req.query.limit))
            .skip(parseInt(req.query.skip))
            .sort(ascending+field)
        }

            if(!tasks){
                res.status(404).send()
            }
            res.send(tasks)
        
       
        
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({_id, owner: req.user._id})
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
   
})

router.patch('/tasks/:id', auth,async (req, res) => {
    const _id = req.params.id
    const allowedUpdates = ['completed', 'description']
    const updates = Object.keys(req.body)
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid update fields!'})
    }

    try{
        const task = await Task.findOne({_id, owner: req.user._id})
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.send(400).send(e)
    }

})

router.delete('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try{
        const task = await Task.findOneAndDelete({_id, owner: req.user._id})
        if(!task){
            res.status(404).send()
        }

        res.send(task)

    } catch (e) {
        res.status(400).send()
    }
    

})


module.exports = router
