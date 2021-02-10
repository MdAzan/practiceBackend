const Schema = require('mongoose').Schema;

const studentSchema = new Schema(
    {
        firstName:{
            type: String,
            trim: true,
            minlength: 2,
            maxlength: 15,
            required: true
        },
        lastName:{
            type: String,
            trim: true,
            minlength: 2,
            maxlength: 15,
            required: true 
        },
        address:{
            type: String,
            trim: true,
            minlength: 5,
            maxlength: 50,
            required: true
        },
        collegeName:{
            type: String,
            trim: true,
            minlength: 5,
            maxlength: 50,
            required: true 
        },
        sessionName:{
            type: String,
            trim: true,
            minlength: 2,
            maxlength: 35,
            required: true 
        },
        email:{
            type: String,
            trim: true,
            required: true
        },
        phone:{
            type: String,
            required: true,
            minlength: 11,
            maxlength: 15,
            trim: true
        },
        password: {
            type: String,
            minlength:5,
            maxlength: 30,
            required: true
        }
    },
    {timestamps: true}
)


const studentModel = require('mongoose').model("New_Student_List", studentSchema);

module.exports = studentModel;