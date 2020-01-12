const mongoose = require("mongoose");
const filmSchema = mongoose.Schema(
    {
      title: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true,
        required: true
      },
      synopsis:{
          type:String,
          required:true,
      },
      duree:{
          type:Number,
          required:true, 
          unique:false     
      },
      studio:{
        type:String,
        required:true,
      },
      category:{
        type:String,
        required:true,
      }
    },
    { timestamps: { createdAt: "created_at" } }
  );
  module.exports = mongoose.model("Film", filmSchema);