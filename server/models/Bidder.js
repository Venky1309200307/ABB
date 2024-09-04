const mongoose=require("mongoose")

const BidderSchema=new mongoose.Schema({
    firstname: {type:String,required:true},
    lastname: String,
    email: {type:String,required:true},
    password:{type:String,required:true}
})

const BidderModel=mongoose.model("bidders",BidderSchema)
module.exports=BidderModel;