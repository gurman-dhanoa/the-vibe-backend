const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your Name"],
        minLength:[3,"Your name should contain min 3 character"]
    },
    image:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    listening:{
        type:Number,
        required:[true,"Please enter Listening Score"],
    },
    reading:{
        type:Number,
        required:[true,"Please enter Reading Score"],
    },
    speaking:{
        type:Number,
        required:[true,"Please enter Speaking Score"],
    },
    writing:{
        type:Number,
        required:[true,"Please enter Writing Score"],
    },
    overall:{
        type:Number,
        required:[true,"Please enter Over all Score"],
    },

});

module.exports = mongoose.model("Student",studentSchema);