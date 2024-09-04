const mongoose=require('mongoose')

const ReviewSchema=new mongoose.Schema({
    user:{type:String,required:true},
    content:{type:String,required:true},
})

const BidHistorySchema=new mongoose.Schema({
    user:{type:String,required:true},
    email:{type:String,required:true},
    bidamt:{type:Number,required:true},
})
const ItemSchema=new mongoose.Schema({
    name:{type:String,required:true},
    status:{type:String},
    minbid:{type:Number,required:true},
    currentbid:{type:Number},
    image:{type:String,required:true},
    endsin:{type:Date,required:true},
    seller:{type:String,required:true},
    review:{type:[ReviewSchema],default:[]},
    history:{type:[BidHistorySchema],default:[]}
})

ItemSchema.pre('save', function(next) {
    if (this.history.length > 0) {
        const highestBid = Math.max(...this.history.map(bid => bid.bidamt));
        this.currentbid =  highestBid;
    } else {
        this.currentbid = this.minbid;
    }
    const now = new Date();
    if (this.endsin > now) {
        this.status = 'Live';
    } else {
        this.status = 'Ended';
    }
    next();
});

const Items= mongoose.model("items",ItemSchema);
module.exports=Items