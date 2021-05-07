const mongoose=require('mongoose')
const validator=require('validator')

const taskShema = new mongoose.Schema({
    discription: {
        type: String,
        trim:true,
        require:true,
    },
    completed: {
        type: Boolean,
        default:false,   
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    }
},{
    timestamps:true
})

const tasks=mongoose.model('tasks',taskShema)


module.exports = tasks