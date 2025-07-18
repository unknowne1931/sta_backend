const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
const { hash } = require('crypto');
const authMiddleware = require('./module/authmidle');
const adminMidleware = require('./module/adminMidle');
const adminMiddleware = require('./module/adminMidle');
const { type } = require('os');
const fs = require('fs')
const https = require('https');
const Razorpay = require("razorpay");
const users_admin_Middle = require('./module/admin_users_Midle');
const admin = require("firebase-admin");
const { Server } = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);


const io = new Server(server, {
    cors: {
        origin: '*'
    }
});


app.use(express.static('public'))
// app.use(express.json());
app.use(bodyParser.json());


// Initialize Firebase Admin SDK
const serviceAccount = require("./firebase-adminsdk.json"); // Ensure the correct path

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});




app.use(express.json());


app.use(cors({
    origin:  "*", // Allow any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


const Time = new Date().toLocaleString();
// MongoDB connection
const mongoURI = "mongodb+srv://instasecur24:kick@flutterdata.cgalmbt.mongodb.net/?retryWrites=true&w=majority&appName=flutterdata"
mongoose.connect(mongoURI,)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));



const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};
  

//https

// const key = fs.readFileSync('private.key')
// const cert = fs.readFileSync('certificate.crt')
// const cred = {
//   key,
//   cert
// }

// const httpsServer = https.createServer(cred, app)
// httpsServer.listen(443);

//https end

app.get('/', (req, res) => {
    res.send('Hello, Keerthi');
});

const UsersSchema = new mongoose.Schema({
      
    Time : String,
    pass : String,
    email : String,
    username : String,
    name : String,
    valid : {
        default : "no",
        type : String
    }

  });
  
const Usermodule = mongoose.model('pass', UsersSchema);


let transporter = nodemailer.createTransport({
    service: 'gmail', // You can use any email service
    auth: {
        user: 'stawropuzzle@gmail.com',
        pass: 'osrz jhwt tcqx zeyf' // Be careful with your email password
    }
  });


const user_s_otpSchema = new mongoose.Schema({
    Time: String,
    username : String,
    otp : String
}, { timestamps: true });

const User_s_OTP_module = mongoose.model('Users_OTP', user_s_otpSchema);
  


app.post('/post/new/user/data', async (req, res) => {
    const { pass, email, username, name } = req.body;

    try {
        // Validate email format
        if (!email.includes("@gmail.com")) {
            return res.status(200).json({ Status: "BAD_EML", message: "Invalid email domain." });
        }

        // Check for existing user by email and OTP
        const existingUserByEmail = await Usermodule.findOne({ email });
        const existingOTP = await User_s_OTP_module.findOne({ username });

        // Remove invalid users or stale OTPs
        if (existingOTP) await existingOTP.deleteOne();
        if (existingUserByEmail && existingUserByEmail.valid === "no") await existingUserByEmail.deleteOne();

        // Check again for updated data
        const userByEmail = await Usermodule.findOne({ email });
        const userByUsername = await Usermodule.findOne({ username });

        if (userByEmail && userByEmail.valid === "yes") {
            return res.status(200).json({ Status: "IN", message: "User already exists." });
        }

        if (!userByEmail && !userByUsername) {
            // Hash password and create user
            const hash = await bcrypt.hash(pass, 10);

            const OTP = generateOTP();
            const Time = new Date(); // Assuming Time is required in your schema

            // Create user and OTP entries
            await Usermodule.create({ pass: hash, email, username, name, Time });
            const otpData = await User_s_OTP_module.create({ Time, username, otp: OTP });

            // Prepare email
            const mailOptions = {
                from: "stawropuzzle@gmail.com",
                to: email,
                subject: "Congratulations, your account has been successfully created on staWro.",
                html: `
                    <html lang="en">

                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>staWro Account Verification</title>
                        </head>

                        <body>
                            <div>
                                <h2>Welcome to staWro, ${username}!</h2>
                                <p>Your account has been successfully created. Please verify your email using the OTP below:</p>
                                <h3>OTP: ${otpData.otp}</h3>
                                <p>After verification, you can access the login page by clicking the link below:</p>
                                <a href="https://www.stawro.com/login" target="_blank">Login</a>
                                <p>Thank you for joining us!</p>
                            </div>
                        </body>
                    </html>
                `,
            };

            // Send email
            transporter.sendMail(mailOptions, (error) => {
                if (error) {
                    console.error("Error sending email:", error);
                    return res.status(200).json({ Status: "EMAIL_ERR", message: "Failed to send email." });
                }

                return res.status(200).json({ Status: "OK", message: "User registered successfully. OTP sent via email." });
            });
        } else {
            return res.status(200).json({ Status: "UIN", message: "Username already in use." });
        }
    } catch (error) {
        console.error("Error in /post/new/user/data:", error);
        return res.status(500).json({ Status: "ERR_SERVER", message: "Internal Server Error." });
    }
});


app.post('/get/all/users/data/otp/to/verify', async (req, res) => {
    const { OTP, username } = req.body;

    try {
        // Find the user with the provided username
        const find_user = await User_s_OTP_module.findOne({ username });

        // Check if user and OTP match
        if (find_user && find_user.otp === OTP) {
            // Update the user's valid status in the main user module
            const mainUser = await Usermodule.findOne({ username });
            if (mainUser) {
                mainUser.valid = "yes";
                await mainUser.save();
            }

            // Delete the OTP record

            await find_user.deleteOne();

            return res.status(200).json({ Status: "OK", message: "OTP verified successfully." });
        } else {
            return res.status(200).json({ Status: "BAD", message: "Invalid OTP or username." });
        }
    } catch (error) {
        console.error("Error during OTP verification:", error);
        return res.status(500).json({ message: "Internal Server Error." });
    }
});


app.post('/get/all/users/data/otp/to/verify/02', async (req, res) => {
    const { OTP, data } = req.body;

    try {
        // Find the user with the provided username

        const user = await Usermodule.findOne({
            $or: [{ username: data.trim() }, { email: data.trim() }]
        });

        const find_user = await User_s_OTP_module.findOne({ username : user.username });

        // Check if user and OTP match
        if (find_user && find_user.otp === OTP) {
            // Update the user's valid status in the main user module
            const mainUser = await Usermodule.findOne({ email : user.email });
            if (mainUser) {
                mainUser.valid = "yes";
                await mainUser.save();
            }

            // Delete the OTP record

            await find_user.deleteOne();
            
            const token = jwt.sign({ id : user._id }, "kanna_staWro_founders_withhh_1931_liketha", { expiresIn: "365 days" });
            return res.status(200).json({ Status: "OK", token, user : user._id , username : user.username});

        }
        else {
            return res.status(200).json({ Status: "BAD", message: "Invalid OTP or username." });
        }
    } catch (error) {
        console.error("Error during OTP verification:", error);
        return res.status(500).json({ message: "Internal Server Error." });
    }
});


app.post('/get/new/otp/to/verify', async (req, res) =>{
    const {data} = req.body;
    try{
        const user = await Usermodule.findOne({
            $or: [{ username: data.trim() }, { email: data.trim() }]
        });
        const OTP = generateOTP();
        if(user.valid === "no"){
            const otp_get = await User_s_OTP_module.findOne({username : user.username})
            if(otp_get){
                await otp_get.deleteOne();
            }else{
                const otpData = await User_s_OTP_module.create({ Time, username : user.username, otp: OTP });

                let mailOptions = {
                    from: "stawropuzzle@gmail.com",
                    to: user.email,
                    subject: "Congratulations, your account has been successfully created on staWro.",
                    html: `
                    <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>staWro Account Verification</title>
                        </head>
                        <body>
                            <div>
                                <h2>Welcome to staWro, ${user.username}!</h2>
                                <p>Your account has been successfully created. Please verify your email using the OTP below:</p>
                                <h3>OTP: ${otpData.otp}</h3>
                                <p>After verification, you can access the login page by clicking the link below:</p>
                                <a href="https://www.stawro.com/login" target="_blank">Login</a>
                                <p>Thank you for joining us!</p>
                            </div>
                        </body>
                    </html>
                    `,
                };

                // Send email
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error("Error sending email:", error);
                        return res.status(200).json({ Status: "EMAIL_ERR", message: "Failed to send email." });
                    }

                    return res.status(200).json({ Status: "OK", message: "User registered successfully. OTP sent via email." });
                });

            }
        }
    }catch (error) {
        console.error("Error during OTP verification:", error);
        return res.status(500).json({ message: "Internal Server Error." });
    }
})


//login and token

app.post('/login/data', async (req, res) => {
    const { data, pass } = req.body;
    try {
        // Check if the data is an email or username
        // Find user by email or username
        const user = await Usermodule.findOne({
            $or: [{ username: data.trim() }, { email: data.trim() }]
          });

        if(user && user.valid === "yes") {
            bcrypt.compare(pass, user.pass, (err, response) => {
                if (response) {
                    const token = jwt.sign({ id : user._id }, "kanna_staWro_founders_withhh_1931_liketha", { expiresIn: "365 days" });
                    res.json({ Status: "OK", token, user : user._id , username : user.username});
                } 
                else{
                    console.log(err)
                    return res.json({ Status: "BAD" });
                }
            })
        }else if(user && user.valid !== "yes"){
            return res.status(202).json({ Status: "NO-YES", user : user.username });
        }
         else {
            return res.status(202).json({ Status: "NO" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post("/pass/send/requests", async (req, res) =>{
    const {data} = req.body;
    try{
        const user = await Usermodule.findOne({
            $or: [{ username: data.trim() }, { email: data.trim() }]
        });

        if(user){
            const token = jwt.sign({ id: user._id }, "kanna_staWro_founders_withhh_1931_liketha_pass-worff", { expiresIn: "1h" });
            let mailOptions = {
                from: 'stawropuzzle@gmail.com', // Sender address
                to: `${user.email}`, // List of recipients
                subject: `staWro, Change Password`, // Subject line
                text: '', // Plain text body
                html: `
                
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <meta http-equiv="refresh" content="30" />
                        <title>Document</title>
                        <style>
        
                            @import url('https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@400;700&display=swap');
        
        
                            .email-main-cnt-01{
                                width: 95%;
                                justify-content: center;
                                margin: auto;
                            }
        
                            .email-cnt-01{
                                width: 90%;
                                height: auto;
                                display: flex;
                                margin: 10px;
                            }
        
                            .email-cnt-01 div{
                                width: 50px;
                                height: 50px;
                                overflow: hidden;
                                border-radius: 50%;
                                border: 1px solid;
                                
                            }
        
                            .email-cnt-01 div img{
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                            }
        
                            .email-cnt-01 strong{
                                font-family: Inknut Antiqua;
                                margin-left: 10px;
                            }
        
                            .email-cnt-btn-01{
                                width: 120px;
                                height: 30px;
                                margin: 10px;
                                color: aliceblue;
                                background-color: rgb(5, 148, 195);
                                border: 1px solid;
                                border-radius: 5px;
                                cursor: pointer;
                            }
        
        
                        </style>
                    </head>
                    <body>
                        <div class="email-main-cnt-01">
                            <div class="email-cnt-01">
                                <strong>staWro</strong>
                            </div>
                            <div class="email-cnt-02">
                                <span>Hello, Dear <strong>${user.username}</strong> </span><br/>
                                <p>Welcome to staWro.<br/>
                                Change to a new password by clicking on the 'Update' text</p><br/>
                                    <a href = "https://www.stawro.com/changepass?id=${token}&user=${user._id}" style="text-decoration: none;">Update</a>
                                <strong></strong><br/>
                     
                                <strong>Thank you</strong>
        
                            </div>
                        </div>
                        
                    </body>
                    </html>
        
                ` // HTML body
              };
              
              // Send email
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    return res.status(202).json({message : "Something went Wrong"})
                }
                return res.status(200).json({Status : "OK"})
              });


        }else{
            return res.status(202).json({ Status: "NO" });
        }

    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


app.post("/update/password/without/token", async (req, res) => {
    const { pass, oldpass, user } = req.body;
    try {
        const data = await Usermodule.findOne({_id : user});
        if (!data) {
            return res.status(404).json({ status: "User Not Found" });
        }

        const isMatch = await bcrypt.compare(oldpass, data.pass);
        if (isMatch) {
            const hash = await bcrypt.hash(pass, 10);
            data.pass = hash;
            data.Time = new Date(); // Assuming you want to set the current date/time
            await data.save();
            return res.status(200).json({ Status: "OK" });
        } else {
            return res.status(202).json({ Status: "NO" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


app.post("/update/new/pass/by/token", async (req, res)=>{
    const {pass, token, id} = req.body;

    try{
        if(token){
            const decoded = jwt.verify(token, 'kanna_staWro_founders_withhh_1931_liketha_pass-worff');
            if(decoded.id === id){
                const User = await Usermodule.findOne({_id : decoded.id})
                const hash = await bcrypt.hash(pass, 10);
              
              // Update the user's password and time
                User.pass = hash;
                User.Time = new Date().toLocaleString();
                await User.save();
                return res.status(200).json({Status : "OK"})
          
            }
            else{
                console.log({Status : "NOT VALID"})
                return res.status(202).json({ Status: "NO Token" });
                
            }

        }else{
            return res.status(202).json({ Status: "NO Token" });
        }
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})




const BalanceSchema = new mongoose.Schema({
    Time: String,
    user: String,
    balance: String,
}, { timestamps: true });

const Balancemodule = mongoose.model('Balance', BalanceSchema);

app.post('/get/balance/new/data',authMiddleware,async(req, res)=>{
    const {user} = req.body;

    try{
        const data = await Balancemodule.findOne({user : user})
        if(!data){
            await Balancemodule.create({user, Time, balance : "15"});
            await Historymodule.create({Time, user, rupee : "15", type : "Credited", tp : "Rupee"});
            const data1 = StarBalmodule.findOne({user})
            if(data1){
                return res.status(200).json({ Status: "OK" });
            }else{
                await Historymodule.create({Time, user, rupee : "2", type : "Credited", tp : "Stars"});
                await StarBalmodule.create({Time, user, balance : "2"});
                return res.status(200).json({ Status: "OK" });
            }
            
        }else{
            return res.status(202).json({ Status: "NO" });
        } 
    }catch (error) { 
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

app.get("/get/acount/balence/:user", authMiddleware, async (req, res) =>{
    const user = req.params.user;
    try{
        const data = await Balancemodule.findOne({user : user})
        if(data){
            return res.status(200).json({data})
        }else{
            return res.status(202).json({Status : "NO"})
        }
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error"});
    }
})


const HistorySchema = new mongoose.Schema({
      
    Time : String,
    user : String,
    rupee : String,
    type : String,
    tp : String,

});


const Historymodule = mongoose.model('History', HistorySchema);

app.get('/update/data/:user', async (req, res) =>{
    const user = req.params.user;
    try{
        const data = await Historymodule.find({user : user}).sort({ createdAt: -1 })
        if(data){
            return res.status(200).json({data})
        }else{
            return res.status(400).json({message : "Error"})
        }
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


const UPI_BANKSchema = new mongoose.Schema({
    Time: String,
    user: String,
    ac_h_nme: String,
    bank_nme : {
        default : "No",
        type : String
    },
    Acc_no : String,
    ifsc : {
        default : "No",
        type : String
    },
    app : {
        default : "No",
        type : String
    },
    type : String

}, { timestamps: true });

const UPImodule = mongoose.model('Baank_UPI', UPI_BANKSchema);

app.post("/bank/upi/data/collect", async (req, res) =>{
    const {user, ac_h_nme, bank_nme, Acc_no, ifsc, app, type} = req.body;
    try{
        const data = await UPImodule.findOne({user : user})
        if(!data){
            await UPImodule.create({user, ac_h_nme, bank_nme, Acc_no, ifsc, app, type})
            return res.status(200).json({Status : "OK"})
        }else{
            return res.status(200).json({Status : "IN"})
        }
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

app.get("/get/bank/account/data/:user", authMiddleware, async (req, res) =>{
    const user = req.params.user;
    try{
        const data = await UPImodule.findOne({user : user})
        if(data){
            return res.status(200).json({data})
        }else{
            return res.status(202).json({Status : "No"})
        }
    }catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})



const CoinSchema = new mongoose.Schema({
    Time: String,
    title : String,
    img : String,
    valid : String,
    body : String,
    stars : String,
}, { timestamps: true });

const Coinmodule = mongoose.model('Coins', CoinSchema);

app.post("/coin/new/data", async (req, res) =>{
    const {title, img, valid, body, stars} = req.body;
    try{
        await Coinmodule.create({title, img, valid, body, stars,Time})
        return res.status(202).json({Status : "OK"})

    }catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

app.get("/get/coin/data",async (req, res) =>{
    try{
        const data = await Coinmodule.find({})
        if(data){
            return res.status(200).json({data})
        }else{
            return res.status(400).json({Status : "BAD"})
        }
    }catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
} )

app.get("/get/coin/data/2", adminMidleware,async (req, res) =>{
    try{
        const data = await Coinmodule.find({})
        if(data){
            return res.status(200).json({data})
        }else{
            return res.status(400).json({Status : "BAD"})
        }
    }catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
} )


app.delete("/delete/coin/by/:id", async(req, res) =>{
    const id = req.params.id;
    try{
        const data = await Coinmodule.findOne({_id : id})
        if(data){
            await data.deleteOne();
            return res.status(202).json({Status : "OK"})
        }else{
            return res.status(202).json({Status : "BAD"})
        }
    }catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


const MyCoinsSchema = new mongoose.Schema({
    Time: String,
    title : String,
    img : String,
    valid : String,
    body : String,
    stars : String,
    type : String,
    user : String
}, { timestamps: true });

const Mycoinsmodule = mongoose.model('My_Coins', MyCoinsSchema);

app.post('/get/my/conis/get', authMiddleware,async (req, res) =>{
    const {id, user} = req.body;
    try{
        const data = await Coinmodule.findById({_id : id})
        const data1 = await StarBalmodule.findOne({user})

        if(data && data1){
            if(parseInt(data1.balance) >= parseInt(data.stars) ){
                const sum = parseInt(data1.balance) - parseInt(data.stars);
                // await StarBalmodule.create({Time, user, balance : "2"});
                await data1.updateOne({balance : sum})
                //coins to my coins
                await Mycoinsmodule.create({Time, title : data.title, img : data.img, valid : data.valid, body : data.body, stars : data.stars, type : "Stars", user})
                await Historymodule.create({Time, user, rupee : data.stars, type : "Debited", tp : "Stars"});
                return res.status(202).json({Status : "OK"})
            }
            else{
                return res.status(202).json({Status : "Low Bal", message : "Low Balance"})
            }

        }else if(!data1){
            await StarBalmodule.create({Time, user, balance : "2"});
            // History
            await Historymodule.create({Time, user, rupee : "2", type : "Credited", tp : "Stars"});
            return res.status(202).json({Status : "Low Bal"})
        }else{
            return res.status(301).json({Status : "BAD"})
        }
    }catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

app.get('/get/coins/data/by/id/:user', authMiddleware,async (req, res) =>{
    const user = req.params.user;
    try{
        const data = await Mycoinsmodule.find({user})
        if(data){
            return res.status(200).json({data})

        }else{
            return res.status(200).json({Status : "BAD"})
        }
    }catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

const StarBalSchema = new mongoose.Schema({
    Time: String,
    user: String,
    balance: String,
}, { timestamps: true });

const StarBalmodule = mongoose.model('Star_Bal', StarBalSchema);

app.get('/get/stars/balance/:user', async (req, res)=>{
    const user = req.params.user;
    try{
        const data = await StarBalmodule.findOne({user})
        if(!data){
            await StarBalmodule.create({Time, user : user, balance : "2"});
            // History
            await Historymodule.create({Time, user, rupee : "2", type : "Credited", tp : "Stars"});
            return res.status(200).json({Status : "OKK"});
        }else{
            return res.status(200).json({data});
        }
        
    }catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

const CliamReqSchema = new mongoose.Schema({
    Time: String,
    title : String,
    img : String,
    valid : String,
    body : String,
    stars : String,
    type : String,
    user : String,
    ID : String
}, { timestamps: true });

const Claimrequestmodule = mongoose.model('Claim_req_Coins', CliamReqSchema);

app.post('/claim/reqst/coins/admin', async (req, res)=>{
    const {user, id} = req.body
    try{
        const Bougt_Coin = await Mycoinsmodule.findById({_id : id})
        if(Bougt_Coin.user === user){
            await Claimrequestmodule.create({Time, 
                title : Bougt_Coin.title,
                img : Bougt_Coin.img,
                valid : Bougt_Coin.valid,
                body : Bougt_Coin.body,
                stars : Bougt_Coin.stars,
                type :  Bougt_Coin.type,
                user : user,
                ID : Bougt_Coin._id
            })
            await PendingNotimodule.create({Time, user, idd : Bougt_Coin._id, type : "Coin", title : Bougt_Coin.title, sub : "pending"})
            await Bougt_Coin.deleteOne();
            return res.status(200).json({Status : "OK"})
        
        }else{
            return res.status(200).json({Status : "BAD"})
        }
    }catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

app.get("/get/requested/coins/by/:user", authMiddleware, async (req, res)=>{
    const user = req.params.user

    try{
        const data = await Claimrequestmodule.find({user})
        if(data){
            return res.status(200).json({data})
        }else{
            return res.status(400).json({Status : "BAD"})
        }
        
    }catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

app.get('/get/requested/coins/admin', adminMidleware,async (req, res) =>{
    try{
        const data = await Claimrequestmodule.find({})
        if(data){
            return res.status(200).json({data})
        }else{
            return res.status(200).json({Status : "BAD"})
        }
        
    }catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


app.delete("/find/by/id/and/delete/req/coins/:id", async (req, res) =>{
    const id = req.params.id;
    try{
        const data = await Claimrequestmodule.findById({_id : id})
        if(data){
            await ClaimedCoinsmodule.create({Time,
                title : data.title,
                img : data.img,
                valid : data.valid,
                body : data.body,
                stars : data.stars,
                type : data.type,
                user : data.user
            })
            //Pending Notification
            //sub => pending or completed
            //type => Coin or Money
            await PendingNotimodule.findOneAndDelete({idd : data.ID})
            await PendingNotimodule.create({Time, user : data.user, idd : data._id, type : "Coin", title : data.title, sub : "completed"})
            await data.deleteOne();
            return res.status(202).json({Status : "OK"})
        }else{
            return res.status(202).json({Status : "BAD"})
        }
    }catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

const ClimedReqSchema = new mongoose.Schema({
    Time: String,
    title : String,
    img : String,
    valid : String,
    body : String,
    stars : String,
    type : String,
    user : String
}, { timestamps: true });

const ClaimedCoinsmodule = mongoose.model('Claimed_coins', ClimedReqSchema);

app.get('/get/claimed/from/pending/coins', async (req, res) =>{
    try{
        const data = await ClaimedCoinsmodule.find({})
        if(data){
            return res.status(200).json({data})
        }else{
            return res.status(200).json({Status : "BAD"})
        }
        
    }catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


app.get('/get/claimed/from/pending/coins/:user', authMiddleware,async (req, res) =>{
    const user = req.params.user;
    try{
        const data = await ClaimedCoinsmodule.find({user})
        if(data){
            return res.status(200).json({data})
        }else{
            return res.status(200).json({Status : "No"})
        }
        
    }catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
    
})

const PendingNotiSchema = new mongoose.Schema({
      
    Time : String,
    user : String,
    idd : String,
    type : String,
    title : String,
    sub : String

});

const PendingNotimodule = mongoose.model('Pending_Noti', PendingNotiSchema);

app.get('/get/pending/notification/:user', authMiddleware, async (req, res) =>{
    const user = req.params.user;
    try{
        const data = await PendingNotimodule.find({user})
        if(data){
            return res.status(200).json({data})
        }else{
            return res.status(400).json({Status : "BAD"})
        }
    }catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

const AdminUserSchema = new mongoose.Schema({
    Time: String,
    username : String,
    pass : String,
}, { timestamps: true });

const AdminUsermodule = mongoose.model('Admin_Users', AdminUserSchema);

app.post('/get/new/user/admin/account', async (req, res) =>{
    const {username, pass, quest, answ, id} = req.body;

    try{
        if(quest === "Hero" && answ === "Ki1931cK" && id === "193100"){
            const hash = await bcrypt.hash(pass , 10)
            await AdminUsermodule.create({Time, username, pass : hash, valid : "No" })
            return res.status(202).json({Status : "OK"})
        }else{
            return res.status(202).json({Status : "BAD"})
        }
    }catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

})

const OTPSchema = new mongoose.Schema({
    Time: String,
    username : String,
    OTP : String,
}, { timestamps: true });

const OTPmodule = mongoose.model('OTP_Data', OTPSchema);



app.post('/login/to/admin/account', async (req, res) =>{
    const {username} = req.body;
    try{
        const otp = generateOTP() 
        const user = await AdminUsermodule.findOne({username})
        if(user){
            await OTPmodule.findOneAndDelete({username : username})
            const data = await OTPmodule.create({username, Time, OTP : otp})
            let mailOptions = {
                from: 'stawropuzzle@gmail.com', // Sender address
                to: "anvithapujari036@gmail.com", // List of recipients
                subject: `staWro, Admin Login OTP`, // Subject line
                text: '', // Plain text body
                html: `
                
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <meta http-equiv="refresh" content="30" />
                        <title>Document</title>
                        <style>
        
                            @import url('https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@400;700&display=swap');
        
        
                            .email-main-cnt-01{
                                width: 95%;
                                justify-content: center;
                                margin: auto;
                            }
        
                            .email-cnt-01{
                                width: 90%;
                                height: auto;
                                display: flex;
                                margin: 10px;
                            }
        
                            .email-cnt-01 div{
                                width: 50px;
                                height: 50px;
                                overflow: hidden;
                                border-radius: 50%;
                                border: 1px solid;
                                
                            }
        
                            .email-cnt-01 div img{
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                            }
        
                            .email-cnt-01 strong{
                                font-family: Inknut Antiqua;
                                margin-left: 10px;
                            }
        
                            .email-cnt-btn-01{
                                width: 120px;
                                height: 30px;
                                margin: 10px;
                                color: aliceblue;
                                background-color: rgb(5, 148, 195);
                                border: 1px solid;
                                border-radius: 5px;
                                cursor: pointer;
                            }
        
        
                        </style>
                    </head>
                    <body>
                        <div class="email-main-cnt-01">
                            <div class="email-cnt-01">
                                <strong>staWro</strong>
                            </div>
                            <div class="email-cnt-02">
                                <span><strong>Login, Admin Account ${data.username}</strong> </span><br/>
                                <p>Your Account need Attention to Login<br />
                                    By Authentication to Admin Account<br />
                                    This is Your's OTP to Login ${data.OTP}<br />
                                    Don't Share OTP</p>
                                    
                                <strong>OTP ${data.OTP}</strong><br/>
                     
                                <strong>Thank you</strong>
        
                            </div>
                        </div>
                        
                    </body>
                    </html>
        
                ` // HTML body
              };
              
              // Send email
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                return res.json({Status : "OK"})
              });

            // if(user.valid === "Yes"){
            //     const dat = await bcrypt.compare(pass, user.pass)
            //     if(dat){
            //         const token = jwt.sign({ username : user.username }, "kanna_staWro_founders_withhh_1931_liketha_pass-worff_admin_gadi_passkey__", { expiresIn: "24h" });
            //         return res.status(202).json({Status : "OK", token })
            //     }else{
            //         return res.status(202).json({Status : "BAD"})
            //     }
            // }else{
            //     return res.status(202).json({Status : "BAD"})
            // }


        }else{
            return res.status(202).json({Status : "BAD"})
        }
    }catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


// app.post('/verify/otp/and/pass/by/admin', async (req, res) =>{
//     const {otp, username,pass} = req.body;
//     try{
//         const data = await OTPmodule.findOne({username})
//         if(data.OTP === otp){
//             await data.deleteOne();
//             const user = await AdminUsermodule.findOne({username})
//             if(user.username === username){
//                 const True = await bcrypt.compare(pass, user.pass)
//                 if(True){                    
//                     const token = jwt.sign({ username : username }, "kanna_staWro_founders_withhh_1931_liketha_pass-worff_admin_gadi_passkey__", { expiresIn: "24h" });
//                     return res.status(202).json({Status : "OK", token})
//                 }else{
//                     return res.status(202).json({Status : "BAD"})
//                 }
//             }else{
//                 return res.status(202).json({Status : "BAD"})
//             }
            
//         }else{
//             return res.status(202).json({Status : "BAD"})
//         }
//     }catch(error) {
//         console.log(error);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// })


// app.post('/verify/otp/and/pass/by/admin', async (req, res) => {
//     const { otp, username, pass } = req.body;
//     try {
//         const data = await OTPmodule.findOne({ username });
//         if (data && data.OTP === otp) {
//             await data.deleteOne();
//             const user = await AdminUsermodule.findOne({ username });
//             if (user && user.username === username) {
//                 const isPasswordCorrect = bcrypt.compare(pass, user.pass);
//                 if (isPasswordCorrect) {
//                     const token = jwt.sign(
//                         { username: username },
//                         "kanna_staWro_founders_withhh_1931_liketha_pass-worff_admin_gadi_passkey__",
//                         { expiresIn: "24h" }
//                     );
//                     return res.status(202).json({ Status: "OK", token });
//                 } else {
//                     return res.status(202).json({ Status: "BAD", message: "Invalid password" });
//                 }
//             } else {
//                 return res.status(202).json({ Status: "BAD", message: "User not found" });
//             }
//         } else {
//             return res.status(202).json({ Status: "BAD", message: "Invalid OTP" });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// });


app.post('/verify/otp/and/pass/by/admin', async (req, res) => {
    const { otp, username, pass } = req.body;
    try {
        // Verify OTP
        const data = await OTPmodule.findOne({ username });
        if (!data || data.OTP !== otp) {
            return res.status(200).json({ status: "BAD", message: "Invalid OTP" });
        }

        // OTP is valid, delete it
        await data.deleteOne();

        // Verify user credentials
        const user = await AdminUsermodule.findOne({ username });
        if (!user) {
            return res.status(200).json({ Status: "BAD"});
        }

        // const isPasswordCorrect = await bcrypt.compare(pass, user.pass);
        bcrypt.compare(pass, user.pass, (err, response) => {
            if (response) {
                // Generate JWT token
                const token = jwt.sign(
                    { username },
                    process.env.JWT_SECRET || "kanna_staWro_founders_withhh_1931_liketha_pass-worff_admin_gadi_passkey__", // Use environment variable for secret key
                    { expiresIn: "24h" }
                );

                return res.status(200).json({ Status: "OK", token });        
            }else{
                console.log(err)
                return res.status(200).json({ Status: "BAD"});
            }
        })
        

        

    } catch (error) {
        console.error("Error during OTP and password verification:", error);
        return res.status(500).json({ Status: "BAD", message: "Internal Server Error" });
    }
});


const RupeeSchema = new mongoose.Schema({
    Time: String,
    username : String,
    rupee : String,
}, { timestamps: true });

const Rupeemodule = mongoose.model('Rupee', RupeeSchema);

app.post('/rupee/get/for/game', async (req, res)=>{
    const {rupee} = req.body;

    try{
        const username = "admin"
        const user = await Rupeemodule.findOne({username})
        if(user){
            await user.updateOne({rupee : rupee})
            return res.status(200).json({Status : "OK"})
        }else{
            await Rupeemodule.create({rupee, username, Time})
            return res.status(200).json({Status : "OK"})
        }
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

app.get('/get/rupee/data/play', async (req, res) =>{
    try{
        const username = "admin";
        const data = await Rupeemodule.findOne({username})
        if(data){
            return res.status(200).json({data})
        }else{
            return res.status(400).json({Status : "BAD"})
        }
        

    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

const StartValidSchema = new mongoose.Schema({
    Time: String,
    user: String,
    valid: String
}, { timestamps: true });

const StartValidmodule = mongoose.model('Start_Valid', StartValidSchema);


app.get('/choose/question/start/game/:lang', async (req, res) =>{
    const {lang, user} = req.params.body;
    try{

        const Total_Questions = await QuestionModule.find({lang : lang})
        const sum = Total_Questions.length - 9;
        const specificNumbers = [];
        for (i = sum ; i > 0; i-=10){
            specificNumbers.push(i);            
        }
        const getRandomNumber = () => {
            const randomIndex = Math.floor(Math.random() * specificNumbers.length);
            return specificNumbers[randomIndex];
        };
        const num = getRandomNumber()
        const Array = [];
        const two = num+10
        for (i = num; i < two; i++){
            Array.push(i)
        }


        // console.log(Array[0])
        // console.log(Array[1])
        // console.log(Array[2])
        // console.log(Array[3])
        // console.log(Array[4])



    }catch (error) {
        console.log(error);
        // Send an error response
        return res.status(500).json({ message: "Internal Server Error" });
    }
})
















const QuestionListSchema = new mongoose.Schema({
    Time: String,
    user: String,
    lang :String,
    list : [],
    oldlist : [],
}, { timestamps: true });

const QuestionListmodule = mongoose.model('Question_List', QuestionListSchema);



// app.post('/start/playing/by/debit/amount', async (req, res) => {
//     const { user, lang } = req.body;
//     const Time = new Date(); // Assuming you want to store the current time

//     try {
//         // Find the user's balance
//         const balance = await Balancemodule.findOne({ user });
//         // Find the fees from the admin user
//         const fees = await Rupeemodule.findOne({ username: "admin" });

//         // Delete any existing start validation for the user
//         await StartValidmodule.findOneAndDelete({ user });

//         if (balance) {
//             // Check if the user's balance is sufficient
//             if (parseInt(balance.balance) >= parseInt(fees.rupee)) {
//                 const create_data = await QuestionListmodule.findOne({ user });

//                 if (create_data) {
//                     const QnoList = create_data.oldlist;
//                     const Total_Questions = await QuestionModule.find({ lang });

//                     // Calculate the starting points for random question selection
//                     const sum = Total_Questions.length - 9;
//                     const specificNumbers = [];

//                     for (let i = sum; i > 0; i -= 10) {
//                         specificNumbers.push(i);
//                     }

//                     const Final = specificNumbers.filter(value => !QnoList.includes(value));

//                     if (Final.length <= 0) {
//                         return res.status(200).json({ Status: "BAD" });
//                     } else {
//                         const rem = parseInt(balance.balance) - parseInt(fees.rupee);

//                         // Update the user's balance
//                         await balance.updateOne({ balance: rem });

//                         // Create a new start validation and history record
//                         await StartValidmodule.create({ Time, user, valid: "yes" });
//                         await Totalusermodule.create({ Time, user });
//                         await Historymodule.create({ Time, user, rupee: fees.rupee, type: "Debited", tp: "Rupee" });

//                         const getRandomNumber = () => {
//                             const randomIndex = Math.floor(Math.random() * Final.length);
//                             return Final[randomIndex];
//                         };

//                         const num = getRandomNumber();

//                         // Update question lists
//                         await QuestionListmodule.updateOne(
//                             { _id: create_data._id },
//                             { 
//                                 $push: { oldlist: num },
//                                 $set: { list: [] }
//                             }
//                         );

//                         const two = num + 10;
//                         for (let i = num; i < two; i++) {
//                             await QuestionListmodule.updateOne(
//                                 { _id: create_data._id },
//                                 { $push: { list: i } }
//                             );
//                         }

//                         return res.status(200).json({ Status: "OK" });
//                     }
//                 } else {
//                     const rem = parseInt(balance.balance) - parseInt(fees.rupee);

//                     // Update the user's balance
//                     await balance.updateOne({ balance: rem });

//                     // Create new start validation, history record, and question list
//                     await StartValidmodule.create({ Time, user, valid: "yes" });
//                     await Totalusermodule.create({ Time, user });
//                     await Historymodule.create({ Time, user, rupee: fees.rupee, type: "Debited", tp: "Rupee" });

//                     const Question_list = await QuestionListmodule.create({ user, Time, lang, list: [], oldlist: [] });

//                     const Total_Questions = await QuestionModule.find({ lang });

//                     const sum = Total_Questions.length - 9;
//                     const specificNumbers = [];
//                     for (let i = sum; i > 0; i -= 10) {
//                         specificNumbers.push(i);
//                     }

//                     const getRandomNumber = () => {
//                         const randomIndex = Math.floor(Math.random() * specificNumbers.length);
//                         return specificNumbers[randomIndex];
//                     };

//                     const num = getRandomNumber();
//                     await QuestionListmodule.updateOne({ _id: Question_list._id }, { $push: { oldlist: num } });

//                     const two = num + 10;
//                     for (let i = num; i < two; i++) {
//                         await QuestionListmodule.updateOne(
//                             { _id: Question_list._id },
//                             { $push: { list: i } }
//                         );
//                     }

//                     return res.status(200).json({ Status: "OK" });
//                 }
//             } else {
//                 // Insufficient balance
//                 return res.status(200).json({ Status: "Low-Bal" });
//             }
//         } else {
//             // User not found
//             return res.status(200).json({ Status: "BAD" });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// });



app.post('/start/playing/by/debit/amount', async (req, res) => {
    const {user} = req.body;

    try {
        // Find the balance of the user
        const lang_data = await LanguageSelectModule.findOne({user})
        const balance = await Balancemodule.findOne({ user });
        // Find the fees from the admin user
        const fees = await Rupeemodule.findOne({ username: "admin" });
        // await StartValidmodule.findOneAndDelete({ user });

        if (balance) {
            // Check if the user's balance is sufficient to cover the fees
            if (parseInt(balance.balance) >= parseInt(fees.rupee)) {
                // Calculate the remaining balance
                

                const create_data = await QuestionListmodule.findOne({ user });
                if (create_data) {
                    const QnoList = create_data.oldlist;

                    const Total_Questions = await QuestionModule.find({ lang : lang_data.lang[0] });

                    const sum = Total_Questions.length - 9;
                    const specificNumbers = [];

                    for (let i = sum; i > 0; i -= 10) {
                        specificNumbers.push(i);
                    }

                    const Final = specificNumbers.filter(value => !QnoList.includes(value));

                    if (Final.length <= 0) {
                        return res.status(200).json({ Status: "BAD" });
                    } else {
                        const rem = parseInt(balance.balance) - parseInt(fees.rupee);

                        // Update the user's balance
                        await balance.updateOne({ balance: rem });

                        // Get the current time

                        // Create a new start record
                        await StartValidmodule.create({ Time, user, valid: "yes" });
                        await Totalusermodule.create({Time, user});

                        // Create a new history record
                        await Historymodule.create({ Time, user, rupee: fees.rupee, type: "Debited", tp: "Rupee" });


                        const getRandomNumber = () => {
                            const randomIndex = Math.floor(Math.random() * Final.length);
                            return Final[randomIndex];
                        };
                        const num = getRandomNumber();
                        await QuestionListmodule.updateOne({ _id: create_data._id }, { $push: { oldlist: num } });
                        // Clear the 'list' array
                        await QuestionListmodule.updateOne({ _id: create_data._id }, { $set: { list: [] } });

                        const two = num + 10;
                        for (let i = num; i < two; i++) {
                            await QuestionListmodule.updateOne({ _id: create_data._id }, { $push: { list: i } });
                        }

                        return res.status(200).json({ Status: "OK" });
                    }
                } else {
                    const rem = parseInt(balance.balance) - parseInt(fees.rupee);

                    // Update the user's balance
                    await balance.updateOne({ balance: rem });

                    // Get the current time
                    // Create a new start record
                    const ValDat = "yes";
                    await StartValidmodule.create({ Time, user, valid: ValDat });
                    await Totalusermodule.create({Time, user});

                    // Create a new history record
                    await Historymodule.create({ Time, user, rupee: fees.rupee, type: "Debited", tp: "Rupee" });


                    const Question_list = await QuestionListmodule.create({ user, Time, lang : lang_data.lang[0], list: [], oldlist: [] });

                    const Total_Questions = await QuestionModule.find({ lang : lang_data.lang[0] });

                    const sum = Total_Questions.length - 9;
                    const specificNumbers = [];
                    for (let i = sum; i > 0; i -= 10) {
                        specificNumbers.push(i);
                    }

                    const getRandomNumber = () => {
                        const randomIndex = Math.floor(Math.random() * specificNumbers.length);
                        return specificNumbers[randomIndex];
                    };

                    const num = getRandomNumber();
                    await QuestionListmodule.updateOne({ _id: Question_list._id }, { $push: { oldlist: num } });

                    const two = num + 10;
                    for (let i = num; i < two; i++) {
                        await QuestionListmodule.updateOne({ _id: Question_list._id }, { $push: { list: i } });
                    }

                    return res.status(200).json({ Status: "OK" });
                }
            } else {
                // Send a response indicating low balance
                return res.status(200).json({ Status: "Low-Bal" });
            }
        } else {
            // Send a response indicating that the user is not found
            return res.status(200).json({ Status: "BAD" });
        }
    } catch (error) {
        console.log(error);
        // Send an error response
        return res.status(500).json({ message: "Internal Server Error" });
    }
});





// app.post('/start/playing/by/debit/amount', async (req, res) => {
//     const { user, lang } = req.body;

//     try {
//         // Find the balance of the user
//         const balance = await Balancemodule.findOne({ user });
//         // Find the fees from the admin user
//         const fees = await Rupeemodule.findOne({ username: "admin" });
//         await StartValidmodule.findOneAndDelete({ user});

//         if (balance) {
//             // Check if the user's balance is sufficient to cover the fees
//             if (parseInt(balance.balance) >= parseInt(fees.rupee)) {
            

//                 // Calculate the remaining balance
//                 const rem = parseInt(balance.balance) - parseInt(fees.rupee);

//                 // Update the user's balance
//                 await balance.updateOne({ balance: rem });

//                 // Get the current time
//                 const Time = new Date();

//                 // Create a new start record
//                 await StartValidmodule.create({ Time, user, valid: "yes" });

//                 // Create a new history record
//                 await Historymodule.create({ Time, user, rupee: fees.rupee, type: "Debited", tp: "Rupee" });

//                 const create_data = await QuestionListmodule.findOne({user})
//                 if(create_data){

//                     const QnoList = create_data.oldlist;

                    

//                     const Total_Questions = await QuestionModule.find({lang : lang})
        
//                     const sum = Total_Questions.length - 9;
//                     const specificNumbers = [];

                    

//                     for (i = sum ; i > 0; i-=10){
//                         specificNumbers.push(i);            
//                     }

//                     const Ary = [1, 2, 3, 4]  

//                     const Final = specificNumbers.filter(value => !QnoList.includes(value) )

//                     if(Final.length < 0){

//                         return res.status(200).json({Status : "BAD"})

//                     }else{

//                         const getRandomNumber = () => {
//                             const randomIndex = Math.floor(Math.random() * Final.length);
//                             return Final[randomIndex];
//                         };
//                         const num = getRandomNumber()
//                         await QuestionListmodule.updateOne({ _id: create_data._id }, { $push: { oldlist: num } });
//                         //update a update epty [] to
//                         await QuestionListmodule.updateOne({ _id: create_data._id }, { $set: { list: [] } });
    
//                         const two = num+10
//                         for (i = num; i < two; i++){
//                             await QuestionListmodule.updateOne({ _id: create_data._id }, { $push: { list: i } });
//                         }
    
//                         return res.status(200).json({ Status: "OK" });
//                     }
                    

//                 }else{
//                     const Question_list = await QuestionListmodule.create({ user, Time, lang, list: [], oldlist: [] });

//                     const Total_Questions = await QuestionModule.find({ lang: lang });

//                     const sum = Total_Questions.length - 9;
//                     const specificNumbers = [];
//                     for (let i = sum; i > 0; i -= 10) {
//                         specificNumbers.push(i);
//                     }

//                     const getRandomNumber = () => {
//                         const randomIndex = Math.floor(Math.random() * specificNumbers.length);
//                         return specificNumbers[randomIndex];
//                     };

//                     const num = getRandomNumber();
//                     await QuestionListmodule.updateOne({ _id: Question_list._id }, { $push: { oldlist: num } });

//                     const two = num + 10;
//                     for (let i = num; i < two; i++) {
//                         await QuestionListmodule.updateOne({ _id: Question_list._id }, { $push: { list: i } });
//                     }

//                     return res.status(200).json({ Status: "OK" });


//                 }


//                 // Send a success response
//                 // return res.status(200).json({ Status: "OK"});
//             } else {
//                 // Send a response indicating low balance
//                 return res.status(200).json({ Status: "Low-Bal" });
//             }
//         } else {
//             // Send a response indicating that the user is not found
//             return res.status(200).json({ Status: "BAD" });
//         }
//     } catch (error) {
//         console.log(error);
//         // Send an error response
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// });








app.delete("/delete/by/user/id/for/valid/data/:user", async (req, res) =>{
    const user = req.params.user;

    try{
        const data = await StartValidmodule.findOne({user});
        if(data){
            await data.deleteOne();
            return res.status(200).json({Status : "OK"})
        }else{
            return res.status(200).json({Status : "BAD"})
        }
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

app.get("/admin/get/all/users/data/logined", adminMiddleware, async (req, res) => {
    try {
        // Fetch all records from StartValidmodule
        const records = await StartValidmodule.find({});

        // Map through records and fetch corresponding user data
        const users = await Promise.all(records.map(async (record) => {
            
            const user = await Usermodule.findOne({ _id: record.user });

            if (!user) {
                return { username: "Unknown User", time: record.Time };
            }

            return {
                username: user.username,
                time: record.Time
            };
        }));

        // Send the gathered data
        return res.status(200).json({ users });
    } catch (error) {
        // Log the error with context
        console.error("Error fetching user data:", error);

        // Send a generic error message to the client
        return res.status(500).json({ message: "Internal Server Error" });
    }
});



const QnoSchema = new mongoose.Schema({
    Time: String,
    user: String,
    img : String,
    Questio : String,
    qno : String,
    a : String,
    b : String,
    c : String,
    d : String,
    Ans : String,
    lang :String,
    tough : String,
    seconds : String,
    sub_lang : {
        default : "",
        type : String
    },

    yes : {
        default : "",
        type : []
    },
    no : {
        default : "",
        type : []
    },
    ID : {
        default : "",
        type : String
    }

}, { timestamps: true });

const QuestionModule = mongoose.model('Qno_Count', QnoSchema);

app.post("/get/posted/count/questions", async (req, res) =>{
    const {user, img, Questio, a, b, c, d, Ans, lang, tough, seconds} = req.body;

    try{
        const Qno_length = await QuestionModule.find({lang})
        const hash = Ans.trim().toLowerCase();
        await QuestionModule.create({Time, user, img, Questio, qno : Qno_length.length+1, a, b, c, d, Ans : hash, lang, tough, seconds})
        return res.status(200).json({Status : "OK", qno : Qno_length.length+1})
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


app.get("/get/question/no/by/user/name/:user", async (req, res) => {
    const user = req.params.user;
    try {
        // Fetch the user's validity status from StartValidmodule
        const Data = await StartValidmodule.findOne({ user });
        // Fetch the user's question list from QuestionListmodule
        const Get_Qno_info = await QuestionListmodule.findOne({ user });

        // Check if the user is valid and has a question list
        if (Data && Data.valid === "yes") {
            if (Get_Qno_info && Get_Qno_info.list.length > 0) {
                // Get the first question number from the list
                const QNO = Get_Qno_info.list[0];
                
                // Find the question in QuestionModule by its number and language
                const Qno = await QuestionModule.findOne({ qno: QNO, lang: Get_Qno_info.lang });
                
                if (Qno) {
                    // Construct the response data
                    const data = {
                        _id: Qno._id,
                        img: Qno.img,
                        Question: Qno.Questio,
                        Qno: Get_Qno_info.list.length-1, // Calculates the position of the question
                        a: Qno.a,
                        b: Qno.b,
                        c: Qno.c,
                        d: Qno.d,
                        seconds : Qno.seconds
                    };

                    return res.status(200).json({ Status : "OK" , data });
                } else {
                    return res.status(404).json({ Status : "BAD" });
                }
            } else {
                return res.status(202).json({ Status : "BAD" });
            }
        } else {
            return res.status(202).json({ Status : "BAD" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

const WonSchema = new mongoose.Schema({
    Time: String,
    user : String,
    no : String,
    ID : String
}, { timestamps: true });

const Wonmodule = mongoose.model('Won', WonSchema);



app.post('/verify/answer/question/number', async (req, res) =>{
    const {answer , user, id} = req.body;
    try{
        const Answer_Verify = await QuestionModule.findById({_id : id})
        const User_List = await QuestionListmodule.findOne({user})
        if(Answer_Verify.Ans === answer){


            if(User_List.list.length === 1 || User_List.list.length === 0){
                await User_List.updateOne({$pull : {list : User_List.list[0] }})
                const won = await Wonmodule.find({})
                const CuponDat = await Cuponmodule.findOne({no : won.length+1})
                if(CuponDat){
                    await Wonmodule.create({Time, user, no : won.length +1, ID : CuponDat._id })

                    await Mycoinsmodule.create({Time : Date.now(), 
                        title : CuponDat.title, 
                        img : CuponDat.img,
                        user : user,
                        type : CuponDat.type,
                        stars : "No",
                        body : CuponDat.body,
                        valid : CuponDat.valid
                    })
                    //ki1931ck add code here
                    const rank = toString(won.length+1)
                    if(!Answer_Verify.yes.includes(user)){
                        await Answer_Verify.updateOne({$push : {yes : user}})    
                        return res.status(200).json({Status : "OKK", id : CuponDat._id, rank : rank});
                    }else{
                        return res.status(200).json({Status : "OKK", id : CuponDat._id, rank : rank});
                    }


                }else{

                    await Wonmodule.create({Time, user, no : won.length +1, ID : "stars" })
                    const get_prize_list1 = await StarBalmodule.findOne({user})
                    
                    const starsValues = [];
                    const pushData =  await StarsCountmodule.find({})
                    pushData.map((users)=>{
                        starsValues.push(users.stars)
                    })
                    // const sum = parseInt(get_prize_list1.balance) + parseInt(get_count_data.stars)

                    if(get_prize_list1){
                        for (const stars of starsValues) {
                            const get_count_data = await StarsCountmodule.findOne({ stars });
                            
                            if (parseInt(get_count_data.count) >= parseInt(won.length+1)) {
                                await get_prize_list1.updateOne({balance : parseInt(get_prize_list1.balance) + parseInt(get_count_data.stars)})
                                await Historymodule.create({Time, user, rupee : get_count_data.stars, type : "Credited", tp : "Stars"});
                                const rank = toString(won.length+1)
                                if(!Answer_Verify.yes.includes(user)){
                                    await Answer_Verify.updateOne({$push : {yes : user}})    
                                    return res.status(200).json({Status : "STARS", stars : get_count_data.stars, rank : rank});
                                }else{
                                    return res.status(200).json({Status : "STARS", stars : get_count_data.stars, rank : rank});
                                }
                                
                            }
                        }
                        
                    }else{
                        for (const stars of starsValues) {
                            const get_count_data = await StarsCountmodule.findOne({ stars });
                            
                            if (parseInt(get_count_data.count) >= parseInt(won.length+1)) {
                                await StarBalmodule.create({Time, user : user, balance : get_count_data.stars});
                                await Historymodule.create({Time, user, rupee : get_count_data.stars, type : "Credited", tp : "Stars"});
                                const rank = toString(won.length+1)
                                if(!Answer_Verify.yes.includes(user)){
                                    await Answer_Verify.updateOne({$push : {yes : user}})    
                                    return res.status(200).json({Status : "STARS", stars : get_count_data.stars, rank : rank});
                                }else{
                                    return res.status(200).json({Status : "STARS", stars : get_count_data.stars, rank : rank });
                                }
                                
                            }
                        }

                        // await StarBalmodule.create({Time, user : user, balance : get_count_data.stars});
                        // await Historymodule.create({Time, user, rupee : get_count_data.stars, type : "Credited", tp : "Stars"});
                        // return res.status(200).json({Status : "STARS", stars : get_count_data.stars});
                    }
                    
                }
                


            }
            
            
            else{
                await User_List.updateOne({$pull : {list : User_List.list[0] }})
                //ki1931ck add code here
                if(!Answer_Verify.yes.includes(user)){
                    await Answer_Verify.updateOne({$push : {yes : user}})    
                    return res.status(200).json({Status : "OK"})     
                }else{
                    return res.status(200).json({Status : "OK"})
                }
                
            }


            
        }else{
            return res.status(200).json({Status : "BAD"})
        }
    } 
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})



const CuponSchema = new mongoose.Schema({
    Time: String,
    title : String,
    img : String,
    valid : String,
    body : String,
    type : String,
    user : String,
    no : String
}, { timestamps: true });

const Cuponmodule = mongoose.model('Cupon_s', CuponSchema);

app.post("/get/new/cupon/for/neww/cupon", async (req, res) =>{
    const {title, img, valid, body, type, user} = req.body;
    try{
        const data = await Cuponmodule.find({})
        if(data){
            await Cuponmodule.create({Time, title, img, valid, body, type, user, no : data.length+1})
            return res.status(200).json({Status : "OK"})
        }else{
            return res.status(200).json({Status : "BAD"});
        }
        
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


app.get("/get/cupon/get/all/datas", async (req, res) =>{
    try{
        const data = await Cuponmodule.find({})
        if(data){
            return res.status(200).json({data});
        }else{
            return res.status(200).json({Status : "BAD"});    
        }
        
    }catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

app.delete("/delete/cupon/s/by/id/:id", async (req, res) =>{
    const id = req.params.id

    try{
        const user = await Cuponmodule.findById({_id : id})
        if(user){
            await user.deleteOne()
            return res.status(200).json({Status : "OK"})
        }else{   
            return res.status(200).json({Status : "BAD"})
        }
    }catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

app.get("/get/coin/cupons/sds/by/id/:id", async (req, res) =>{
    const id = req.params.id;
    try{
        const won = await Cuponmodule.findById({_id : id})
        if(won){
            return res.status(200).json({data : won})
        }else{
            return res.status(200).json({Status : "BAD"})
        }
        
    }catch(error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

const TotalUserSchema = new mongoose.Schema({
    Time: String,
    user : String,
}, { timestamps: true });

const Totalusermodule = mongoose.model('Total_Users', TotalUserSchema);

app.get("/get/aal/tottttal/users", adminMiddleware ,async(req, res) =>{
    try{
        const users = await Totalusermodule.find({});
        if(users){
            return res.status(200).json({ users });
        }else{
            return res.status(200).json({Status : "BAD"})
        }
        

    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
} )

app.get("/get/total/users/by/winners/datas/all", adminMiddleware, async (req, res) => {
    try {
        // Fetch all users who are marked as winners
        const users = await Wonmodule.find({});
        if(users){
            return res.status(200).json({ users });
        }else{
            return res.status(200).json({Status : "BAD"})
        }

        // Return the list of users
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});



app.get("/get/total/users/by/winners/datas/all/one", async (req, res) => {
    try {
        // Fetch all users who are marked as winners
        const users = await Wonmodule.find({});
        
        if(users){
            return res.status(200).json({ users });
        }else{
            return res.status(200).json({Status : "BAD"})
        }

        // Return the list of users
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get("/get/singel/user/won/data/:no", async (req, res)=>{
    const no = req.params.no;
    try{
        const user_data = await Wonmodule.findOne({no : no})
        if(user_data){
            const iinfo_data = await Usermodule.findOne({_id : user_data.user})
            const data = {
                username : iinfo_data.username
            }
            return res.status(200).json({ data})
        }else{
            return res.status(200).json({Status : "NO"})
        }
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


app.get("/users/name/and/more/get/:id", authMiddleware, async (req, res)=>{
    const id = req.params.id;

    try{

        const user = await Usermodule.findById({_id : id})
        if(user){

            const data = {
                username : user.username,
                name : user.name,
                email : user.email
            }

            return res.status(200).json({data})

        }
        else{
            return res.status(200).json({Status : "BAD"})
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


app.get('/exact/time/by/new', async (req, res) =>{
    try{
        const now = new Date();

        // Extract year, month, and day
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
        const day = now.getDate().toString().padStart(2, '0');

        // Format the date as "YYYY-MM-DD"
        const formattedDate = `${year}-${month}-${day}`;

        return res.status(200).json({formattedDate})
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})




const Chart_LineSchema = new mongoose.Schema({
    Time: String,
    len : String,
}, { timestamps: true });

const ChartLinemodule = mongoose.model('Line_chart-1', Chart_LineSchema);

app.post("/length/and/calcul/ation/of/chart", adminMiddleware, async (req, res) => {
    try {
        // Define the current date
        const now = new Date();

        // Extract year, month, and day
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
        const day = now.getDate().toString().padStart(2, '0');

        // Format the date as "YYYY-MM-DD"
        const formattedDate = `${year}-${month}-${day}`;

        // Find the total number of users
        const len_find = await Totalusermodule.find({}).exec();
        
        // Find data for the specific date
        const Find_data = await ChartLinemodule.findOne({ Time: formattedDate }).exec();
        
        if (!Find_data) {
            // Create a new chart line entry if no data is found for the date
            await ChartLinemodule.create({ len: len_find.length, Time: formattedDate });
            return res.status(200).json({ Status: "OK" });
        } else {
            return res.status(200).json({ Status: "IN" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get("/get/data/for/linechart/01",async (req, res) =>{
    try{
        const data = await ChartLinemodule.find({});
        if(data){
            return res.status(200).json({data})
        }else{
            return res.status(200).json({Status : "BAD"})
        }
    
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

app.get('/get/admin/all/question/lists/:lang', adminMiddleware,async (req, res)=>{
    const lang = req.params.lang;
    try{
        const data = await QuestionModule.find({lang});
        if(data){
            return res.status(200).json({data})
        }else{
            return res.status(200).json({Status : "BAD"})
        }
        
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


const Stars_CountsSchema = new mongoose.Schema({
    Time: String,
    stars: String,
    count: String,
}, { timestamps: true });

const StarsCountmodule = mongoose.model('Stars_Counts', Stars_CountsSchema);


app.post("/stars/count/one/stars", async (req, res) => {
    const { stars, count } = req.body;
    const Time = new Date(); // Assuming you want to store the current time
    try {
        const get_data = await StarsCountmodule.findOne({ stars: stars });
        if (get_data) {
            // Update the count for the found document
            await StarsCountmodule.updateOne(
                { stars: stars }, 
                { $set: { count: count, Time: Time } }
            );
            return res.status(200).json({ Status: "OK" });
        } else {
            // Create a new document if none is found
            await StarsCountmodule.create({ stars, count, Time });
            return res.status(200).json({ Status: "OK" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});



app.get("/stars/get/all/data/by/stars", async (req, res) =>{
    try{
        const data = await StarsCountmodule.find({})
        if(data){
            return res.status(200).json({data})
        }else{
            return res.status(200).json({Status : "BAD"})
        }
        
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

app.get("/trial/get/data/:data", async (req, res) => {
    const data = parseInt(req.params.data);

    try {
        const starsValues = ["6", "5", "4", "3", "2", "1"];
        
        for (const stars of starsValues) {
            const get_count_data = await StarsCountmodule.findOne({ stars });
            
            if (parseInt(get_count_data.count) >= data) {
                return res.status(200).json({ Data: get_count_data.stars });
            }
        }

        return res.status(404).json({ message: "No matching data found" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


// app.get("/trial/get/data/:data", async (req, res)=>{
//     const data = req.params.data
//     try {

//         // Find the first document where count is greater than or equal to the specified value
//         const get_count_data6 = await StarsCountmodule.findOne({stars : "6"});
//         const get_count_data5 = await StarsCountmodule.findOne({stars : "5"});
//         const get_count_data4 = await StarsCountmodule.findOne({stars : "4"});
//         const get_count_data3 = await StarsCountmodule.findOne({stars : "3"});
//         const get_count_data2 = await StarsCountmodule.findOne({stars : "2"});
//         const get_count_data1 = await StarsCountmodule.findOne({stars : "1"});

//         if(parseInt(get_count_data6.count) >= parseInt(data)){
//             return res.status(200).json({Data : get_count_data6.stars})
//         }else if(parseInt(get_count_data5.count) >= parseInt(data)){
//             return res.status(200).json({Data : get_count_data5.stars})
//         }else if(parseInt(get_count_data4.count) >= parseInt(data)){
//             return res.status(200).json({Data : get_count_data4.stars})
//         }
//         else if(parseInt(get_count_data3.count) >= parseInt(data)){
//             return res.status(200).json({Data : get_count_data3.stars})
//         }else if(parseInt(get_count_data2.count) >= parseInt(data)){
//             return res.status(200).json({Data : get_count_data2.stars})
//         }else if(parseInt(get_count_data1.count) >= parseInt(data)){
//             return res.status(200).json({Data : get_count_data1.stars})
//         }else{
//             console.log("none")
//         }

//         // Return the result as a JSON response
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// })

// app.get("/get/all/users/usernames/by/id/to/update/balance", async (req, res) => {
//     try {
//         const users = await Usermodule.find({});
//         const usersList = users.map((data) => {
//             return {
//                 id: data._id,
//                 username: data.username,
//             };
//         });
//         return res.status(200).json({ users: usersList });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// });


const Trans_UTR_Schema = new mongoose.Schema({
    Time: String,
    UTR: String,
}, { timestamps: true });

const UTRmodule = mongoose.model('UTR', Trans_UTR_Schema);

app.post("/post/utr/ids/by/admin", async (req, res) =>{
    const {utr} = req.body;

    try{
        const user = await UTRmodule.findOne({UTR : utr})
        if(user){
            return res.status(200).json({Status : "BAD"})
        }else{
            await UTRmodule.create({Time, UTR : utr})
            return res.status(200).json({Status : "OK"})
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


app.get('/question/one/by/:no/:lang', async (req, res) => {
    try {
        // Use findOne to search for a question by both 'lang' and 'qno'
        const question = await QuestionModule.findOne({ lang : req.params.lang, qno : req.params.no });
        
        if (question) {
            return res.status(200).json({ question });
        }
        
        return res.status(404).json({ message: "Question not found" });  // 404 for not found
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});



const Lang_SelSchema = new mongoose.Schema({
    Time: String,
    lang : [],
    user : String
}, { timestamps: true });

const LanguageSelectModule = mongoose.model('Language_select', Lang_SelSchema);


app.post('/get/language/datas/all', async (req, res) => {
    const {lang, user} = req.body;

    try{
        const Users = await LanguageSelectModule.findOne({user})
        if(!Users){
            await LanguageSelectModule.create({lang, user, Time})
            return res.status(200).json({ Status: "OK" });
        }else{
            return res.status(200).json({ Status: "IN" });
        }   
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error"});
    }
});



app.get("/get/language/datas/all/get/:user", async (req, res) =>{
    const user = req.params.user;
    try{
        const Users = await LanguageSelectModule.findOne({user})
        if(Users){
            return res.status(200).json({Users})
        }else{
            return res.status(201).json({Status : "IN"})
        }
    }

    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error"});
    }

})



app.delete('/get/language/datas/all/get/and/delete/:user', async (req, res) =>{
    const user = req.params.user;
    try{
        const Users = await LanguageSelectModule.findOne({user})
        if(Users){
            await Users.deleteOne();
            return res.status(200).json({Status : "OK"})
        }else{
            return res.status(200).json({Status : "BAD"})
        }
    }catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error"});
    }
})

// app.get('/get/languages/data/with/questions/:user', async (req, res) =>{
//     const user = req.params.user
//     try{
//         const users = await LanguageSelectModule.findOne({user : user})
//         const data = users.lang 
//         const selQue = await QuestionListmodule.find({})
//         return res.status(200).json({data})



//     }catch (error) {
//         console.error("Error:", error);
//         return res.status(500).json({ message: "Internal Server Error"});
//     }
// })


app.delete('/delete/unwanted/questions/:id', async (req, res) =>{
    const id = req.params.idtry

    try{
        await QuestionModule.findOneAndDelete({id})
        return res.status(200).json({Status : "OK"})
    }catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

app.get('/get/languages/data/with/questions/:user', async (req, res) => {
    const user = req.params.user;
    try {

        const users = await LanguageSelectModule.findOne({ user: user });        

        if(!users) {
            return res.status(404).json({ message: "User not found" });
        }

        const data = users.lang; // The list of languages the user has selected
       
        // Find questions related to the user's selected languages
        const selQue = await QuestionModule.find({
            lang: { $in: data }  
        });

        if (!selQue.length) {
            return res.status(404).json({ message: "No questions found for the selected languages" });
        }




        // Example: Filter questions with the difficulty 'Easy'
        const t1 = "Too Easy";
        const t2 = "Easy";
        const t3 = "Medium";
        const t4 = "Tough";
        const t5 = "Too Tough";

        const FDt = selQue.filter(q => [t5, t4, t3, t2, t1].includes(q.tough));
        // Filters all questions where difficulty is 'Easy'

        return res.status(200).json({ FDt });
        
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});





const AllLanguagesSchema = new mongoose.Schema({
    Time: { type: Date, default: Date.now },  // Use Date for Time field
    lang: [{ type: String }]  // Define lang as an array of strings
}, { timestamps: true });

const AllLanguagemodule = mongoose.model('All_Languages', AllLanguagesSchema);

app.post("/add/all/admin/new/languages/data", async (req, res) => {
    const lang = req.body.lang;  // Assuming req.body contains 'lang'

    try {
        const DataFind = await AllLanguagemodule.findOne({});

        if (!DataFind) {
            // If no document exists, create a new document with the provided language
            const newLanguageDoc = new AllLanguagemodule({ lang: [lang] });
            await newLanguageDoc.save();
            return res.status(200).json({ Status: "OK", message: "New language added successfully" });
        } else {
            // Check if the language already exists in the lang array
            if (DataFind.lang.includes(lang)) {
                return res.status(200).json({ Status: "IN", message: "Language already exists" });
            } else {
                // Add the new language to the lang array
                await DataFind.updateOne({ $push: { lang: lang } });
                return res.status(200).json({ Status: "OK", message: "Language added successfully" });
            }
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get("/get/all/admin/new/languages/data",adminMiddleware ,async (req, res) =>{
    try{
        const DataFind = await AllLanguagemodule.findOne({});
        if(DataFind){
            const Data = DataFind.lang
            return res.status(200).json({ Data});
        }else{
            return res.status(200).json({ Status: "BAD"});
        }
    }catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

app.get("/get/all/admin/new/languages/data/user",authMiddleware ,async (req, res) =>{
    try{
        const DataFind = await AllLanguagemodule.findOne({});
        if(DataFind){
            const Data = DataFind.lang
            return res.status(200).json({Data});
        }else{
            return res.status(201).json({ Status: "BAD"});
        }
    }catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})




app.delete("/delete/all/selected/data/with/onley/one/:lang", async (req, res) =>{
    const lang = req.params.lang;
    try{
        const data = await AllLanguagemodule.findOne({lang : lang})
        if(data){
            await data.updateOne({$pull : {lang : lang}})
            return res.status(200).json({Status : "OK"})
        }else{
            return res.status(200).json({Status : "BAD"})
        }
    }catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


const razorpay = new Razorpay({
    key_id: "rzp_live_V4tRMNPowzPDU5", // Replace with your Key ID
    key_secret: "dp793tI70CWW7hRlzNklvbKt", // Replace with your Key Secret
});


// Route to create an order
app.post("/create-order", async (req, res) => {
    try {
      const { amount, currency } = req.body;

      const fees = await Rupeemodule.findOne({ username: "admin" });
  
      const options = {
        amount: fees.rupee * 100, // Amount in smallest currency unit (e.g., paise for INR)
        currency: currency || "INR",
      };
  
      const order = await razorpay.orders.create(options);
      res.status(200).json({ success: true, order });
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

// Route to verify payment
app.post("/verify-payment", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, user } = req.body;

    try{
        const crypto = require("crypto");
        const hmac = crypto.createHmac("sha256", "dp793tI70CWW7hRlzNklvbKt");

        const fees = await Rupeemodule.findOne({ username: "admin" });
    
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        const generatedSignature = hmac.digest("hex");
    
        if (generatedSignature === razorpay_signature) {
            const data = await Balancemodule.findOne({user : user})
            if(data){
                sum = parseInt(fees.rupee) + parseInt(data.balance)
                data.balance = sum
                await data.save()
                await Historymodule.create({Time, user, rupee : fees.rupee, type : "Credited", tp : "Rupee"});
                res.status(200).json({ success: true, message: "Payment verified successfully" });
            }else{
                return res.status(202).json({ Status: "NO" });
            }
        } else {
        res.status(400).json({ success: false, message: "Payment verification failed" });
        }
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
  
    
});



const user_login_admin_Schema = new mongoose.Schema({
    Time: String,
    username : String,
    password : String,
    language : String,
    email : String
}, { timestamps: true });

const Employeloginmodule = mongoose.model('Employes_data', user_login_admin_Schema);

const users_otpSchema = new mongoose.Schema({
    Time: String,
    username : String,
    otp : String
}, { timestamps: true });

const Employeotpmodule = mongoose.model('Employes_otp', users_otpSchema);


app.post("/get/employe/login/data/create/new", async (req, res) =>{
    const {username, password, email ,language} = req.body;
    try{
        const findDocu = await Employeloginmodule.findOne({username})
        if(!findDocu){
            const hash = await bcrypt.hash(password, 10);
            await Employeloginmodule.create({Time, username, email, password : hash, language})
            return res.status(200).json({Status : "OK"})
        }else{
            return res.status(200).json({Status : "IN"})
        }
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

app.get('/get/all/total/users/data/from/admins/super', adminMiddleware, async (req, res) =>{
    try{
        const user = await Employeloginmodule.find({})
        const data = user.map(dat =>({
            user : dat.username,
            email : dat.email,
            lang : dat.language
        }))
        return res.json({data})
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

app.post('/get/and/login/users/admin/pages/auth', async (req, res) =>{
    const {username, password} = req.body;
    try{
        const OTP = generateOTP()
        const find_One = await Employeloginmodule.findOne({username})
        if(find_One){
            const isMatch = await bcrypt.compare(password, find_One.password);
            const inorno = await Employeotpmodule.findOne({username});
            if(isMatch){
                if(inorno){
                    await inorno.deleteOne()
                }
                const data = await Employeotpmodule.create({Time, username, otp : OTP})


                let mailOptions = {
                    from: 'stawropuzzle@gmail.com', // Sender address
                    to: `${find_One.email}`, // List of recipients
                    subject: `staWro, Admin Login OTP`, // Subject line
                    text: '', // Plain text body
                    html: `
                    
                    <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <meta http-equiv="refresh" content="30" />
                            <title>Document</title>
                            <style>
            
                                @import url('https://fonts.googleapis.com/css2?family=Inknut+Antiqua:wght@400;700&display=swap');
            
            
                                .email-main-cnt-01{
                                    width: 95%;
                                    justify-content: center;
                                    margin: auto;
                                }
            
                                .email-cnt-01{
                                    width: 90%;
                                    height: auto;
                                    display: flex;
                                    margin: 10px;
                                }
            
                                .email-cnt-01 div{
                                    width: 50px;
                                    height: 50px;
                                    overflow: hidden;
                                    border-radius: 50%;
                                    border: 1px solid;
                                    
                                }
            
                                .email-cnt-01 div img{
                                    width: 100%;
                                    height: 100%;
                                    object-fit: cover;
                                }
            
                                .email-cnt-01 strong{
                                    font-family: Inknut Antiqua;
                                    margin-left: 10px;
                                }
            
                                .email-cnt-btn-01{
                                    width: 120px;
                                    height: 30px;
                                    margin: 10px;
                                    color: aliceblue;
                                    background-color: rgb(5, 148, 195);
                                    border: 1px solid;
                                    border-radius: 5px;
                                    cursor: pointer;
                                }
            
            
                            </style>
                        </head>
                        <body>
                            <div class="email-main-cnt-01">
                                <div class="email-cnt-01">
                                    <strong>staWro</strong>
                                </div>
                                <div class="email-cnt-02">
                                    <span>Hello, Dear <strong>${data.username}</strong> </span><br/>
                                    <p>Welcome to staWro.<br/>
                                    Login using OTP Authentication, Dont share With anyone, ${data.otp}</p><br/>
                                        
                                    <strong>${data.otp}</strong><br/>
                         
                                    <strong>Thank you</strong>
            
                                </div>
                            </div>
                            
                        </body>
                        </html>
            
                    ` // HTML body
                  };
                  
                  // Send email
                  transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                        return res.status(202).json({message : "Something went Wrong"})
                    }

                    return res.status(200).json({Status : "OK", data : data._id})
                  });
                
            }else{
                return res.status(200).json({Status : "BAD"})
            }
        }else{
            return res.status(200).json({Status : "NO"})
        }
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


app.post("/verify/users/language/modele/and/otp", async (req, res) =>{
    const {otp, id} = req.body;
    try{
        const find_one = await Employeotpmodule.findById({_id : id})
        const get_one = await Employeloginmodule.findOne({username : find_one.username})
        if(parseInt(find_one.otp) === parseInt(otp)){
            await find_one.deleteOne()
            const token = jwt.sign({ id : get_one._id }, "kanna_staWro_founrs_withhh_1931_liketha", { expiresIn: "2h" });
            return res.status(200).json({Status : "OK", Token : token, ssid : get_one._id})
        }else{
            return res.status(200).json({Status : "BAD"})
        }
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

app.get('/get/user/admin/languages/to/post/:id', users_admin_Middle, async (req, res) => {
    const id = req.params.id;

    try {
        const get_user = await Employeloginmodule.findOne({_id : id });

        if (get_user) {
            const data = {
                lang : get_user.language,
                user : get_user.username
            }
            return res.status(200).json({ data 

            });
        } else {
            return res.status(404).json({ success: false, message: "User not found" });
        }
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});



const Questions_usersSchema = new mongoose.Schema({
    Time: String,
    user: String,
    img : String,
    Questio : String,
    qno : String,
    a : String,
    b : String,
    c : String,
    d : String,
    Ans : String,
    lang :String,
    tough : String,
    seconds : String,
}, { timestamps: true });

const Users_Questionsmodule = mongoose.model('Questions_users', Questions_usersSchema);

app.post('/get/a/users/admin/posted/questions/from/all/users', users_admin_Middle, async(req, res) => {
    const { user, img, Questio, a, b, c, d, Ans, tough, seconds } = req.body;

    try {
        // Validate that the required fields are provided
        if (!user || !Questio || !a || !b || !c || !d || !Ans || !tough || !seconds) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const User_Admin_lang_get = await Employeloginmodule.findOne({_id : user})
        const lang = User_Admin_lang_get.language

        const find_usrs = await Users_Questionsmodule.find({ user : User_Admin_lang_get.username });

        const questionExists = find_usrs.some((item) => item.Questio === Questio);

        if (!questionExists) {
            // Add the question to the database
            const newQuestion = await Users_Questionsmodule.create({
                user : User_Admin_lang_get.username,
                img,
                Questio,
                qno: find_usrs.length + 1, // Increment question number based on existing questions
                a,
                b,
                c,
                d,
                Ans,
                lang,
                tough,
                seconds,
                Time: new Date() // Automatically set the current time
            });

            return res.status(201).json({
                Status : "OK", qno : newQuestion.qno
            });
        } else {
            // Return a response indicating the question already exists
            return res.status(200).json({ Status : "IN" });
        }
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get('/get/admin/sub/users/posted/datas/011/:id', users_admin_Middle, async(req, res) =>{
    const id = req.params.id;
    try{
        const get_user = await Employeloginmodule.findOne({_id: id})
        const data = await Users_Questionsmodule.find({user : get_user.username})
        if(data){
            return res.status(200).json({data})
        }else{
            return res.status(200).json({Status : "BAD"})
        }
        
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})      


app.delete('/delete/users/admin/qno/from/admin/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedData = await Users_Questionsmodule.findByIdAndDelete(id);

        if (!deletedData) {
            return res.status(404).json({ success: false, message: "Data not found" });
        }

        return res.status(200).json({ Status : "OK"});
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get('/admin/get/tottal/users/created/questions', adminMiddleware, async(req, res) =>{
    try{
        const data = await Users_Questionsmodule.find({})
        if(data){
            return res.status(200).json({data})
        }else{
            return res.status(200).json({Status : 'BAD'})
        }
        
    }catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


const Quest_Summery_Schema = new mongoose.Schema({
    Time: String,
    user: String,
    Qno_sel : [],
}, { timestamps: true });

const Quest_summerymodule = mongoose.model('Quest_summery', Quest_Summery_Schema);



app.post('/get/data/and/post/users/selected/data/to/db', async (req, res) => {
    const { user, img, Questio, a, b, c, d, Ans, lang, sel_lang, tough, seconds } = req.body;

    try {
        // Find all questions with the selected language to determine the next question number
        const find_Qst_len = await QuestionModule.find({ lang: sel_lang });
        const get_lng_dat = await QuestionModule.find({Questio : Questio })

        // Create a new question entry with the next question number
        if(get_lng_dat.length <= 0 ){
            const post_sel = await QuestionModule.create({
                sub_lang: lang,
                Time: new Date(), // Add the current timestamp for "Time"
                user,
                img,
                Questio,
                qno: find_Qst_len.length + 1, // Assign the next question number
                a,
                b,
                c,
                d,
                Ans,
                lang: sel_lang,
                tough,
                seconds
            });
    
            // Check if the user already has a question summary
            const Qust_find = await Quest_summerymodule.findOne({ user });
    
            if (!Qust_find) {
                // If no summary exists, create a new one
                await Quest_summerymodule.create({
                    Time: new Date(), // Add the current timestamp
                    user,
                    Qno_sel: [post_sel._id] // Wrap ID in an array
                });
                return res.status(200).json({ Status: "OK" });
            } else {
                // If a summary exists, update it by pushing the new question ID
                await Qust_find.updateOne({
                    $push: { Qno_sel: post_sel._id }
                });
                return res.status(200).json({ Status: "OK" });
            }
        }else{
            return res.status(200).json({Status : "IN"})
        }
        
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


app.get('/get/wallet/amount/credits/links/by/:id',users_admin_Middle, async (req, res) => {
    const id = req.params.id;

    try {
        // Find the employee by ID
        const get_name = await Employeloginmodule.findOne({ _id: id });
        if (!get_name) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Find the question summary for the user
        const find_one = await Quest_summerymodule.findOne({ user: get_name.username });
        if (!find_one || !find_one.Qno_sel) {
            return res.status(404).json({ message: "No question summary found for this user" });
        }

        // Fetch all questions based on IDs in Qno_sel

        let intd = 0; // Use `let` instead of `const` for mutable variables

        const List = await Promise.all(
            find_one.Qno_sel.map(async (questionId) => {
                const dat = await QuestionModule.findById(questionId);
                return dat?.no?.length -1 || 0; // Safely handle undefined 'yes'
            })
        );

        let inte = 0;

        const List1 = await Promise.all(
            find_one.Qno_sel.map(async (questionId) => {
                const dat = await QuestionModule.findById(questionId);
                return dat?.yes?.length -1 || 0; // Safely handle undefined 'yes'
            })
        );

        // Accumulate the total 'yes' lengths
        intd = List.reduce((sum, length) => sum + length, 0);
        inte = List1.reduce((sum, length) => sum + length, 0);

        // Respond with the summary and questions
        const Rupee = (find_one.Qno_sel.length + intd)
        const Datas = {
            Out : intd,
            Ans : inte,
            Rupee : Rupee,
            Total_Quest : find_one.Qno_sel.length
        }
        return res.status(200).json({ Datas });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


async function Notification(token, title, body) {
    if (!token || !title || !body) {
        return res.status(400).json({ error: "❌ Missing required fields: token, title, body" });
    }
    
    const message = {
    token: token,
    notification: {
        title: title,
        body: body,
    },
    data: {
        type: "chat",
    },
    android: {
        priority: "high",
        notification: {
        sound: "default",
        channelId: "high_importance_channel",
        priority: "max", // Ensures heads-up notification
        visibility: "public", // Ensures it appears over lock screen
        },
    },
    apns: {
        payload: {
        aps: {
            alert: {
            title: title,
            body: body,
            },
            sound: "default",
            contentAvailable: true,
        },
        },
    },
    };

    try {
    const response = await admin.messaging().send(message);
    console.log("✅ Notification sent:", response);
    res.status(200).json({ success: true, message: "Notification sent!", response });
    } catch (error) {
    console.error("❌ Error sending notification:", error);
    res.status(500).json({ error: "Failed to send notification", details: error.message });
    }
}


// Send Notification Endpoint
app.post("/send-notification", async (req, res) => {
    const { token, title, body } = req.body;
  
    if (!token || !title || !body) {
      return res.status(400).json({ error: "❌ Missing required fields: token, title, body" });
    }

    const message = {
      token: token,
      notification: {
        title: title,
        body: body,
      },
      data: {
        type: "chat",
      },
      android: {
        priority: "high",
        notification: {
          sound: "default",
          channelId: "high_importance_channel",
          priority: "max", // Ensures heads-up notification
          visibility: "public", // Ensures it appears over lock screen
        },
      },
      apns: {
        payload: {
          aps: {
            alert: {
              title: title,
              body: body,
            },
            sound: "default",
            contentAvailable: true,
          },
        },
      },
    };
  
    try {
      const response = await admin.messaging().send(message);
      console.log("✅ Notification sent:", response);
      res.status(200).json({ success: true, message: "Notification sent!", response });
    } catch (error) {
      console.error("❌ Error sending notification:", error);
      res.status(500).json({ error: "Failed to send notification", details: error.message });
    }
  });

  const NotificationSchema = new mongoose.Schema(
    {
      tokens: [String], // Array to store FCM tokens
    },
    { timestamps: true }
  );
  
  const NotificationModule = mongoose.model("Notification", NotificationSchema);
  
  app.post("/get/new/notification/fcm/token/from/app", async (req, res) => {
    const { fcm } = req.body;
  
    if (!fcm) {
      return res.status(400).json({ error: "FCM token is required" });
    }
  
    try {
      let notificationData = await NotificationModule.findOne();
  
      if (!notificationData) {
        notificationData = new NotificationModule({ tokens: [] });
      }
  
      if (notificationData.tokens.includes(fcm)) {
        console.log(`This ${fcm} FCM Token Existed`)
        return res.status(201).json({ status: "ok", message: "FCM token already exists" });
      }
  
      notificationData.tokens.push(fcm);
      await notificationData.save();
      console.log(`New FCM Token Posted ${fcm}`)
      res.status(200).json({ status: "ok", message: "FCM token stored successfully" });
    } catch (error) {
      console.error("❌ Error handling FCM token:", error);
      res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  });





// ✅ Send notification to all users
app.post("/send-notification/to/all", async (req, res) => {
    const { title, body } = req.body;
   
    console.log(title, body)

    if (!title || !body) {
      return res.status(400).json({ error: "❌ Missing required fields: title, body" });
    }
  
    try {
      const notificationData = await NotificationModule.findOne();
  
      if (!notificationData || !notificationData.tokens || notificationData.tokens.length === 0) {
        return res.status(400).json({ error: "❌ No FCM tokens found" });
      }
  
      const messages = notificationData.tokens.map((token) => ({
        token,
        notification: { title, body },
        data: { type: "chat" },
        android: {
          priority: "high",
          notification: {
            sound: "default",
            channelId: "high_importance_channel",
            priority: "max",
            visibility: "public",
          },
        },
        apns: {
          payload: {
            aps: {
              alert: { title, body },
              sound: "default",
              contentAvailable: true,
            },
          },
        },
      }));
  
      const responses = await Promise.all(messages.map((msg) => admin.messaging().send(msg)));
  
      console.log("✅ Notifications sent:", responses.length);
      res.status(200).json({ success: true, message: "Notifications sent!", responses });
    } catch (error) {
      console.error("❌ Error sending notifications:", error);
      res.status(500).json({ error: "Failed to send notifications", details: error.message });
    }
  });
  



const PORT = 80;

app.get("/api", async(req, res) =>{
    return res.json("hello").status(200)
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});