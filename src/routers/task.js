const express=require('express')
const auth = require('../middleware/auth')
const { update } = require('../models/task')
const tasks=require('../models/task')
const router=new express.Router()

router.post('/tasks', auth, async (req,res) => {
    //const task=new tasks(req.body)
    const task = new tasks({
        ...req.body,
        owner: req.user._id
    })
    try{
        await task.save()
        res.status(201).send(task)
    }catch(e) {
        res.status(400).send(e)
    }
})
//GET /tasks?completed=true
//GET /tasks?Limit=10&skip=20
//GET /tasks?sortBy=createdAt:asc
router.get('/tasks', auth, async (req, res) =>{
    const match = {}
    const sort ={}

    if (req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 :1

    }   

    try{
        //const task=await tasks.find({ owner: req.user._id})
        await req.user.populate({
            path: 'usertasks',
            match: match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort: sort
            }
        }).execPopulate()
        res.send(req.user.usertasks)
    }catch(e){
        res.status(400).send()
    }
})

router.get('/tasks/:id', auth, async (req, res) =>{
    
    try{
        // const task=await tasks.findById(_idt)
        const task = await tasks.findOne({ _id: req.params.id, owner: req.user._id})
        if(!task) {
            res.status(404).send()
        }
        res.send(task)
    }catch(e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth,async (req,res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdate =['completed','discription']
    const isValidOperation = updates.every((update) => allowedUpdate.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'Invalid updates!'})
    }
    
    try{
        const task = await tasks.findOne({ _id: req.params.id, owner: req.user._id})

        if(!task) {
            return res.status(404).send()
        }
        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)

    }catch(e){
        res.status(400).send()
    }
})

router.delete('/tasks/:id', auth,async (req,res) =>{
    try{
        const task = await tasks.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    } catch(e) {
        res.status(500).send()
    }
})

module.exports=router