const express=require("express")
const mongoose=require('mongoose')
const cors=require('cors')
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const cookieParser=require("cookie-parser")
const nodemailer = require("nodemailer")
const BidderModel = require("./models/Bidder")
const Items=require("./models/Product")

const app=express()
app.use(express.json())
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))
app.use(cookieParser())

mongoose.connect("mongodb://127.0.0.1:27017/bidder");

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json("The token was not available");
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if (err) {
                return res.json("Token is wrong");
            }
            req.user = decoded;
            next();
        });
    }
};

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "venky200307@gmail.com",
        pass: "xupb fmfd zhul xvlw"
    }
});

app.get('/home', verifyUser, (req, res) => {
    res.json({ message: "Success", name: req.user.name ,email:req.user.email});
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    BidderModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, response) => {
                    if (response) {
                        const token = jwt.sign({ email: user.email, name: user.firstname }, "jwt-secret-key", { expiresIn: "1d" });
                        res.cookie("token", token);
                        res.json({ message: "Success", name: user.firstname, email:user.email, token });
                    } else {
                        res.json({ message: "The Password is incorrect" });
                    }
                });
            } else {
                res.json({ message: "No such Email exists" });
            }
        });
});

app.get('/auct/:name', async (req, res) => {
    const itemName = req.params.name;
    try {
        const auctionItem = await Items.findOne({ name: itemName });
        if (auctionItem) {
            res.json(auctionItem);
        } else {
            res.status(404).send('Auction item not found');
        }
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});


app.post('/bid', (req, res) => {
    const { Itemname, userEmail, userName, bid } = req.body;
    Items.findOne({ name: Itemname })
        .then(item => {
            if (bid > item.currentbid) {
                const outbidUser = item.history.find(history => history.bidamt === item.currentbid);
                if (outbidUser) {
                    const mailOptions = {
                        from: 'venky200307@gmail.com',    
                        to: outbidUser.email,
                        subject: 'You have been outbid!',
                        text: `Hello ${outbidUser.user},\n\nYou have been outbid on the item ${item.name}. The new bid amount is ${bid}.\n\nThank you.`
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                }
                item.history.push({ user: userName, email: userEmail, bidamt: bid });
                item.currentbid = bid;
                item.save()
                    .then(updatedItem => res.json({ message: 'Bid placed successfully!', item: updatedItem }))
                    .catch(err => res.status(500).json({ message: 'Error saving bid.', error: err }));
            } else {
                res.json({ message: 'Bid must be higher than the current bid.' });
            }
        })
        .catch(err => res.status(500).json({ message: 'Error finding item.', error: err }));
});


app.post('/rev', (req, res) => {
    const { Itemname, userName, view } = req.body;
    Items.findOne({ name: Itemname })
        .then(item => {
            if (!item) {
                return res.status(404).json({ message: 'Item not found.' });
            }
            else {
                item.review.push({ user: userName,content: view});
                item.save()
                    .then(updatedItem => res.json({ message: 'Review placed successfully!', item: updatedItem }))
                    .catch(err => res.status(500).json({ message: 'Error saving review.', error: err }));
            } 
        })
        .catch(err => res.status(500).json({ message: 'Error finding item.', error: err }));
});
        

app.post('/register',(req,res)=>{
    const {firstname,lastname,email,password}=req.body;
    bcrypt.hash(password,10)
    .then(hash=>{
        BidderModel.create({firstname,lastname,email,password:hash})
        .then(bidders=>res.json(bidders))
        .catch(err=>res.json(err))
    })
    .catch(err=>console.log(err.messasge))
})

app.get("/auc",(req,res)=>{
    Items.find({})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

app.get('/getUser/:id',(req,res)=>{
    const id=req.params.id;
    Items.findById({_id:id})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

app.post("/createUser",(req,res)=>{
    Items.create(req.body)
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

app.put('/updateUser/:id',(req,res)=>{
    const id=req.params.id;
    Items.findByIdAndUpdate({_id:id},{image:req.body.image,status:req.body.status,name:req.body.name,minbid:req.body.minbid,currentbid:req.body.currentbid,endsin:req.body.endsin,seller:req.body.seller})
    .then(users=>res.json(users))
    .catch(err=>res.json(err))
})

app.delete('/deleteUser/:id',(req,res)=>{
    const id=req.params.id;
    Items.findByIdAndDelete({_id:id})
    .then(res=>res.json(res))
    .catch(err=>res.json(err))
})


app.post('/logout', (req, res) => {
    res.clearCookie('token'); // 'token' is the name of your cookie
    res.json({ message: 'Logout successful' });
});
  

app.listen(3001,()=>{
    console.log("Server is running")
})