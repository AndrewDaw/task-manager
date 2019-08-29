const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')


const avatar = multer({
    dest: 'images'
})
const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try{
        const token = await user.generateAuthTokenAndSave()
        res.status(201).send( {user , token} )
    }catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user =  await User.login(req.body.email, req.body.password)
        const token = await user.generateAuthTokenAndSave()
        res.send({user, token})
    } catch (e) {
        res.status(400).send()

    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        
        req.user.tokens = req.user.tokens.filter((token) =>  token.token !== req.token)

        await req.user.save()

        res.send()
    }catch {
        res.status(500).send()
    }
})


router.post('/users/logout-all', auth, async (req, res) => {
    try {
        
        req.user.tokens = []

        await req.user.save()

        res.send()
    }catch {
        res.status(500).send()
    }
})


router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id
//     try {
//         const user = await User.findById({_id})
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
      
    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }
    try {
        const user = await req.user
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()

        res.send(user)

    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()

        res.send(req.user)
    }catch (e) {
        res.status(500).send(e)
        console.log(e)
    }
})

//for uploading files
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png|bmp)$/)) {
            return cb(new Error('Please upload an image'))
        }
        cb(undefined, true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req,res) => {
    req.user.avatar = req.file.buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth, async (req,res) => {
    req.user.avatar = undefined
    await req.user.save
    res.send()
})

router.get('/users/:id/avatar', async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.avatar) {
            console.log('grrr')
            throw new Error()
        }
        res.set('Content-Type', 'image/jpg')
        res.send(user.avatar)

    } catch {
        res.status(404).send()
        console.log('Cant find image')
    }
})



module.exports = router
