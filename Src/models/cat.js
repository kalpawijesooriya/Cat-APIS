const mongoose=require('mongoose')
const validator = require('validator');

const User= mongoose.model('Cat',{
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        validate(value){
            if(value<0){
                throw new Error('Age Must Be Possitive')

            }
        }
    },
    description:{
        type:String,
        required:true
    },

})

module.exports=User