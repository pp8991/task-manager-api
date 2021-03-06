const express=require('express')
require('./db/mongoose')
const User=require('./models/user')
const tasks=require('./models/task')
const { update } = require('./models/user')
const userRouter = require('./routers/user')
const taskRouter =require('./routers/task')

const app=express()
const port=process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is Up on port! '+ port)
})

