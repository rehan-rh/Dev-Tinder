const mongoose = require("mongoose");
const validator = require('validator');//npm validator docs
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 100,
    },
    lastName: {
      type: String,
    },
    emailId: {
      type: String,
      required: true,
      unique: true,//for not duplicate
      lowercase: true, //to convert entered caps to lowercase
      trim: true,
      validate(value){
        if(!validator.isEmail(value))
        {
          throw new Error("Invalid email....!"+value);
        }

      },
    },
    password: {
      type: String,
      required: true,
      validate(value){
        if(!validator.isStrongPassword(value))
        {
          throw new Error("enter strong password....!    "+value);
        }

      },
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQdztTDcpZ2pFqwWDYwSXbvZq5nzJYg5cn8w&s",
        validate(value){
          if(!validator.isURL(value))
          {
            throw new Error("Invalid URL....!    "+value);
          }
  
        },
    },
    about: {
      type: String,
      default: "this is default",
    },
    skills: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
