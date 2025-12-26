//Main server file

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
// const admin = require("firebase-admin");
// ✅ Correct import
const crypto = require("crypto");



const app = express();
app.post(
    "/razorpay/webhook",
    express.raw({ type: "application/json" }),
    async (req, res) => {
        const secret = "k7ZQ10G2vSdP3vilTZ83a4GS"; // 🔐 Your webhook secret
        const signature = req.headers["x-razorpay-signature"];
        const rawBody = req.body;

        try {
            // ✅ Ensure raw body is a Buffer
            if (!Buffer.isBuffer(rawBody)) {
                throw new Error("Invalid raw body: not a Buffer");
            }

            // 🔒 Generate and compare HMAC signature
            const expectedSignature = crypto
                .createHmac("sha256", secret)
                .update(rawBody)
                .digest("hex");

            if (expectedSignature !== signature) {
                console.log("❌ Invalid Razorpay signature");
                return res.status(400).json({ success: false, message: "Invalid signature" });
            }

            // ✅ Parse the body
            const data = JSON.parse(rawBody.toString("utf8"));
            const payment = data?.payload?.payment?.entity;

            if (!payment || payment.status !== "captured") {
                console.log("❗ Payment not captured or invalid");
                return res.status(200).json({ success: false });
            }

            // ✅ Extract user from Razorpay notes
            const user = payment.notes?.user;
            const rp_i = payment.amount / 100
            if (!user) {
                console.log("⚠️ No user found in payment notes");
                return res.status(400).json({ success: false, message: "User missing in notes" });
            }

            // ✅ Fetch rupee amount from admin config
            // const fees = await Rupeemodule.findOne({ username: "admin" });
            // if (!fees) {
            //     console.log("⚠️ Fee configuration missing");
            //     return res.status(500).json({ success: false, message: "Fee config missing" });
            // }

            // ✅ Find user balance
            const userData = await Balancemodule.findOne({ user });
            if (!userData) {
                console.log("❌ User not found:", user);
                return res.status(404).json({ success: false, message: "User not found" });
            }



            //   last_tr_id : {type : String, unique : true}

            // ✅ Update balance
            if (userData.last_tr_id === payment.id) {
                return res.status(200).json({ success: true })
            }


            const creditAmount = parseInt(rp_i || "0");
            const int_bal = parseInt(userData.balance) + creditAmount
            userData.last_tr_id = payment.id
            userData.balance = int_bal
            await userData.save();


            // ✅ Log transaction
            await Historymodule.create({
                Time: new Date().toISOString(),
                user,
                rupee: toString(rp_i),
                type: "Credited",
                tp: "Rupee",
            });

            const cred_to = await referandearnModule.findOne({ user: user });

            if(cred_to && cred_to.ac_deb !== "Yes" && rp_i > 20){
                const get_referd_user = await Balancemodule.findOne({ user: cred_to.referd_user_d_id });
                const new_bal = parseInt(get_referd_user.balance) + 40;
                get_referd_user.balance = new_bal;
                await get_referd_user.save();
                await Historymodule.create({
                    Time: new Date().toISOString(),
                    user : cred_to.referd_user_d_id,
                    rupee: "40",
                    type: "Credited",
                    tp: "Rupee",
                });
                cred_to.ac_deb = "Yes";
                await cred_to.save();
            }

            console.log(`✅ ₹${rp_i} credited to user: ${user}`);
            return res.status(200).json({ success: true });
        } catch (err) {
            console.error("❌ Webhook processing error:", err);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
);

app.use(express.static('public'))
// app.use(express.json());



app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));


// app.use(bodyParser.urlencoded({ extended: true }));

// 🟡 RAW BODY middleware for webhook
// app.use(
//   "/razorpay/webhook",
//   bodyParser.json({
//     verify: (req, res, buf) => {
//       req.rawBody = buf;
//     },
//   })
// );




// Initialize Firebase Admin SDK
// const serviceAccount = require("./firebase-adminsdk.json"); // Ensure the correct path

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });




app.use(cors({
    origin: "*", // Allow any origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));



const Time = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true // or false for 24-hour format
});


// MongoDB connection
//Main
const mongoURI = "mongodb+srv://instasecur24:kick@flutterdata.cgalmbt.mongodb.net/?retryWrites=true&w=majority&appName=flutterdata"
// const mongoURI = "mongodb+srv://instasecur24:kick@stawroprototypecluster.0xbx0u5.mongodb.net/?retryWrites=true&w=majority&appName=staWroprototypecluster";
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
    res.send('Hello, world Vs : 1.3.3 ; Last Updated : 16-08-2025 ; Type : Live');
});


app.get('/ip', (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    res.send(`Your IP address is: ${ip}`);
});

const UsersSchema = new mongoose.Schema({

    Time: String,
    pass: String,
    email: String,
    username: String,
    name: String,
    valid: {
        default: "no",
        type: String
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
    username: String,
    otp: String
}, { timestamps: true });

const User_s_OTP_module = mongoose.model('Users_OTP', user_s_otpSchema);


// const GoogleUser = require('./models/GoogleUser'); // already required


app.post('/post/google/auth', async (req, res) => {
    const { email, name, username, uid } = req.body;

    if (!email || !uid) {
        return res.status(400).json({ Status: "INVALID_DATA", message: "Missing required fields." });
    }

    try {
        let user = await Usermodule.findOne({ email });

        if (user) {
            // User exists, proceed to login
            if (user.pass !== uid) {
                return res.status(401).json({ Status: "INVALID_UID", message: "UID does not match." });
            }

            const token = jwt.sign({ id: user._id }, "kanna_stawro_founders_withhh_1931_liketha", {
                expiresIn: "365 days"
            });

            return res.status(200).json({
                Status: "OK",
                message: "Login success",
                token,
                user: user._id,
                username: user.username
            });
        } else {
            // User not found, create new user
            const Time = new Date();

            user = await Usermodule.create({
                pass: uid,
                email,
                name,
                username,
                Time,
                valid: "yes"
            });

            const token = jwt.sign({ id: user._id }, "kanna_stawro_founders_withhh_1931_liketha", {
                expiresIn: "365 days"
            });

            return res.status(200).json({
                Status: "OK",
                message: "User created and logged in successfully",
                token,
                user: user._id,
                username: user.username
            });
        }
    } catch (error) {
        console.error("Google Auth Error:", error);
        return res.status(500).json({ Status: "ERR_SERVER", message: "Internal server error." });
    }
});



app.post('/post/new/google/user', async (req, res) => {
    const { email, name, username, uid } = req.body;

    if (!email || !uid) {
        return res.status(400).json({ Status: "INVALID_DATA", message: "Missing required fields." });
    }

    console.log(email, name, username, uid)

    try {
        // Check if user already exists
        let user = await Usermodule.findOne({ email });

        if (user) {
            return res.status(200).json({ Status: "OK", message: "User already exists. Login success." });
        }

        // Create new user
        user = await Usermodule.create({
            pass: uid,
            email,
            name,
            username,
            Time,
            valid: "yes"
        });

        return res.status(200).json({ Status: "OK", message: "User created successfully." });

    } catch (error) {
        console.error("Google Signup Error:", error);
        return res.status(500).json({ Status: "ERR_SERVER", message: "Internal server error." });
    }
});


app.post('/post/google/login', async (req, res) => {
    const { email, uid } = req.body;

    if (!email || !uid) {
        return res.status(200).json({ Status: "BAD", message: "Some Data Missing" });
    }

    try {
        // Check if Google user exists
        const user = await Usermodule.findOne({ email, pass: uid }).lean();

        if (!user) {
            return res.status(202).json({ Status: "NO" }); // Not found
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, "kanna_stawro_founders_withhh_1931_liketha", { expiresIn: "365 days" });

        return res.status(200).json({
            Status: "OK",
            token,
            user: user._id,
            username: user.username
        });

    } catch (error) {
        console.error("Google Login Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});



app.post('/get/all/users/data/otp/to/verify', async (req, res) => {
    const { OTP, username } = req.body;

    try {

        if (!OTP && !username) return res.status(202).json({ Status: "BAD", message: "Invalid OTP or username." });

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

        if (!OTP && !data) return res.status(202).json({ Status: "BAD", message: "Invalid OTP or username." });

        const user = await Usermodule.findOne({
            $or: [{ username: data.trim() }, { email: data.trim() }]
        });

        const find_user = await User_s_OTP_module.findOne({ username: user.username });

        // Check if user and OTP match
        if (find_user && find_user.otp === OTP) {
            // Update the user's valid status in the main user module
            const mainUser = await Usermodule.findOne({ email: user.email });
            if (mainUser) {
                mainUser.valid = "yes";
                await mainUser.save();
            }

            // Delete the OTP record

            await find_user.deleteOne();

            const token = jwt.sign({ id: user._id }, "kanna_stawro_founders_withhh_1931_liketha", { expiresIn: "365 days" });
            return res.status(200).json({ Status: "OK", token, user: user._id, username: user.username });

        }
        else {
            return res.status(200).json({ Status: "BAD", message: "Invalid OTP or username." });
        }
    } catch (error) {
        console.error("Error during OTP verification:", error);
        return res.status(500).json({ message: "Internal Server Error." });
    }
});

app.post('/get/new/otp/to/verify/app', async (req, res) => {
    try {
        const { data } = req.body;


        if (!data) {
            return res.status(400).json({ Status: "ERR", message: "Data is required." });
        }

        const user = await Usermodule.findOne({
            $or: [{ username: data.trim() }, { email: data.trim() }]
        }).lean();

        if (!user) {
            return res.status(404).json({ Status: "ERR", message: "User not found." });
        }


        if (user.valid === "no") {
            const existingOTP = await User_s_OTP_module.findOne({ username: user.username });

            if (existingOTP) {
                await existingOTP.deleteOne();
            }


            const OTP = generateOTP();


            const otpData = await User_s_OTP_module.create({
                Time,
                username: user.username,
                otp: OTP
            });


            let mailOptions = {
                from: "stawropuzzle@gmail.com",
                to: user.email,
                subject: "Resend OTP for Account Verification",
                html: `
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>stawro Account Verification</title>
                    </head>
                    <body>
                        <div>
                            <h2>Hello ${user.username},</h2>
                            <p>Your OTP for email verification is:</p>
                            <h3>${otpData.otp}</h3>
                            <p>Please use this OTP to complete your account verification.</p>
                            <p>Thank you for choosing stawro!</p>
                        </div>
                    </body>
                </html>
                `,
            };


            // Send email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error sending email:", error);
                    return res.status(500).json({ Status: "EMAIL_ERR", message: "Failed to send email." });
                }

                return res.status(200).json({ Status: "OK", message: "OTP resent successfully." });
            });


        } else {
            return res.status(400).json({ Status: "ERR", message: "User is already verified." });
        }
    } catch (error) {
        console.error("Error during OTP verification:", error);
        return res.status(500).json({ Status: "ERR", message: "Internal Server Error." });
    }
});





app.post('/get/new/otp/to/verify', async (req, res) => {
    const { data } = req.body;
    try {

        if (!data) return res.status(400).json({ message: "Some Data Missing" })
        const user = await Usermodule.findOne({
            $or: [{ username: data.trim() }, { email: data.trim() }]
        }).lean();
        const OTP = generateOTP();
        if (user.valid === "no") {
            const otp_get = await User_s_OTP_module.findOne({ username: user.username })
            if (otp_get) {
                await otp_get.deleteOne();
            } else {
                const otpData = await User_s_OTP_module.create({ Time, username: user.username, otp: OTP });

                let mailOptions = {
                    from: "stawropuzzle@gmail.com",
                    to: user.email,
                    subject: "Congratulations, your account has been successfully created on stawro.",
                    html: `
                    <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>stawro Account Verification</title>
                        </head>
                        <body>
                            <div>
                                <h2>Welcome to stawro, ${user.username}!</h2>
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
    } catch (error) {
        console.error("Error during OTP verification:", error);
        return res.status(500).json({ message: "Internal Server Error." });
    }
})

const BalanceSchema = new mongoose.Schema({
    Time: String,
    user: { type: String, required: true },
    balance: { type: String, required: true },
    last_tr_id: { type: String, unique: true }
}, { timestamps: true });

const Balancemodule = mongoose.model('Balance', BalanceSchema);


const my_money_Schema = new mongoose.Schema({
    Time: String,

    user: {
        default: "kick",
        type: String
    },

    balance: String,
}, { timestamps: true });

const My_MoneyModule = mongoose.model('My_Money', my_money_Schema);

const FCMSchema = new mongoose.Schema({
    Time: String,
    user: String,
    email: String,
    FCM: String,
    user_id: String
}, { timestamps: true });

const FCMModule = mongoose.model('FCM_Users', FCMSchema);


app.post("/logout/data/app", async (req, res) => {
    const { data } = req.body;
    try {
        if (!data) return res.status(400).json({ message: "Some Data Missing" })

        const get_data = await FCMModule.findOne({ user_id: data })
        if (get_data) {
            get_data.FCM = "";
            await get_data.save();
            return res.status(200).json({ Status: "OK" })
        } else {
            const user = await Usermodule.findOne({ _id: data }).lean()
            if (user) {
                await FCMModule.create({ Time: new Date(), user: user.username, email: user.email, FCM: "", user_id: user._id });
                return res.status(200).json({ Status: "OK" })
            }
            return res.status(200).json({ message: "No User Exist From This" })
        }


    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})




app.post('/login/data/app', async (req, res) => {
    const { data, pass, FCM } = req.body;

    try {

        if (!data && !pass && !FCM) return res.status(400).json({ message: "Some Data Missing" })

        // Find user by email or username

        const user = await Usermodule.findOne({
            $or: [{ username: data.trim() }, { email: data.trim() }]
        }).lean();

        if (!user) {
            return res.status(402).json({ Status: "NO", message: "User not found" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(pass, user.pass);
        if (!isMatch) {
            return res.status(401).json({ Status: "BAD", message: "Invalid password" });
        }

        if (user.valid !== "yes") {
            await User_s_OTP_module.deleteOne({ username: user.username });

            const OTP = generateOTP();


            const otpData = await User_s_OTP_module.create({
                Time,
                username: user.username,
                otp: OTP
            });

            const mailOptions = {
                from: "stawropuzzle@gmail.com",
                to: user.email,
                subject: "Resend OTP for Account Verification",
                html: `
                <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>stawro Account Verification</title>
                    </head>
                    <body>
                        <div>
                            <h2>Hello ${user.username},</h2>
                            <p>Your OTP for email verification is:</p>
                            <h3>${otpData.otp}</h3>
                            <p>Please use this OTP to complete your account verification.</p>
                            <p>Thank you for choosing stawro!</p>
                        </div>
                    </body>
                </html>`
            };

            try {
                await transporter.sendMail(mailOptions);
                return res.status(403).json({ Status: "NO-YES", user: user.username, email: user.email });
            } catch (emailError) {
                console.error("Error sending email:", emailError);
                return res.status(500).json({ Status: "EMAIL_ERR", message: "Failed to send email." });
            }
        }

        // Generate token
        const token = jwt.sign({ id: user._id }, "kanna_stawro_founders_withhh_1931_liketha", { expiresIn: "365 days" });

        // Update or create FCM token
        await FCMModule.findOneAndUpdate(
            { user: user.username },
            { Time, user: user.username, email: user.email, FCM, user_id: user._id },
            { upsert: true, new: true }
        );

        // Successful response
        return res.status(200).json({ Status: "OK", token, user: user._id, username: user.username });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});












// app.post('/login/data/app', async (req, res) => {
//     const { data, pass, FCM } = req.body;

//     try {
//         // Find user by email or username
//         const user = await Usermodule.findOne({
//             $or: [{ username: data.trim() }, { email: data.trim() }]
//         });

//         if (!user) {
//             return res.status(402).json({ Status: "NO" }); // User not found
//         }

//         if (user.valid !== "yes") {

//             const existingOTP = await User_s_OTP_module.findOne({ username: user.username });

//             if (existingOTP) {
//                 await existingOTP.deleteOne();
//             }


//             const OTP = generateOTP();
//             const Time = new Date(); // Ensure Time is defined


//             const otpData = await User_s_OTP_module.create({
//                 Time,
//                 username: user.username,
//                 otp: OTP
//             });


//             let mailOptions = {
//                 from: "stawropuzzle@gmail.com",
//                 to: user.email,
//                 subject: "Resend OTP for Account Verification",
//                 html: `
//                 <html lang="en">
//                     <head>
//                         <meta charset="UTF-8">
//                         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                         <title>stawro Account Verification</title>
//                     </head>
//                     <body>
//                         <div>
//                             <h2>Hello ${user.username},</h2>
//                             <p>Your OTP for email verification is:</p>
//                             <h3>${otpData.otp}</h3>
//                             <p>Please use this OTP to complete your account verification.</p>
//                             <p>Thank you for choosing stawro!</p>
//                         </div>
//                     </body>
//                 </html>
//                 `,
//             };


//             // Send email
//             transporter.sendMail(mailOptions, (error, info) => {
//                 if (error) {
//                     console.error("Error sending email:", error);
//                     return res.status(500).json({ Status: "EMAIL_ERR", message: "Failed to send email." });
//                 }

//                 return res.status(403).json({ Status: "NO-YES", user: user.username, email : user.email }); // User not verified

//             });




//         }

//         // Compare password
//         const isMatch = await bcrypt.compare(pass, user.pass);
//         if (!isMatch) {
//             return res.status(401).json({ Status: "BAD", message: "Invalid password" });
//         }

//         // Generate token
//         const token = jwt.sign({ id: user._id }, "kanna_stawro_founders_withhh_1931_liketha", { expiresIn: "365 days" });

//         // Update or create FCM token
//         let data_fcm = await FCMModule.findOne({ user: user.username });
//         if (data_fcm) {
//             data_fcm.FCM = FCM;
//             await data_fcm.save();
//         } else {
//             await FCMModule.create({ Time: new Date(), user: user.username, email: user.email, FCM, user_id : user._id });
//         }

//         // Successful response
//         res.status(200).json({ Status: "OK", token, user: user._id, username: user.username });

//     } catch (error) {
//         console.error("Login Error:", error);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// });




app.post('/get/balance/new/data', authMiddleware, async (req, res) => {
    const { user, val_cm , refer_ui} = req.body;

    try {

        if (!user) return res.status(400).json({ message: "Some Data missing" })

        if(val_cm !== "" && refer_ui !== ""){
            const data_bal = await Balancemodule.findOne({ user: refer_ui }).lean();
            if (!data_bal) return res.status(200).json({ Status: "BAD_REF" });
        }


        const data = await Balancemodule.findOne({ user: user })
        if (!data) {
        
            await Balancemodule.create({ user, Time, balance: "10", last_tr_id: user });
            await Historymodule.create({ Time, user, rupee: "10", type: "Credited", tp: "Rupee" });
            const data1 = StarBalmodule.findOne({ user }).lean()
            if (data1) {
                const add_ref_bal = await Balancemodule.findOne({ user: refer_ui })
                if(val_cm !== "782egs"){
                    return res.status(200).json({ Status: "OK" });
                }
                const sum_ref = parseInt(add_ref_bal.balance) + 10
                await Balancemodule.updateOne({ user: refer_ui }, { balance: sum_ref })

                const rfr_vrify = await referandearnModule.findOne({ user }).lean();

                if(!rfr_vrify){
                    await referandearnModule.create({
                    Time,
                    my_referd: [],
                    referd_user_d_id: refer_ui,
                    ac_crt: "Yes",
                    ac_deb: "No",
                    user,
                })
                }

                await Historymodule.create({ Time, user: refer_ui, rupee: "10", type: "Credited", tp: "Rupee" });
                return res.status(200).json({ Status: "OK" });
            } else {
                await Historymodule.create({ Time, user, rupee: "1", type: "Credited", tp: "Stars" });
                await StarBalmodule.create({ Time, user, balance: "1" });
                return res.status(200).json({ Status: "OK" });
            }

        } else {
            return res.status(202).json({ Status: "NO" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})



app.get("/get/acount/balence", authMiddleware, async (req, res) => {
    const user = req.user;

    try {

        if (!user) return res.status(400).json({ Status: "NO", message: "Some Data Missing" })

        const data = await Balancemodule.findOne({ user: user }).lean();
        if (data) {
            console.log(data)
            return res.status(200).json({ data })
        } else {
            return res.status(202).json({ Status: "NO" })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


const HistorySchema = new mongoose.Schema({

    Time: String,
    user: String,
    rupee: String,
    type: String,
    tp: String,

});


const Historymodule = mongoose.model('History', HistorySchema);


app.get('/update/data', authMiddleware,async (req, res) => {
    const user = req.user;
    try {
        if (!user) return res.status(400).json({ Status: "NO", message: "Some Data Missing" })

        const data = await Historymodule.find({ user: user }).lean();
        if (data) {
            return res.status(200).json({ data: data.reverse() });
        } else {
            return res.status(400).json({ message: "Error" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


const UPI_BANKSchema = new mongoose.Schema({
    Time: String,
    user: String,
    ac_h_nme: String,
    bank_nme: {
        default: "No",
        type: String
    },
    Acc_no: String,
    ifsc: {
        default: "No",
        type: String
    },
    app: {
        default: "No",
        type: String
    },
    type: String

}, { timestamps: true });

const UPImodule = mongoose.model('Baank_UPI', UPI_BANKSchema);

app.post("/bank/upi/data/collect", authMiddleware, async (req, res) => {
    const { user, ac_h_nme, bank_nme, Acc_no, ifsc, app, type } = req.body;
    try {

        if (!user && !ac_h_nme && !bank_nme && !Acc_no && !ifsc && !app && !type) return res.status(400).json({ Status: "NO", message: "Some Data Missing" })

        const data = await UPImodule.findOne({ user: user }).lean()

        if (!data) {
            await UPImodule.create({ user, ac_h_nme, bank_nme, Acc_no, ifsc, app, type })
            return res.status(200).json({ Status: "OK" })
        } else {
            return res.status(200).json({ Status: "IN" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


app.get("/get/bank/account/data", authMiddleware, async (req, res) => {
    const user = req.user;
    try {
        if (!user) return res.status(400).json({ Status: "NO", message: "Some Data Missing" })

        const data = await UPImodule.findOne({ user: user }).lean()
        if (data) {
            return res.status(200).json({ data })
        } else {
            return res.status(202).json({ Status: "No" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})



const CoinSchema = new mongoose.Schema({
    Time: String,
    title: String,
    img: String,
    valid: String,
    body: String,
    stars: String,
}, { timestamps: true });

const Coinmodule = mongoose.model('Coins', CoinSchema);

app.post("/coin/new/data", async (req, res) => {
    const { title, img, valid, body, stars } = req.body;
    try {
        if (!title && !img && !valid && !body && !stars) return res.status(400).json({ Status: "NO", message: "Some Data Missing" })

        await Coinmodule.create({ title, img, valid, body, stars, Time });
        return res.status(202).json({ Status: "OK" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

app.get("/get/coin/data", async (req, res) => {
    try {
        const data = await Coinmodule.find({}).lean();
        if (data) {
            return res.status(200).json({ data })
        } else {
            return res.status(400).json({ Status: "BAD" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

app.get("/get/coin/data/2", adminMidleware, async (req, res) => {
    try {
        const data = await Coinmodule.find({}).lean()
        if (data) {
            return res.status(200).json({ data })
        } else {
            return res.status(400).json({ Status: "BAD" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})



app.delete("/delete/coin/by/:id", async (req, res) => {
    const id = req.params.id;
    try {
        if (!id) return res.status(400).json({ Status: "NO", message: "Some Data Missing" })

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid ObjectId format" });
        }

        const data = await Coinmodule.findById(id)
        if (data) {
            await data.deleteOne();
            return res.status(202).json({ Status: "OK" })
        } else {
            return res.status(202).json({ Status: "BAD" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


const MyCoinsSchema = new mongoose.Schema({
    Time: String,
    title: String,
    img: String,
    valid: String,
    body: String,
    stars: String,
    type: String,
    user: String
}, { timestamps: true });

const Mycoinsmodule = mongoose.model('My_Coins', MyCoinsSchema);



app.post('/get/my/conis/get', authMiddleware, async (req, res) => {
    const { id, user } = req.body;
    try {

        if (!id && !user) return res.status(200).json({ Status: "BAD", message: "Some Data Missing" })

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid ObjectId format" });
        }
        const data = await Coinmodule.findById({ _id: id }).lean()
        const data1 = await StarBalmodule.findOne({ user })

        if (data && data1) {
            if (parseInt(data1.balance) >= parseInt(data.stars)) {
                const sum = parseInt(data1.balance) - parseInt(data.stars);
                // await StarBalmodule.create({Time, user, balance : "2"});
                await data1.updateOne({ balance: sum })
                //coins to my coins
                await Mycoinsmodule.create({ Time, title: data.title, img: data.img, valid: data.valid, body: data.body, stars: data.stars, type: "Stars", user })
                await Historymodule.create({ Time, user, rupee: data.stars, type: "Debited", tp: "Stars" });
                return res.status(200).json({ Status: "OK" })
            }
            else {
                return res.status(202).json({ Status: "Low Bal", message: "Low Balance" })
            }

        } else if (!data1) {
            await StarBalmodule.create({ Time, user, balance: "2" });
            // History
            await Historymodule.create({ Time, user, rupee: "2", type: "Credited", tp: "Stars" });
            return res.status(202).json({ Status: "Low Bal" })
        } else {
            return res.status(301).json({ Status: "BAD" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})



app.get('/get/coins/data/by/id', authMiddleware, async (req, res) => {
    const user = req.user;
    try {
        if (!user) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        const data = await Mycoinsmodule.find({ user }).lean()
        if (data) {
            return res.status(200).json({ data })

        } else {
            return res.status(200).json({ Status: "BAD" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


app.get('/get/coins/data/length/to/app', authMiddleware, async (req, res) => {
    const user = req.user;

    try {
        if (!user) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        const data = await Mycoinsmodule.find({ user }).lean()
        if (data) {
            return res.status(200).json({ data: data.length })
        } else {
            return res.status(201).json({ Status: "BAD" })
        }
    } catch (error) {
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

app.get('/get/stars/balance', authMiddleware, async (req, res) => {
    const user = req.user;
    try {
        if (!user) return res.status(200).json({ Status: "BAD", message: "Some Data Missing" })

        const data = await StarBalmodule.findOne({ user }).lean()
        if (!data) {
            await StarBalmodule.create({ Time, user: user, balance: "2" });
            // History
            await Historymodule.create({ Time, user, rupee: "2", type: "Credited", tp: "Stars" });
            return res.status(200).json({ Status: "OKK" });
        } else {
            return res.status(200).json({ data });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

const CliamReqSchema = new mongoose.Schema({
    Time: String,
    title: String,
    img: String,
    valid: String,
    body: String,
    stars: String,
    type: String,
    user: String,
    ID: String
}, { timestamps: true });

const Claimrequestmodule = mongoose.model('Claim_req_Coins', CliamReqSchema);


app.get("/get/coins/by/id/cupons/by/apps/:id", async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            return res.status(400).json({ success: false, message: "Invalid ID" });
        }

        let from = "Request";
        let data = await Claimrequestmodule.findOne({ ID: id }).lean(); // Using .lean() for performance boost

        if (!data) {
            from = "Claimed";
            if (!mongoose.Types.ObjectId.isValid(id)) {  // Ensure valid ObjectId for findById
                return res.status(400).json({ success: false, message: "Invalid ObjectId format" });
            }
            data = await ClaimedCoinsmodule.findById(id).lean();
        }

        if (!data) {
            return res.status(404).json({ success: false, message: "Data not found" });
        }

        return res.status(200).json({ success: true, data, from });

    } catch (error) {
        console.error("Error fetching data:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});





app.post('/claim/reqst/coins/admin', authMiddleware, async (req, res) => {
    const { user, id } = req.body
    try {
        if (!user && !id) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        const bank = await UPImodule.findOne({ user }).lean();
        if (!bank) return res.status(200).json({ Status: "No-BANK", message: "Bank Details Missing" })

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid ObjectId format" });
        }

        const Bougt_Coin = await Mycoinsmodule.findById({ _id: id })
        if (Bougt_Coin.user === user) {
            await Claimrequestmodule.create({
                Time,
                title: Bougt_Coin.title,
                img: Bougt_Coin.img,
                valid: Bougt_Coin.valid,
                body: Bougt_Coin.body,
                stars: Bougt_Coin.stars,
                type: Bougt_Coin.type,
                user: user,
                ID: Bougt_Coin._id
            })
            await PendingNotimodule.create({ Time, user, idd: Bougt_Coin._id, type: "Coin", title: Bougt_Coin.title, sub: "pending" })
            await Bougt_Coin.deleteOne();
            return res.status(200).json({ Status: "OK" })

        } else {
            return res.status(200).json({ Status: "BAD" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


app.get("/get/requested/coins/by", authMiddleware, async (req, res) => {
    const user = req.user

    try {
        if (!user) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        const data = await Claimrequestmodule.find({ user }).lean();
        if (data) {
            return res.status(200).json({ data });
        } else {
            return res.status(201).json({ Status: "BAD" })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

app.get('/get/requested/coins/admin', adminMidleware, async (req, res) => {
    try {
        const data = await Claimrequestmodule.find({}).lean();

        if (!data || data.length === 0) {
            return res.status(200).json({ Status: "BAD", data: [] });
        }

        const Data = await Promise.all(
            data.map(async (item) => {
                const upi_bnk = await UPImodule.findOne({ user: item.user }).lean();
                return {
                    data: item,
                    bank: upi_bnk || null
                };
            })
        );

        return res.status(200).json({ data: Data });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});



app.delete("/find/by/id/and/delete/req/coins/:id", async (req, res) => {
    const id = req.params.id;
    try {
        if (!id) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid ObjectId format" });
        }

        const data = await Claimrequestmodule.findById({ _id: id })
        if (data) {
            await ClaimedCoinsmodule.create({
                Time,
                title: data.title,
                img: data.img,
                valid: data.valid,
                body: data.body,
                stars: data.stars,
                type: data.type,
                user: data.user
            })
            //Pending Notification
            //sub => pending or completed
            //type => Coin or Money
            await PendingNotimodule.findOneAndDelete({ idd: data.ID })
            await PendingNotimodule.create({ Time, user: data.user, idd: data._id, type: "Coin", title: data.title, sub: "completed" })
            await data.deleteOne();
            return res.status(202).json({ Status: "OK" })
        } else {
            return res.status(202).json({ Status: "BAD" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

const ClimedReqSchema = new mongoose.Schema({
    Time: String,
    title: String,
    img: String,
    valid: String,
    body: String,
    stars: String,
    type: String,
    user: String
}, { timestamps: true });

const ClaimedCoinsmodule = mongoose.model('Claimed_coins', ClimedReqSchema);

app.get('/get/claimed/from/pending/coins', async (req, res) => {
    try {
        const data = await ClaimedCoinsmodule.find({}).lean();
        if (data) {
            return res.status(200).json({ data })
        } else {
            return res.status(201).json({ Status: "BAD" })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


app.get('/get/claimed/from/pending/coins', authMiddleware, async (req, res) => {
    const user = req.user;
    try {
        if (!user) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" });

        const data = await ClaimedCoinsmodule.find({ user }).lean();
        if (data) {
            return res.status(200).json({ data })
        } else {
            return res.status(201).json({ Status: "No" })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

})



app.get('/get/claimed/from/pending/coins/app', authMiddleware, async (req, res) => {
    const user = req.user;

    try {
        if (!user) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        const data = await ClaimedCoinsmodule.find({ user }).lean();
        if (data) {
            return res.status(200).json({ data: data.length })
        } else {
            return res.status(201).json({ Status: "No" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})



const PendingNotiSchema = new mongoose.Schema({

    Time: String,
    user: String,
    idd: String,
    type: String,
    title: String,
    sub: String

});

const PendingNotimodule = mongoose.model('Pending_Noti', PendingNotiSchema);

app.get('/get/pending/notification', authMiddleware, async (req, res) => {
    const user = req.user;
    try {
        if (!user) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        const data = await PendingNotimodule.find({ user }).lean();
        if (data) {
            return res.status(200).json({ data })
        } else {
            return res.status(400).json({ Status: "BAD" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

const AdminUserSchema = new mongoose.Schema({
    Time: String,
    username: String,
    pass: String,
}, { timestamps: true });

const AdminUsermodule = mongoose.model('Admin_Users', AdminUserSchema);

app.post('/get/new/user/admin/account', async (req, res) => {
    const { username, pass, quest, answ, id } = req.body;

    try {
        if (!username && !pass && !quest && !answ && !id) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        const user = await AdminUsermodule.findOne({ username }).lean();
        if (user) {
            return res.status(202).json({ Status: "EXIST" })
        }

        if (quest === "Hero" && answ === "Ki1931cK" && id === "193100") {
            const hash = await bcrypt.hash(pass, 10)
            await AdminUsermodule.create({ Time, username, pass: hash, valid: "No" })
            return res.status(202).json({ Status: "OK" })
        } else {
            return res.status(202).json({ Status: "BAD" })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

})

const OTPSchema = new mongoose.Schema({
    Time: String,
    username: String,
    OTP: String,
}, { timestamps: true });

const OTPmodule = mongoose.model('OTP_Data', OTPSchema);



app.post('/login/to/admin/account', async (req, res) => {
    const { username } = req.body;
    try {
        if (!username) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" });

        const otp = generateOTP()
        const user = await AdminUsermodule.findOne({ username }).lean();
        if (user) {
            await OTPmodule.findOneAndDelete({ username: username })
            const data = await OTPmodule.create({ username, Time, OTP: otp })
            let mailOptions = {
                from: 'stawropuzzle@gmail.com', // Sender address
                to: "anvithapujari036@gmail.com", // List of recipients
                subject: `stawro, Admin Login OTP`, // Subject line
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
                                <strong>stawro</strong>
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
                return res.json({ Status: "OK" })
            });

            // if(user.valid === "Yes"){
            //     const dat = await bcrypt.compare(pass, user.pass)
            //     if(dat){
            //         const token = jwt.sign({ username : user.username }, "kanna_stawro_founders_withhh_1931_liketha_pass-worff_admin_gadi_passkey__", { expiresIn: "24h" });
            //         return res.status(202).json({Status : "OK", token })
            //     }else{
            //         return res.status(202).json({Status : "BAD"})
            //     }
            // }else{
            //     return res.status(202).json({Status : "BAD"})
            // }


        } else {
            return res.status(202).json({ Status: "BAD" })
        }
    } catch (error) {
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
//                     const token = jwt.sign({ username : username }, "kanna_stawro_founders_withhh_1931_liketha_pass-worff_admin_gadi_passkey__", { expiresIn: "24h" });
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
//                         "kanna_stawro_founders_withhh_1931_liketha_pass-worff_admin_gadi_passkey__",
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

        if (!otp && !username && !pass) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })
        // Verify OTP
        const data = await OTPmodule.findOne({ username });
        if (!data || data.OTP !== otp) {

            return res.status(200).json({ status: "BAD", message: "Invalid OTP" });
        }

        // OTP is valid, delete it
        await data.deleteOne();

        // Verify user credentials
        const user = await AdminUsermodule.findOne({ username }).lean();

        if (!user) {
            return res.status(200).json({ Status: "BAD" });
        }

        // const isPasswordCorrect = await bcrypt.compare(pass, user.pass);
        bcrypt.compare(pass, user.pass, (err, response) => {
            if (response) {
                // Generate JWT token
                const token = jwt.sign(
                    { username },
                    "kanna_stawro_founders_withhh_1931_liketha_pass-worff_admin_gadi_passkey__", // Use environment variable for secret key
                    { expiresIn: "24h" }
                );

                return res.status(200).json({ Status: "OK", token });
            } else {
                console.log(err)
                return res.status(200).json({ Status: "BAD" });
            }
        })




    } catch (error) {
        console.error("Error during OTP and password verification:", error);
        return res.status(500).json({ Status: "BAD", message: "Internal Server Error" });
    }
});


const RupeeSchema = new mongoose.Schema({
    Time: String,
    username: String,
    rupee: String,
}, { timestamps: true });

const Rupeemodule = mongoose.model('Rupee', RupeeSchema);

app.post('/rupee/get/for/game', async (req, res) => {
    const { rupee } = req.body;

    try {
        if (!rupee) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" });

        const username = "admin"

        const user = await Rupeemodule.findOne({ username })

        if (user) {
            await user.updateOne({ rupee: rupee })
            return res.status(200).json({ Status: "OK" })
        } else {
            await Rupeemodule.create({ rupee, username, Time })
            return res.status(200).json({ Status: "OK" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

app.get('/get/rupee/data/play', async (req, res) => {
    try {
        const username = "admin";
        const data = await Rupeemodule.findOne({ username }).lean();

        if (data) {
            return res.status(200).json({ data })
        } else {
            return res.status(400).json({ Status: "BAD" })
        }


    } catch (error) {
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


const ReportSchema = new mongoose.Schema({

    Time : String,
    user : String,
    qst : String,
    ans: String,
    a: String,
    b: String,
    c: String,
    d: String,
    seconds: String,
    img: String,
    usa : String,
    vr : Boolean,
    msg : String,
    text : String,
    exp_sec : String,
    cat : String,
    tough : String

}, { timestamps: true });

const ReportSecondModule = mongoose.model('Report_sec', ReportSchema);


app.get('/choose/question/start/game/:lang', async (req, res) => {
    const { lang, user } = req.params.body;
    try {

        if (!lang) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        const Total_Questions = await QuestionModule.find({ lang: lang }).lean();

        if (!Total_Questions) return res.status(400).json({ Status: "BAD", message: "This Length not Found" });

        const sum = Total_Questions.length - 9;
        const specificNumbers = [];
        for (i = sum; i > 0; i -= 10) {
            specificNumbers.push(i);
        }
        const getRandomNumber = () => {
            const randomIndex = Math.floor(Math.random() * specificNumbers.length);
            return specificNumbers[randomIndex];
        };
        const num = getRandomNumber()
        const Array = [];
        const two = num + 10
        for (i = num; i < two; i++) {
            Array.push(i)
        }


    } catch (error) {
        console.log(error);
        // Send an error response
        return res.status(500).json({ message: "Internal Server Error" });
    }
})
















const QuestionListSchema = new mongoose.Schema({
    Time: String,
    user: String,
    lang: String,
    list: [],
    oldlist: [],
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




// //old main 1931
// app.post('/start/playing/by/debit/amount', async (req, res) => {
//     const { user } = req.body;

//     try {



//         if (!user) return res.status(400).json({ Status: "s_m", message: "Some Data Missing" })

//         const status = await Start_StopModule.findOne({ user: "kick" })
//         if (status.Status === "off") {
//             return res.status(200).json({ Status: "Time", message: status.text })
//         }


//         // Find the balance of the user
//         const lang_data = await LanguageSelectModule.findOne({ user }).lean()
//         const balance = await Balancemodule.findOne({ user });
//         // Find the fees from the admin user
//         const fees = await Rupeemodule.findOne({ username: "admin" }).lean();
//         // await StartValidmodule.findOneAndDelete({ user });


//         function main_bal() {
//             try {
//                 const get_bal = Balancemodule.findOne({ user });
//                 const create_data = QuestionListmodule.findOne({ user }).lean();

//                 if (parseInt(get_bal.balance) <= parseInt(fees.rupee)) {
//                     const lang_data = QuestionModule.distinct("sub_lang");
//                     const won_data = Wonmodule.countDocuments({ user });
//                     const total_play = Totalusermodule.countDocuments({ user });

//                     const get_per = (won_data / total_play) * 100;

//                     console.log(get_per)

//                     function get_new_list(tough) {
//                         const new_num = []
//                         lang_data.map((data) => {
//                             const get_num = QuestionModule.findOne({ tough: tough, sub_lang: data })
//                             new_num.push(get_num.qno)
//                             const i = parseInt(get_num.qno)
//                             QuestionListmodule.updateOne({ _id: create_data._id }, { $push: { list: i } });
//                         })

//                         const check_10 = QuestionListmodule.findOne({ user }).lean();
//                         if (check_10.list.length < 10) {
//                             const rem = parseInt(balance.balance) + parseInt(fees.rupee);
//                             // Update the user's balance
//                             balance.updateOne({ balance: rem });
//                             return res.status(200).json({ Status: "less_10" });
//                         }


//                     }

//                     if (get_per <= 0) {

//                         QuestionListmodule.updateOne({ _id: create_data._id }, { $set: { list: [] } });
//                         get_new_list("Too Easy")


//                     }
//                     else {
//                         const check_10 = QuestionListmodule.findOne({ user }).lean();
//                         if (check_10.list.length < 10) {
//                             const rem = parseInt(balance.balance) + parseInt(fees.rupee);
//                             // Update the user's balance
//                             balance.updateOne({ balance: rem });
//                             return res.status(200).json({ Status: "les_10" });
//                         }
//                     }
//                 } else {
//                     console.log("User has enough balance");
//                 }
//             } catch (err) {
//                 console.error("Error in main_bal:", err);
//             }
//         }




//         if (balance) {
//             // Check if the user's balance is sufficient to cover the fees
//             if (parseInt(balance.balance) >= parseInt(fees.rupee)) {
//                 // Calculate the remaining balance


//                 const create_data = await QuestionListmodule.findOne({ user }).lean();
//                 if (create_data) {
//                     const QnoList = create_data.oldlist;

//                     const Total_Questions = await QuestionModule.find({ lang: lang_data.lang[0] }).lean();

//                     const sum = Total_Questions.length - 9;
//                     const specificNumbers = [];

//                     for (let i = sum; i > 0; i -= 10) {
//                         specificNumbers.push(i);
//                     }

//                     const Final = specificNumbers.filter(value => !QnoList.includes(value));

//                     if (Final.length <= 0) {
//                         return res.status(200).json({ Status: "BAD" });
//                     }

//                     else {
//                         const rem = parseInt(balance.balance) - parseInt(fees.rupee);

//                         // Update the user's balance
//                         await balance.updateOne({ balance: rem });

//                         // Get the current time

//                         // Create a new start record
//                         await StartValidmodule.create({ Time, user, valid: "yes" });
//                         await Totalusermodule.create({ Time, user });

//                         // Create a new history record
//                         await Historymodule.create({ Time, user, rupee: fees.rupee, type: "Debited", tp: "Rupee" });

//                         const getRandomNumber = () => {
//                             const randomIndex = Math.floor(Math.random() * Final.length);
//                             return Final[randomIndex];
//                         };

//                         const num = getRandomNumber();
//                         await QuestionListmodule.updateOne({ _id: create_data._id }, { $push: { oldlist: num } });
//                         // Clear the 'list' array
//                         await QuestionListmodule.updateOne({ _id: create_data._id }, { $set: { list: [] } });

//                         const two = num + 10;
//                         for (let i = num; i < two; i++) {
//                             await QuestionListmodule.updateOne({ _id: create_data._id }, { $push: { list: i } });
//                         }
//                         main_bal()

//                         return res.status(200).json({ Status: "OK" });
//                     }

//                 } else {

//                     const rem = parseInt(balance.balance) - parseInt(fees.rupee);

//                     // Update the user's balance
//                     await balance.updateOne({ balance: rem });

//                     // Get the current time
//                     // Create a new start record
//                     const ValDat = "yes";
//                     await StartValidmodule.create({ Time, user, valid: ValDat });
//                     await Totalusermodule.create({ Time, user });

//                     // Create a new history record
//                     await Historymodule.create({ Time, user, rupee: fees.rupee, type: "Debited", tp: "Rupee" });

//                     const Question_list = await QuestionListmodule.create({ user, Time, lang: lang_data.lang[0], list: [], oldlist: [] });

//                     const Total_Questions = await QuestionModule.find({ lang: lang_data.lang[0] }).lean();

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


//                     main_bal()

//                     return res.status(200).json({ Status: "OK" });

//                 }

//             } else {

//                 // Send a response indicating low balance
//                 return res.status(200).json({ Status: "Low-Bal" });

//             }

//         } else {

//             // Send a response indicating that the user is not found
//             return res.status(200).json({ Status: "no_us" });

//         }
//     } catch (error) {

//         console.log(error);
//         // Send an error response
//         return res.status(500).json({ message: "Internal Server Error" });

//     }


// });

app.post('/start/playing/by/debit/amount', async (req, res) => {
    const { user } = req.body;
    if (!user) return res.status(400).json({ Status: "s_m", message: "Some Data Missing" });

    try {

        const status = await Start_StopModule.findOne({ user: "kick" });
        
        if (status?.Status === "off") {
            return res.status(200).json({ Status: "Time", message: status.text });
        }



        const lang_data = await LanguageSelectModule.findOne({ user }).lean();
        const balance = await Balancemodule.findOne({ user });
        const fees = await Rupeemodule.findOne({ username: "admin" }).lean();

        if (!lang_data || !lang_data.lang) throw new Error("No language data found");

        if (!balance) return res.status(200).json({ Status: "no_us" });

        const balanceNum = parseInt(balance.balance);
        const feesNum = parseInt(fees.rupee);

        if (balanceNum < feesNum) {
            return res.status(200).json({ Status: "Low-Bal" });
        }

        const Time = new Date().toISOString();
        let create_data = await QuestionListmodule.findOne({ user });

        const Total_Questions = await QuestionModule.find({ lang: lang_data.lang[0] }).lean();
        const totalCount = Total_Questions.length;

        if (totalCount < 10) {
            return res.status(200).json({ Status: "NotEnoughQuestions", message: "Minimum 10 questions required." });
        }


        const specificNumbers = [];
        for (let i = 1; i <= totalCount - 9; i += 10) {
            specificNumbers.push(i);
        }


        // Remove already used question batches
        const QnoList = create_data?.oldlist || [];
        const Final = specificNumbers.filter(value => !QnoList.includes(value));

        if (Final.length <= 0) {
            return res.status(200).json({ Status: "BAD", message: "No unused question batches left." });
        }

        const getRandomNumber = () => Final[Math.floor(Math.random() * Final.length)];
        const num = getRandomNumber();
        const two = num + 10;
        const questionRange = Array.from({ length: 10 }, (_, i) => i + num);

        if (!create_data) {
            create_data = await QuestionListmodule.create({
                user,
                Time,
                lang: lang_data.lang[0],
                list: [],
                oldlist: [],
            });
        }


        // const _to_str_up_rp = balanceNum - feesNum

        const _dec_bal = await Balancemodule.findOne({ user });

        if (_dec_bal) {
            const currentBal = parseInt(_dec_bal.balance);
            const updatedBal = currentBal - feesNum;

            _dec_bal.balance = updatedBal.toString(); // ✅ convert number to string
            await _dec_bal.save();
        }




        await Promise.all([

            StartValidmodule.create({ Time, user, valid: "yes" }),
            Totalusermodule.create({ Time, user }),
            Historymodule.create({ Time, user, rupee: fees.rupee, type: "Debited", tp: "Rupee" }),
            QuestionListmodule.updateOne(
                { _id: create_data._id },
                {
                    $set: { list: questionRange },
                    $push: { oldlist: num },
                }
            )
        ]);



        // ✅ Convert updated balance back to string
        const updatedBal = await Balancemodule.findOne({ user });

        if (typeof updatedBal.balance === "number") {
            await Balancemodule.updateOne(
                { user },
                { $set: { balance: updatedBal.balance.toString() } }
            );
        }

        setImmediate(async () => {
            try {
                const updatedBalance = await Balancemodule.findOne({ user });
                console.log("In")
                if (parseInt(updatedBalance.balance) <= feesNum) {
                    console.log("gate 1")
                    const lang_list = await QuestionModule.distinct("sub_lang");
                    const [won_data, total_play] = await Promise.all([
                        Wonmodule.countDocuments({ user }),
                        Totalusermodule.countDocuments({ user }),
                    ]);

                    const get_per = (won_data / (total_play || 1)) * 100;

                    console.log(get_per)

                    const resetListAndPush = async (toughLevel) => {
                        console.log(`Resetting with questions of toughness: ${toughLevel}`);
                        await QuestionListmodule.updateOne({ _id: create_data._id }, { $set: { list: [] } });

                        for (const data of lang_list) {
                            try {
                                const q = await QuestionModule.findOne({ tough: toughLevel, sub_lang: data });
                                if (q && q.qno != null) {
                                    await QuestionListmodule.updateOne(
                                        { _id: create_data._id },
                                        { $push: { list: parseInt(q.qno) } }
                                    );
                                }
                            } catch (innerErr) {
                                console.error(`Error finding/pushing question for sub_lang ${data}:`, innerErr);
                            }
                        }

                        // const newListData = await QuestionListmodule.findOne({ user }).lean();
                        // console.log(newListData.list)
                        // if (newListData?.list?.length < 10) {
                            
                        //     const bal_dt = await Balancemodule.findOne({user : user})
                        //     const lat = parseInt(bal_dt.balance) + parseInt(fees.rupee)
                        //     bal_dt.balance = lat.toString()
                        //     await bal_dt.save()       
                        //     resetResult = "BAD";
                        //     return "bad"
                        
                        // }
                    };

                    if (get_per <= 0) {
                        console.log("Too Easy")
                        const wt = await resetListAndPush("Too Easy");
                        if(wt === "bad"){
                            return res.status(200).json({Status : "BAD"})
                        }

                    } else if (get_per >= 60) {
                        console.log("Medium")
                        await resetListAndPush("Medium");
                        return res.status(200).json({Status : "BAD"})
                    }



                } else if (parseInt(updatedBalance.balance) >= feesNum) {
                    console.log("gate 2")
                    const lang_list = await QuestionModule.distinct("sub_lang");
                    const [won_data, total_play] = await Promise.all([
                        Wonmodule.countDocuments({ user }),
                        Totalusermodule.countDocuments({ user }),
                    ]);

                    const get_per = (won_data / (total_play || 1)) * 100;

                    console.log(get_per)

                    const resetListAndPush = async (toughLevel) => {
                        console.log(`Resetting with questions of toughness: ${toughLevel}`);
                        await QuestionListmodule.updateOne({ _id: create_data._id }, { $set: { list: [] } });

                        for (const data of lang_list) {
                            try {
                                const q = await QuestionModule.findOne({ tough: toughLevel, sub_lang: data });
                                if (q && q.qno != null) {
                                    await QuestionListmodule.updateOne(
                                        { _id: create_data._id },
                                        { $push: { list: parseInt(q.qno) } }
                                    );
                                }
                            } catch (innerErr) {
                                console.error(`Error finding/pushing question for sub_lang ${data}:`, innerErr);
                            }
                        }

                        // const newListData = await QuestionListmodule.findOne({ user }).lean();
                        // if (newListData?.list?.length < 11) {
                        //     console.log("amount credited")
                        //     const bal_dt = await Balancemodule.findOne({user : user})
                        //     const lat = parseInt(bal_dt.balance) + parseInt(fees.rupee)
                        //     bal_dt.balance = lat.toString()
                        //     await bal_dt.save()       
                        //     resetResult = "BAD";
                        //     console.log("BAD")
                        //     return res.status(200).json({Status : "BAD"})
                        
                        // }
                    };

                    if (get_per <= 0) {
                        console.log("Too Easy")
                        await resetListAndPush("Too Easy");
                    }
                    else if (get_per >= 20) {
                        console.log("Tough")
                        await resetListAndPush("Tough");
                    }
                    else if (get_per >= 40) {
                        console.log("Too Tough")
                        await resetListAndPush("Too Tough");
                    }
                }
            } catch (e) {
                console.error("Error in background logic:", e);
            }
        });

        const newListData = await QuestionListmodule.findOne({ user }).lean();
        if (newListData?.list?.length < 10) {
            console.log("amount credited")
            const bal_dt = await Balancemodule.findOne({user : user})
            const lat = parseInt(bal_dt.balance) + parseInt(fees.rupee)
            bal_dt.balance = lat.toString()
            await bal_dt.save()       
            resetResult = "BAD";
            console.log("BAD")
            return res.status(200).json({Status : "BAD_CR"})
        
        }

        console.log("✅ Finished successfully");
        return res.status(200).json({ Status: "OK" });

    } catch (error) {
        console.error("❌ Main Catch Error:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});


//live server
app.post('/start/playing/by/debit/amount/try', async (req, res) => {
    const { user } = req.body;

    if (!user) {
        return res.status(400).json({ Status: "BAD", message: "Some Data Missing" });
    }

    try {
        const status = await Start_StopModule.findOne({ user: "kick" });

        if (status?.Status === "off") {
            return res.status(200).json({ Status: "Time", message: status.text });
        }

        const lang_data = await LanguageSelectModule.findOne({ user }).lean();
        const balance = await Balancemodule.findOne({ user });
        const fees = await Rupeemodule.findOne({ username: "admin" }).lean();

        async function main_bal() {
            try {
                const get_bal = await Balancemodule.findOne({ user });
                const create_data = await QuestionListmodule.findOne({ user }).lean();

                if (!get_bal || !create_data) return;

                if (parseInt(get_bal.balance) <= parseInt(fees.rupee)) {



                    const lang_data_list = await QuestionModule.distinct("sub_lang");
                    const won_data = await Wonmodule.countDocuments({ user });
                    const total_play = await Totalusermodule.countDocuments({ user });

                    const get_per = total_play === 0 ? 0 : (won_data / total_play) * 100;
                    console.log("Win %:", get_per);

                    async function get_new_list(tough) {
                        for (const data of lang_data_list) {
                            const get_num = await QuestionModule.findOne({ tough, sub_lang: data }).lean();
                            if (get_num) {
                                const qno = parseInt(get_num.qno);
                                await QuestionListmodule.updateOne(
                                    { _id: create_data._id },
                                    { $push: { list: qno } }
                                );
                            }
                        }
                    }

                    if (get_per <= 10) {
                        await QuestionListmodule.updateOne({ _id: create_data._id }, { $set: { list: [] } });
                        await get_new_list("Too Easy");
                        const new_list = await QuestionListmodule.findOne({ user }).lean();
                        if (new_list.oldlist.length < 10) {
                        }
                    }

                } else {
                    // await QuestionListmodule.updateOne({ _id: create_data._id }, { $set: { list: [] } });
                    console.log("User has enough balance");
                }
            } catch (err) {
                console.error("Error in main_bal:", err);
            }
        }

        if (!balance || parseInt(balance.balance) < parseInt(fees.rupee)) {
            return res.status(200).json({ Status: "Low-Bal" });
        }

        const rem = parseInt(balance.balance) - parseInt(fees.rupee);
        await balance.updateOne({ balance: rem });

        const get_my_mn = await My_MoneyModule.findOne({ user: "kick" })

        if (get_my_mn) {
            get_my_mn.balance = parseInt(get_my_mn.balance) + parseInt(fees.rupee)
            await get_my_mn.save()
        } else {
            await My_MoneyModule.create({ Time, user: "kick", balance: fees.rupee })
        }

        const Time = new Date();
        await StartValidmodule.create({ Time, user, valid: "yes" });
        await Totalusermodule.create({ Time, user });
        await Historymodule.create({ Time, user, rupee: fees.rupee, type: "Debited", tp: "Rupee" });

        let create_data = await QuestionListmodule.findOne({ user }).lean();

        const Total_Questions = await QuestionModule.find({ lang: lang_data.lang[0] }).lean();
        const sum = Total_Questions.length - 9;
        const specificNumbers = [];

        for (let i = sum; i > 0; i -= 10) {
            specificNumbers.push(i);
        }

        const getRandomNumber = () => {
            const randomIndex = Math.floor(Math.random() * specificNumbers.length);
            return specificNumbers[randomIndex];
        };

        if (create_data) {
            const QnoList = create_data.oldlist || [];
            const Final = specificNumbers.filter(value => !QnoList.includes(value));

            if (Final.length <= 0) {
                return res.status(200).json({ Status: "BAD" });
            }

            const num = Final.length > 1 ? getRandomNumber() : Final[0];
            await QuestionListmodule.updateOne({ _id: create_data._id }, { $set: { list: [] } });
            await QuestionListmodule.updateOne({ _id: create_data._id }, { $push: { oldlist: num, list: { $each: Array.from({ length: 10 }, (_, i) => num + i) } } });

        } else {
            const Question_list = await QuestionListmodule.create({ user, Time, lang: lang_data.lang[0], list: [], oldlist: [] });

            const num = getRandomNumber();
            await QuestionListmodule.updateOne({ _id: Question_list._id }, {
                $push: {
                    oldlist: num,
                    list: { $each: Array.from({ length: 10 }, (_, i) => num + i) }
                }
            });
        }

        await main_bal();
        return res.status(200).json({ Status: "OK" });

    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});




app.post('/start/playing/by/debit/amount/app', async (req, res) => {
    const { user } = req.body;

    try {
        if (!user) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        const status = await Start_StopModule.findOne({ user: "kick" })
        if (status.Status === "off") {
            return res.status(200).json({ Status: "Time", message: status.text })
        }


        // Find the balance of the user
        const lang_data = await LanguageSelectModule.findOne({ user })
        const balance = await Balancemodule.findOne({ user });
        // Find the fees from the admin user
        const fees = await Rupeemodule.findOne({ username: "admin" }).lean();
        // await StartValidmodule.findOneAndDelete({ user });

        const create_data = await QuestionListmodule.findOne({ user });

        const Total_Questions = await QuestionModule.find({ lang: lang_data.lang[0] });
        if (Total_Questions.length < 9) {
            await lang_data.deleteOne();
            await create_data.deleteOne();
            return res.status(203).json({ Status: "No Language Data Found" })
        }

        if (balance) {
            // Check if the user's balance is sufficient to cover the fees
            if (parseInt(balance.balance) >= parseInt(fees.rupee)) {
                // Calculate the remaining balance



                if (create_data) {
                    const QnoList = create_data.oldlist;



                    const sum = Total_Questions.length - 9;
                    const specificNumbers = [];

                    for (let i = sum; i > 0; i -= 10) {
                        specificNumbers.push(i);
                    }

                    const Final = specificNumbers.filter(value => !QnoList.includes(value));

                    if (Final.length <= 0) {
                        return res.status(202).json({ Status: "BAD" });
                    } else {
                        const rem = parseInt(balance.balance) - parseInt(fees.rupee);

                        // Update the user's balance
                        await balance.updateOne({ balance: rem });

                        // Get the current time

                        // Create a new start record
                        await StartValidmodule.create({ Time, user, valid: "yes" });
                        await Totalusermodule.create({ Time, user });

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
                    await Totalusermodule.create({ Time, user });

                    // Create a new history record
                    await Historymodule.create({ Time, user, rupee: fees.rupee, type: "Debited", tp: "Rupee" });


                    const Question_list = await QuestionListmodule.create({ user, Time, lang: lang_data.lang[0], list: [], oldlist: [] });

                    const Total_Questions = await QuestionModule.find({ lang: lang_data.lang[0] }).lean();

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
                return res.status(201).json({ Status: "Low-Bal" });
            }
        } else {
            // Send a response indicating that the user is not found
            return res.status(209).json({ Status: "BAD" });
        }
    } catch (error) {
        console.log(error);
        // Send an error response
        return res.status(500).json({ message: "Internal Server Error" });
    }
});




app.post("/get/id/to/update/seonds", authMiddleware, async (req, res) => {
    const { id, user, sec, qst, a, b, c, d, img, ans, usa, vr, msg, ex_seconds, cat, tough } = req.body;

    try {
       await ReportSecondModule.create({
                Time, // or your custom time
                user,
                qst : qst,
                ans: ans,
                a: a,
                b: b,
                c: c,
                d: d,
                seconds: sec,
                img: img,
                usa : usa,
                vr : vr,
                msg : msg,
                text : "pro",
                exp_sec : ex_seconds, 
                cat,
                tough,
            });

        console.log("OK Created")

        return res.status(200).json({ Status: "OK" });

        // If no matching record, return BAD (or handle differently)
        return res.status(200).json({ Status: "BAD" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


app.get("/get/data/ticket", authMiddleware, async (req, res) => {
    try {
        const userId = req.user._id; // ಅಥವಾ req.user.id — ನಿನ್ನ middleware ಮೇಲೆ depend ಆಗಿರುತ್ತೆ

        const data = await ReportSecondModule.find({ userId }); 
        // find({ userId: userId }) same

        if (data && data.length > 0) {
            return res.status(200).json({ data: data.reverse() });
        } else {
            return res.status(404).json({ status: "NO_DATA_FOUND" });
        }

    } catch (error) {
        console.error("Error fetching ticket data:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


app.get("/get/all/tickets/data/admin", adminMiddleware, async (req, res) =>{
    try{
        const data = await ReportSecondModule.find({})

        if(data){
            return res.status(200).json({data})
        }else{
            return res.status(200).json({Status : "BAD"})
        }
    }catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})



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


// app.post("/get/id/to/update/seconds", authMiddleware, async (req, res) => {
//     const { id, second, user } = req.body;

//     try {
//         // Get question data
//         const data = await QuestionModule.findById(id);
//         if (!data) {
//             return res.status(200).json({ Status: "BAD" });
//         }

//         // Find matching seconds document
//         const sec_data = await Seconds_Module.findOne({
//             category: data.sub_lang,
//             Tough: data.tough
//         });

//         // Allowed time = question's base seconds + 3 buffer
//         const exp_sec = parseInt(data.seconds) + 3;
//         if (parseInt(second) <= exp_sec) {
//             return res.status(200).json({ Status: "OK" });
//         }

//         // If no record exists, create it
//         if (!sec_data) {
//             await Seconds_Module.create({
//                 Time: new Date().toISOString(), // or whatever your 'Time' is
//                 category: data.sub_lang,
//                 Tough: data.tough,
//                 ex_seconds: [second],
//                 seconds: [
//                     {
//                         user: user,
//                         seconds: second
//                     }
//                 ]
//             });
//             consol
//             return res.status(200).json({ Status: "OK" });
//         }

//         // If record exists, check if this user already has an entry
//         const existingUser = sec_data.seconds.find(s => s.user === user);

//         if (!existingUser) {
//             sec_data.seconds.push({ user, seconds: second });
//         } else {
//             existingUser.seconds = second; // Or update logic if needed
//         }

//         // Add to ex_seconds
//         sec_data.ex_seconds.push(second);

//         // Save changes
//         await sec_data.save();

//         return res.status(200).json({ Status: "OK" });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// });







app.delete("/delete/by/user/id/for/valid/data", authMiddleware, async (req, res) => {
    const user = req.user;

    try {
        if (!user) return res.status(400).json({ Status: 400, message: "Some Data Missing" })

        const data = await StartValidmodule.findOne({ user });

        if (data) {
            await data.deleteOne();
            return res.status(200).json({ Status: "OK" })
        } else {
            return res.status(200).json({ Status: "BAD" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

app.get("/admin/get/all/users/data/logined", adminMiddleware, async (req, res) => {
    
    try {
        // Fetch all records from StartValidmodule
        const records = await StartValidmodule.find({}).lean();

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
    img: String,
    Questio: String,
    qno: String,
    a: String,
    b: String,
    c: String,
    d: String,
    Ans: String,
    lang: String,
    tough: String,
    seconds: String,
    sub_lang: {
        default: "",
        type: String
    },

    yes: {
        default: "",
        type: []
    },
    no: {
        default: "",
        type: []
    }

}, { timestamps: true });

const QuestionModule = mongoose.model('Qno_Count', QnoSchema);

app.post("/get/posted/count/questions", async (req, res) => {
    const { user, img, Questio, a, b, c, d, Ans, lang, tough, seconds } = req.body;

    try {
        if (!user && !img && !Questio && !a && !b && !c && !d && !Ans && !lang && !tough && !seconds) return res.status(400).json({
            Status: "BAD",
            message: "Some Data Missing"
        })
        const Qno_length = await QuestionModule.find({ lang }).lean()
        const hash = Ans.trim().toLowerCase();
        await QuestionModule.create({ Time, user, img, Questio, qno: Qno_length.length + 1, a, b, c, d, Ans: hash, lang, tough, seconds })
        return res.status(200).json({ Status: "OK", qno: Qno_length.length + 1 })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})



// app.get("/get/question/no/by/user/name/:user", authMiddleware, async (req, res) => {
//     const user = req.params.user;
//     try {

//         if (!user) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })


//         // Fetch the user's validity status from StartValidmodule
//         const Data = await StartValidmodule.findOne({ user }).lean();
//         // Fetch the user's question list from QuestionListmodule
//         const Get_Qno_info = await QuestionListmodule.findOne({ user }).lean();

//         // Check if the user is valid and has a question list
//         if (Data && Data.valid === "yes") {
//             if (Get_Qno_info && Get_Qno_info.list.length > 0) {
//                 // Get the first question number from the list
//                 const QNO = Get_Qno_info.list[0];

//                 // Find the question in QuestionModule by its number and language
//                 const Qno = await QuestionModule.findOne({ qno: QNO, lang: Get_Qno_info.lang }).lean();

//                 const cal_sec = await Seconds_Module.findOne({
//                     category: Qno.sub_lang,
//                     Tough : Qno.tough,
//                     "seconds.user" : user 
//                 });


//                 let sec_cal = ''

//                 if(cal_sec){
//                     sec_cal = cal_sec.seconds
//                 }else {
//                     sec_cal = Qno.seconds
//                 }


//                 if (Qno) {
//                     // Construct the response data
//                     const data = {
//                         _id: Qno._id,
//                         img: Qno.img,
//                         Question: Qno.Questio,
//                         Qno: Get_Qno_info.list.length - 1, // Calculates the position of the question
//                         a: Qno.a,
//                         b: Qno.b,
//                         c: Qno.c,
//                         d: Qno.d,
//                         seconds: sec_cal,
//                         Ans : Qno.Ans
//                     };
//                     console.log(data)

//                     return res.status(200).json({ data });
//                 } else {
//                     return res.status(404).json({ Status: "BAD" });
//                 }
//             } else {
//                 return res.status(202).json({ Status: "BAD" });
//             }
//         } else {
//             return res.status(202).json({ Status: "BAD" });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// });


app.get("/get/question/no/by/user/name", authMiddleware, async (req, res) => {
    const user = req.user;
    try {

        if (!user) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })


        // Fetch the user's validity status from StartValidmodule
        const Data = await StartValidmodule.findOne({ user }).lean();
        // Fetch the user's question list from QuestionListmodule
        const Get_Qno_info = await QuestionListmodule.findOne({ user }).lean();

        // Check if the user is valid and has a question list
        if (Data && Data.valid === "yes") {
            if (Get_Qno_info && Get_Qno_info.list.length > 0) {
                // Get the first question number from the list
                const QNO = Get_Qno_info.list[0];

                // Find the question in QuestionModule by its number and language
                const Qno = await QuestionModule.findOne({ qno: QNO, lang: Get_Qno_info.lang }).lean();

                const cal_sec = await Seconds_Module.findOne(
                    {
                        category: Qno.sub_lang,
                        Tough: Qno.tough,
                        "seconds.user": user
                    },
                    {
                        "seconds.$": 1 // project only the matching array element
                    }
                );

                // console.log(cal_sec.seconds)

                let sec_cal = '';


                if (cal_sec && cal_sec.seconds && cal_sec.seconds.length > 0) {
                    sec_cal = cal_sec.seconds[0].seconds; // get the actual seconds value for that user
                } else {
                    sec_cal = Qno.seconds; // fallback to default question seconds
                }



                if (Qno) {
                    // Construct the response data
                    const data = {
                        _id: Qno._id,
                        img: Qno.img,
                        Question: Qno.Questio,
                        Qno: Get_Qno_info.list.length - 1, // Calculates the position of the question
                        a: Qno.a,
                        b: Qno.b,
                        c: Qno.c,
                        d: Qno.d,
                        seconds: sec_cal,
                        Ans : Qno.Ans,
                        cat : Qno.sub_lang,
                        tough : Qno.tough
                    };
                    console.log(data)

                    return res.status(200).json({ data });
                } else {
                    return res.status(404).json({ Status: "BAD" });
                }
            } else {
                return res.status(202).json({ Status: "BAD" });
            }
        } else {
            return res.status(202).json({ Status: "BAD" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


const WonSchema = new mongoose.Schema({
    Time: String,
    user: String,
    no: String,
    ID: String
}, { timestamps: true });

const Wonmodule = mongoose.model('Won', WonSchema);

const Seconds_cal_Schema = new mongoose.Schema({
    Time: String,
    category: String,
    Tough : String,
    seconds : [
        {
            user : String,
            seconds : String,
        }
    ],
    ex_seconds : []
}, { timestamps: true });

const Seconds_Module = mongoose.model('Seconds_cal', Seconds_cal_Schema);


app.post('/verify/answer/question/number', authMiddleware, async (req, res) => {
    const { answer, user, id, seconds, Ans } = req.body;
    
    try {



        if (!answer && !user && !id) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })


        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid ObjectId format" });
        }


        function compareHash(plainText, hash) {
            const plainHash = crypto
                .createHash('sha256')
                .update(plainText)
                .digest('hex');
            
            return plainHash === hash;
        }

        
        const hashedPlain = crypto
            .createHash('sha256')
            .update(answer)
            .digest('hex');

        const check_ans = compareHash(answer, Ans)

        const Answer_Verify = await QuestionModule.findById({ _id: id })
        const User_List = await QuestionListmodule.findOne({ user })

        console.log(check_ans)

        if (check_ans) {
            const get_t_data = await Seconds_Module.findOne({category : Answer_Verify.sub_lang, Tough : Answer_Verify.tough})
            
            if(get_t_data){

                const gt_ud = get_t_data.seconds.find(s => s.user === user);

                if(!gt_ud){
                    await Seconds_Module.updateOne(
                        { category: Answer_Verify.sub_lang, Tough: Answer_Verify.tough }, // match condition
                        {
                            $push: {
                                seconds: { user: user, seconds: seconds }, // push into nested objects array
                                ex_seconds: seconds                        // push into normal array
                            }
                        }
                    );

                }
                

                
            }else{
                // await Seconds_Module.create({Time, category : Answer_Verify.sub_lang, Tough : Answer_Verify.tough, seconds })
                await Seconds_Module.create({
                Time,
                category : Answer_Verify.sub_lang,
                Tough : Answer_Verify.tough,
                seconds : [
                    {
                        seconds : seconds,
                        user : user,
                    }
                ],
                ex_seconds : seconds

            })
            }

            if (User_List.list.length === 1 || User_List.list.length === 0) {
                await User_List.updateOne({ $pull: { list: User_List.list[0] } })
                const won = await Wonmodule.find({})
                const CuponDat = await Cuponmodule.findOne({ no: won.length + 1 })
                if (CuponDat) {
                    await Wonmodule.create({ Time, user, no: won.length + 1, ID: CuponDat._id })

                    await Mycoinsmodule.create({
                        Time: Time,
                        title: CuponDat.title,
                        img: CuponDat.img,
                        user: user,
                        type: CuponDat.type,
                        stars: "No",
                        body: CuponDat.body,
                        valid: CuponDat.valid
                    })
                    //ki1931ck add code here
                    const rank = toString(won.length + 1)
                    await Answer_Verify.updateOne({ $push: { yes: user } })
                    return res.status(200).json({ Status: "OKK", id: CuponDat._id, rank: rank });



                } else {


                    await Wonmodule.create({ Time, user, no: won.length + 1, ID: "stars" })
                    const get_prize_list1 = await StarBalmodule.findOne({ user })

                    const starsValues = [];
                    const pushData = await StarsCountmodule.find({})
                    pushData.map((users) => {
                        starsValues.push(users.stars)
                    })


                    // const sum = parseInt(get_prize_list1.balance) + parseInt(get_count_data.stars)

                    if (get_prize_list1) {
                        for (const stars of starsValues) {
                            const get_count_data = await StarsCountmodule.findOne({ stars }).lean();

                            if (parseInt(get_count_data.count) >= parseInt(won.length + 1)) {
                                await get_prize_list1.updateOne({ balance: parseInt(get_prize_list1.balance) + parseInt(get_count_data.stars) })
                                await Historymodule.create({ Time, user, rupee: get_count_data.stars, type: "Credited", tp: "Stars" });
                                const rank = toString(won.length + 1)
                                await Answer_Verify.updateOne({ $push: { yes: user } })
                                return res.status(200).json({ Status: "STARS", stars: get_count_data.stars, rank: rank });

                            }
                        }

                    } else {
                        for (const stars of starsValues) {
                            const get_count_data = await StarsCountmodule.findOne({ stars }).lean();

                            if (parseInt(get_count_data.count) >= parseInt(won.length + 1)) {
                                await StarBalmodule.create({ Time, user: user, balance: get_count_data.stars });
                                await Historymodule.create({ Time, user, rupee: get_count_data.stars, type: "Credited", tp: "Stars" });
                                const rank = toString(won.length + 1)
                                await Answer_Verify.updateOne({ $push: { yes: user } })
                                return res.status(200).json({ Status: "STARS", stars: get_count_data.stars, rank: rank });

                            }
                        }

                        // await StarBalmodule.create({Time, user : user, balance : get_count_data.stars});
                        // await Historymodule.create({Time, user, rupee : get_count_data.stars, type : "Credited", tp : "Stars"});
                        // return res.status(200).json({Status : "STARS", stars : get_count_data.stars});


                    }

                }



            } else {
                await User_List.updateOne({ $pull: { list: User_List.list[0] } })
                //ki1931ck add code here
                await Answer_Verify.updateOne({ $push: { yes: user } })
                return res.status(200).json({ Status: "OK" })

            }

        } else {
            await Answer_Verify.updateOne({ $push: { no: user } })
            //make this if answer is false make verified is fale or no to throught the user out from playing
            return res.status(200).json({ Status: "BAD" })

        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})



const CuponSchema = new mongoose.Schema({
    Time: String,
    title: String,
    img: String,
    valid: String,
    body: String,
    type: String,
    user: String,
    no: String
}, { timestamps: true });

const Cuponmodule = mongoose.model('Cupon_s', CuponSchema);



app.post("/get/new/cupon/for/neww/cupon", async (req, res) => {
    const { title, img, valid, body, type, user } = req.body;
    try {
        if (!title && !img && !valid && !body && !type && !user) return res.status(200).json({ Status: "BAD", message: "Some Data Missing" })

        const data = await Cuponmodule.find({}).lean()
        if (data) {
            await Cuponmodule.create({ Time, title, img, valid, body, type, user, no: data.length + 1 })
            return res.status(200).json({ Status: "OK" })
        } else {
            return res.status(200).json({ Status: "BAD" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})



app.get("/get/cupon/get/all/datas", async (req, res) => {
    try {
        const data = await Cuponmodule.find({}).lean();
        if (data) {
            return res.status(200).json({ data });
        } else {
            return res.status(200).json({ Status: "BAD" });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

app.delete("/delete/cupon/s/by/id/:id", async (req, res) => {
    const id = req.params.id

    try {

        if (!id) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid ObjectId format" });
        }

        const user = await Cuponmodule.findById({ _id: id })

        if (user) {
            await user.deleteOne()
            return res.status(200).json({ Status: "OK" })
        } else {
            return res.status(200).json({ Status: "BAD" })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})



app.get("/get/coin/cupons/sds/by/id/:id", async (req, res) => {
    const id = req.params.id;
    try {

        if (!id) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid ObjectId format" });
        }

        const won = await Cuponmodule.findById({ _id: id }).lean()
        if (won) {
            return res.status(200).json({ data: won })
        } else {
            return res.status(200).json({ Status: "BAD" })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

const TotalUserSchema = new mongoose.Schema({
    Time: String,
    user: String,
}, { timestamps: true });

const Totalusermodule = mongoose.model('Total_Users', TotalUserSchema);

app.get("/get/aal/tottttal/users", adminMiddleware, async (req, res) => {
    try {
        const users = await Totalusermodule.find({}).lean();
        if (users) {
            return res.status(200).json({ users });
        } else {
            return res.status(200).json({ Status: "BAD" })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


app.get("/get/total/users/by/winners/datas/all/one", async (req, res) => {
    try {
        // Fetch all users who are marked as winners
        const users = await Wonmodule.find({}).lean();

        if (users) {
            return res.status(200).json({ users });
        } else {
            return res.status(200).json({ Status: "BAD" })
        }

        // Return the list of users

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get("/get/total/users/by/winners/datas/all", adminMiddleware, async (req, res) => {
    try {
        // Fetch all users who are marked as winners
        const users = await Wonmodule.find({}).lean();
        if (users) {
            return res.status(200).json({ users });
        } else {
            return res.status(200).json({ Status: "BAD" })
        }

        // Return the list of users

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get("/get/singel/user/won/data/:no", async (req, res) => {
    const no = req.params.no;
    try {
        if (!no) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        const user_data = await Wonmodule.findOne({ no: no }).lean()
        if (user_data) {
            const iinfo_data = await Usermodule.findOne({ _id: user_data.user }).lean()
            const data = {
                username: iinfo_data.username
            }
            return res.status(200).json({ data })
        } else {
            return res.status(200).json({ Status: "NO" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


app.get("/users/name/and/more/get/:id", authMiddleware, async (req, res) => {
    const id = req.params.id;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid ObjectId format" });
        }

        const user = await Usermodule.findById({ _id: id }).lean();
        if (user) {

            const data = {
                username: user.username,
                name: user.name,
                email: user.email
            }

            return res.status(200).json({ data })

        }
        else {
            return res.status(200).json({ Status: "BAD" })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


app.get('/exact/time/by/new', async (req, res) => {
    try {
        const now = new Date();

        // Extract year, month, and day
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
        const day = now.getDate().toString().padStart(2, '0');

        // Format the date as "YYYY-MM-DD"
        const formattedDate = `${year}-${month}-${day}`;

        return res.status(200).json({ formattedDate })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})




const Chart_LineSchema = new mongoose.Schema({
    Time: String,
    len: String,
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

app.get("/get/data/for/linechart/01", async (req, res) => {
    try {
        const data = await ChartLinemodule.find({}).lean();
        if (data) {
            return res.status(200).json({ data })
        } else {
            return res.status(200).json({ Status: "BAD" })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

app.get('/get/admin/all/question/lists/:lang', adminMiddleware, async (req, res) => {
    const lang = req.params.lang;
    try {
        if (!lang) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        const data = await QuestionModule.find({ lang }).lean();

        if (data) {
            return res.status(200).json({ data })
        } else {
            return res.status(200).json({ Status: "BAD" })
        }

    } catch (error) {
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
    try {

        if (!stars && !count) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        const get_data = await StarsCountmodule.findOne({ stars: stars }).lean();
        if (get_data) {
            // Update the count for the found document
            await StarsCountmodule.updateOne(
                { stars: stars },
                { $set: { count: count, Time } }
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



app.get("/stars/get/all/data/by/stars", async (req, res) => {
    try {
        const data = await StarsCountmodule.find({}).lean();
        if (data) {
            return res.status(200).json({ data })
        } else {
            return res.status(200).json({ Status: "BAD" })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

app.get("/trial/get/data/:data", async (req, res) => {
    const data = parseInt(req.params.data);

    try {

        if (!data) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" });

        const starsValues = ["6", "5", "4", "3", "2", "1"];

        for (const stars of starsValues) {
            const get_count_data = await StarsCountmodule.findOne({ stars }).lean();

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

app.post("/post/utr/ids/by/admin", async (req, res) => {
    const { utr } = req.body;

    try {

        if (!user) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        const user = await UTRmodule.findOne({ UTR: utr }).lean()

        if (user) {
            return res.status(200).json({ Status: "BAD" })
        } else {
            await UTRmodule.create({ Time, UTR: utr })
            return res.status(200).json({ Status: "OK" })
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


app.get('/question/one/by/:no/:lang', async (req, res) => {
    try {

        if (!req.params.lang && !req.params.no) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        // Use findOne to search for a question by both 'lang' and 'qno'
        const question = await QuestionModule.findOne({ lang: req.params.lang, qno: req.params.no }).lean();

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
    lang: [],
    user: String
}, { timestamps: true });

const LanguageSelectModule = mongoose.model('Language_select', Lang_SelSchema);


app.post('/get/language/datas/all', async (req, res) => {
    const { lang, user } = req.body;

    try {

        if (!lang && !user) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        const Users = await LanguageSelectModule.findOne({ user }).lean();
        if (!Users) {
            await LanguageSelectModule.create({ lang, user, Time })
            return res.status(200).json({ Status: "OK" });
        } else {
            return res.status(200).json({ Status: "IN" });
        }
    }
    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});



app.get("/get/language/datas/all/get/:user", async (req, res) => {
    const user = req.params.user;
    try {
        if (!user) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })
        const Users = await LanguageSelectModule.findOne({ user }).lean()
        if (Users) {
            return res.status(200).json({ Users })
        } else {
            return res.status(201).json({ Status: "IN" })
        }
    }

    catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

})



app.delete('/get/language/datas/all/get/and/delete', authMiddleware , async (req, res) => {
    const user = req.user;
    try {
        if (!user) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        const Users = await LanguageSelectModule.findOne({ user })
        if (Users) {
            await Users.deleteOne();
            return res.status(200).json({ Status: "OK" })
        } else {
            return res.status(200).json({ Status: "BAD" })
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
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



app.delete('/delete/unwanted/questions/:id', async (req, res) => {
    const id = req.params.id


    try {
        if (!id) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid ObjectId format" });
        }

        await QuestionModule.findByIdAndDelete({ id })
        return res.status(200).json({ Status: "OK" })
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

app.get('/get/languages/data/with/questions', authMiddleware, async (req, res) => {
    const user = req.user;
    try {

        if (!user) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        const users = await LanguageSelectModule.findOne({ user: user }).lean();

        if (!users) {
            return res.status(404).json({ Status: "BAD", message: "User not found" });
        }

        const data = users.lang; // The list of languages the user has selected

        // Find questions related to the user's selected languages
        const selQue = await QuestionModule.find({
            lang: { $in: data }
        }).lean();

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
        if (!lang) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

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

app.get("/get/all/admin/new/languages/data", adminMiddleware, async (req, res) => {
    try {
        const DataFind = await AllLanguagemodule.findOne({}).lean();
        if (DataFind) {
            const Data = DataFind.lang
            return res.status(200).json({ Data });
        } else {
            return res.status(200).json({ Status: "BAD" });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

app.get("/get/all/admin/new/languages/data/user", authMiddleware, async (req, res) => {
    try {
        const DataFind = await AllLanguagemodule.findOne({}).lean();
        if (DataFind) {
            const Data = DataFind.lang
            return res.status(200).json({ Data });
        } else {
            return res.status(201).json({ Status: "BAD" });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})




app.delete("/delete/all/selected/data/with/onley/one/:lang", async (req, res) => {
    const lang = req.params.lang;
    try {
        if (!lang) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        const data = await AllLanguagemodule.findOne({ lang: lang })
        if (data) {
            await data.updateOne({ $pull: { lang: lang } })
            return res.status(200).json({ Status: "OK" })
        } else {
            return res.status(200).json({ Status: "BAD" })
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})



const Payment_History_Schema = new mongoose.Schema({
    Time: String,  // Use Date for Time field
    rupee: String,
    tr_id: { type: String, unique: true },
    user: String,
    added: { type: String, default: "No" }
}, { timestamps: true });

const payment_Module = mongoose.model('Payment_module', Payment_History_Schema);


const razorpay = new Razorpay({
    key_id: "rzp_live_J6nOYKPF6WZxFj", // Replace with your Key ID
    key_secret: "k7ZQ10G2vSdP3vilTZ83a4GS", // Replace with your Key Secret
});


app.post("/create-order", async (req, res) => {
    const { user, amt } = req.body;

    if (!user) {
        return res.status(400).json({ success: false, message: "User info is required." });
    }

    const razorpay = new Razorpay({
        key_id: "rzp_live_J6nOYKPF6WZxFj", // Replace with your Key ID
        key_secret: "k7ZQ10G2vSdP3vilTZ83a4GS", // Replace with your Key Secret
    });


    try {
        // const fees = await Rupeemodule.findOne({ username: "admin" });

        if (!amt) {
            return res.status(404).json({ success: false, message: "Admin fee not found." });
        }


        const order = await razorpay.orders.create({
            amount: parseInt(amt) * 100, // Convert ₹ to paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
            notes: { user },
        });

        console.log("Created Razorpay Order:", order);

        return res.json({ success: true, order });
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        return res.status(500).json({ success: false, error: error.message });
    }
});




// app.post(
//   "/razorpay/webhook",
//   express.raw({ type: "application/json" }), // 👈 ensures req.body is Buffer
//   async (req, res) => {
//     const secret = "k7ZQ10G2vSdP3vilTZ83a4GS";
//     const signature = req.headers["x-razorpay-signature"];

//     try {
//       const rawBodyBuffer = req.body;

//       if (!Buffer.isBuffer(rawBodyBuffer)) {
//         throw new Error("Invalid raw body: not a Buffer");
//       }

//       // ✅ HMAC signature generation
//       const expectedSignature = crypto
//         .createHmac("sha256", secret)
//         .update(rawBodyBuffer) // must be a Buffer or string
//         .digest("hex");

//       if (expectedSignature !== signature) {
//         console.log("❌ Invalid signature");
//         return res.status(400).json({ success: false, message: "Invalid signature" });
//       }

//       // ✅ Parse JSON after signature verified
//       const data = JSON.parse(rawBodyBuffer.toString("utf8"));
//       const payment = data?.payload?.payment?.entity;

//       if (!payment || payment.status !== "captured") {
//         console.log("❗ Payment not captured or missing");
//         return res.status(200).json({ success: false });
//       }

//       const user = payment.notes?.user;
//       if (!user) {
//         console.log("⚠️ User missing in notes");
//         return res.status(400).json({ success: false, message: "User not found in notes" });
//       }

//       // ✅ Proceed with DB updates...
//       const fees = await Rupeemodule.findOne({ username: "admin" });
//       const userData = await Balancemodule.findOne({ user });

//       if (!userData) {
//         return res.status(404).json({ success: false, message: "User not found" });
//       }

//       const creditAmount = parseInt(fees?.rupee || "0");
//       userData.balance += creditAmount;
//       await userData.save();

//       await Historymodule.create({
//         Time: new Date().toISOString(),
//         user,
//         rupee: creditAmount,
//         type: "Credited",
//         tp: "Rupee",
//       });

//       console.log(`✅ Credited ₹${creditAmount} to user: ${user}`);
//       return res.status(200).json({ success: true });
//     } catch (err) {
//       console.error("❌ Webhook processing error:", err);
//       return res.status(500).json({ success: false });
//     }
//   }
// );


// Route to create an order






// app.post("/create-order", async (req, res) => {
//     try {
//         const { amount, currency } = req.body;

//         const fees = await Rupeemodule.findOne({ username: "admin" });

//         const options = {
//             amount: fees.rupee * 100, // Amount in smallest currency unit (e.g., paise for INR)
//             currency: currency || "INR",
//         };



//         const order = await razorpay.orders.create(options);

//         console.log(order)
//         res.status(200).json({ success: true, order });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// });

// Route to verify payment
// app.post("/verify-payment", async (req, res) => {
//     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, user } = req.body;

//     try {
//         const crypto = require("crypto");
//         const hmac = crypto.createHmac("sha256", "k7ZQ10G2vSdP3vilTZ83a4GS");

//         const fees = await Rupeemodule.findOne({ username: "admin" });

//         hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
//         const generatedSignature = hmac.digest("hex");

//         if (generatedSignature === razorpay_signature) {
//             const data = await Balancemodule.findOne({ user: user })
//             if (data) {
//                 sum = parseInt(fees.rupee) + parseInt(data.balance)
//                 data.balance = sum
//                 await data.save()
//                 await Historymodule.create({ Time, user, rupee: fees.rupee, type: "Credited", tp: "Rupee" });
//                 res.status(200).json({ success: true, message: "Payment verified successfully" });
//             } else {
//                 return res.status(202).json({ Status: "NO" });
//             }
//         } else {
//             res.status(400).json({ success: false, message: "Payment verification failed" });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }


// });



// app.post("/verify/and/add/user/data/to/ac", authMiddleware, async (req, res) => {
//     try {
//         const { user } = req.body;

//         if (!user) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

//         const fees = await Rupeemodule.findOne({ username: "admin" }).lean();

//         const data = await Balancemodule.findOne({ user: user })
//         if (data) {
//             sum = parseInt(fees.rupee) + parseInt(data.balance)
//             data.balance = sum
//             await data.save()
//             await Historymodule.create({ Time, user, rupee: fees.rupee, type: "Credited", tp: "Rupee" });
//             res.status(200).json({ Status: "OK", message: "Payment verified successfully", rs: fees.rupee });
//         } else {
//             return res.status(202).json({ Status: "NO" });
//         }
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ message: "Internal Server Error" });
//     }
// })



// Route to verify payment





app.post("/verify-payment", async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, user } = req.body;

    try {
        const crypto = require("crypto");
        const hmac = crypto.createHmac("sha256", "k7ZQ10G2vSdP3vilTZ83a4GS");

        const fees = await Rupeemodule.findOne({ username: "admin" });

        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        const generatedSignature = hmac.digest("hex");

        console.log(generatedSignature + " : " + razorpay_signature)

        if (generatedSignature === razorpay_signature) {
            const data = await Balancemodule.findOne({ user: user })
            if (data) {
                sum = parseInt(fees.rupee) + parseInt(data.balance)
                data.balance = sum
                await data.save()
                await Historymodule.create({ Time, user, rupee: fees.rupee, type: "Credited", tp: "Rupee" });
                res.status(200).json({ success: true, message: "Payment verified successfully" });
            } else {
                return res.status(202).json({ Status: "NO" });
            }
        } else {
            res.status(400).json({ success: false, message: "Payment verification failed" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }


});



// // RAW body middleware for webhook
// app.post("/razorpay/webhook", express.raw({ type: "application/json" }), async (req, res) => {
//   const secret = "dp793tI70CWW7hRlzNklvbKt"; // Razorpay Secret Key
//   const signature = req.headers["x-razorpay-signature"];

//   const generated_signature = crypto
//     .createHmac("sha256", secret)
//     .update(req.body)
//     .digest("hex");

//   if (signature === generated_signature) {
//     try {
//       const payload = JSON.parse(req.body);
//       const payment = payload.payload?.payment?.entity;

//       if (payment && payment.status === "captured") {
//         const razorpay_order_id = payment.order_id;
//         const razorpay_payment_id = payment.id;
//         const amount = payment.amount; // in paise

//         // 👇 Pull user from payment.notes.user (if you set it during order creation)
//         const user = payment.notes?.user;
//         if (!user) return res.status(400).json({ error: "User info missing in notes" });

//         const fees = await Rupeemodule.findOne({ username: "admin" });
//         const data = await Balancemodule.findOne({ user });

//         if (data) {
//           const sum = parseInt(fees.rupee) + parseInt(data.balance);
//           data.balance = sum;
//           await data.save();

//           await Historymodule.create({
//             Time: new Date().toISOString(),
//             user,
//             rupee: fees.rupee,
//             type: "Credited",
//             tp: "Rupee"
//           });

//           console.log(`✅ Webhook payment success for user: ${user}`);
//           return res.status(200).json({ success : true });
//         } else {
//           console.log("⚠️ User balance data not found");
//           return res.status(404).json({ error: "User balance not found" });
//         }
//       } else {
//         return res.status(200).json({ message: "Payment not captured or invalid" });
//       }
//     } catch (error) {
//       console.error("Webhook Error:", error);
//       return res.status(500).json({ error: "Webhook processing failed" });
//     }
//   } else {
//     console.log("❌ Invalid webhook signature");
//     return res.status(400).json({ error: "Invalid signature" });
//   }
// });


// Important: register this BEFORE any other body-parser (like express.json())
















// app.post("/razorpay/webhook", async (req, res) => {
//   const secret = "dp793tI70CWW7hRlzNklvbKt"; // Razorpay Secret Key
//   const signature = req.headers["x-razorpay-signature"];

//   try {
//     const generated_signature = crypto
//       .createHmac("sha256", secret)
//       .update(req.rawBody) // ✅ Use raw body for signature
//       .digest("hex");

//     if (signature !== generated_signature) {
//       console.log("❌ Invalid webhook signature");
//       return res.status(400).json({ success: false, error: "Invalid signature" });
//     }

//     const payment = req.body?.payload?.payment?.entity;

//     if (!payment || payment.status !== "captured") {
//       return res.status(200).json({ success: false, message: "Payment not captured or invalid" });
//     }

//     const razorpay_order_id = payment.order_id;
//     const razorpay_payment_id = payment.id;
//     const amount = payment.amount;

//     const user = payment.notes?.user;
//     if (!user) {
//       console.log("⚠️ User info missing in Razorpay notes");
//       return res.status(400).json({ success: false, error: "User info missing in notes" });
//     }

//     const fees = await Rupeemodule.findOne({ username: "admin" });
//     const data = await Balancemodule.findOne({ user });

//     if (!data) {
//       console.log("⚠️ User balance data not found");
//       return res.status(404).json({ success: false, error: "User balance not found" });
//     }

//     const sum = parseInt(fees.rupee) + parseInt(data.balance);
//     data.balance = sum;
//     await data.save();

//     await Historymodule.create({
//       Time: new Date().toISOString(),
//       user,
//       rupee: fees.rupee,
//       type: "Credited",
//       tp: "Rupee"
//     });

//     console.log(`✅ Webhook payment success for user: ${user}`);
//     return res.status(200).json({ success: true, message: "Balance credited" });

//   } catch (error) {
//     console.error("Webhook processing error:", error);
//     return res.status(500).json({ success: false, error: "Internal server error" });
//   }
// });



const user_login_admin_Schema = new mongoose.Schema({
    Time: String,
    username: String,
    password: String,
    language: String,
    email: String
}, { timestamps: true });

const Employeloginmodule = mongoose.model('Employes_data', user_login_admin_Schema);


const users_otpSchema = new mongoose.Schema({
    Time: String,
    username: String,
    otp: String
}, { timestamps: true });

const Employeotpmodule = mongoose.model('Employes_otp', users_otpSchema);


app.post("/get/employe/login/data/create/new", async (req, res) => {
    const { username, password, email, language } = req.body;
    try {
        if (!username && !password && !email && !language) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        const findDocu = await Employeloginmodule.findOne({ username }).lean();
        if (!findDocu) {
            const hash = await bcrypt.hash(password, 10);
            await Employeloginmodule.create({ Time, username, email, password: hash, language })
            return res.status(200).json({ Status: "OK" })
        } else {
            return res.status(200).json({ Status: "IN" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

app.get('/get/all/total/users/data/from/admins/super', adminMiddleware, async (req, res) => {
    try {
        const user = await Employeloginmodule.find({}).lean();
        const data = user.map(dat => ({
            user: dat.username,
            email: dat.email,
            lang: dat.language
        }))
        return res.json({ data })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

app.post('/get/and/login/users/admin/pages/auth', async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username && !password) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        const OTP = generateOTP()
        const find_One = await Employeloginmodule.findOne({ username }).lean();
        if (find_One) {
            const isMatch = await bcrypt.compare(password, find_One.password);
            const inorno = await Employeotpmodule.findOne({ username });
            if (isMatch) {
                if (inorno) {
                    await inorno.deleteOne()
                }
                const data = await Employeotpmodule.create({ Time, username, otp: OTP })


                let mailOptions = {
                    from: 'stawropuzzle@gmail.com', // Sender address
                    to: `${find_One.email}`, // List of recipients
                    subject: `stawro, Admin Login OTP`, // Subject line
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
                                    <strong>stawro</strong>
                                </div>
                                <div class="email-cnt-02">
                                    <span>Hello, Dear <strong>${data.username}</strong> </span><br/>
                                    <p>Welcome to stawro.<br/>
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
                        return res.status(202).json({ message: "Something went Wrong" })
                    }

                    return res.status(200).json({ Status: "OK", data: data._id })
                });

            } else {
                return res.status(200).json({ Status: "BAD" })
            }
        } else {
            return res.status(200).json({ Status: "NO" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


app.post("/verify/users/language/modele/and/otp", async (req, res) => {
    const { otp, id } = req.body;
    try {
        const find_one = await Employeotpmodule.findById({ _id: id })
        const get_one = await Employeloginmodule.findOne({ username: find_one.username })
        if (parseInt(find_one.otp) === parseInt(otp)) {
            await find_one.deleteOne()
            const token = jwt.sign({ id: get_one._id }, "kanna_stawro_founrs_withhh_1931_liketha", { expiresIn: "2h" });
            return res.status(200).json({ Status: "OK", Token: token, ssid: get_one._id })
        } else {
            return res.status(200).json({ Status: "BAD" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

// Start From Here

app.get('/get/user/admin/languages/to/post/:id', users_admin_Middle, async (req, res) => {
    const id = req.params.id;

    try {
        if (!id) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid ObjectId format" });
        }

        const get_user = await Employeloginmodule.findById(id).lean();

        if (get_user) {
            const data = {
                lang: get_user.language,
                user: get_user.username
            }
            return res.status(200).json({
                data

            });
        } else {
            return res.status(404).json({ success: false, message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});



const Questions_usersSchema = new mongoose.Schema({
    Time: String,
    user: String,
    img: String,
    Questio: String,
    qno: String,
    a: String,
    b: String,
    c: String,
    d: String,
    Ans: String,
    lang: String,
    tough: String,
    seconds: String,
}, { timestamps: true });

const Users_Questionsmodule = mongoose.model('Questions_users', Questions_usersSchema);

app.post('/get/a/users/admin/posted/questions/from/all/users', users_admin_Middle, async (req, res) => {
    const { user, img, Questio, a, b, c, d, Ans, tough, seconds } = req.body;

    try {

        if (!user && !img && !Questio && !a && !b && !c && !d && !Ans && !tough && !seconds) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        if (!mongoose.Types.ObjectId.isValid(user)) {
            return res.status(400).json({ success: false, message: "Invalid ObjectId format" });
        }

        const User_Admin_lang_get = await Employeloginmodule.findById(user).lean()
        const lang = User_Admin_lang_get.language

        const find_usrs = await Users_Questionsmodule.find({ user: User_Admin_lang_get.username }).lean();

        const questionExists = find_usrs.some((item) => item.Questio === Questio);

        if (!questionExists) {
            // Add the question to the database
            const newQuestion = await Users_Questionsmodule.create({
                user: User_Admin_lang_get.username,
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
                Time: Time // Automatically set the current time
            });

            return res.status(201).json({
                Status: "OK", qno: newQuestion.qno
            });
        } else {
            // Return a response indicating the question already exists
            return res.status(200).json({ Status: "IN" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get('/get/admin/sub/users/posted/datas/011/:id', users_admin_Middle, async (req, res) => {
    const id = req.params.id;
    try {

        if (!id) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid ObjectId format" });
        }

        const get_user = await Employeloginmodule.findById(id).lean()
        const data = await Users_Questionsmodule.find({ user: get_user.username }).lean()
        if (data) {
            return res.status(200).json({ data })
        } else {
            return res.status(200).json({ Status: "BAD" })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


app.delete('/delete/users/admin/qno/from/admin/users/:id', async (req, res) => {
    const { id } = req.params;

    try {

        if (!id) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid ObjectId format" });
        }

        const deletedData = await Users_Questionsmodule.findByIdAndDelete(id);

        if (!deletedData) {
            return res.status(404).json({ success: false, message: "Data not found" });
        }

        return res.status(200).json({ Status: "OK" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get('/admin/get/tottal/users/created/questions', adminMiddleware, async (req, res) => {
    try {
        const data = await Users_Questionsmodule.find({}).lean()
        if (data) {
            return res.status(200).json({ data })
        } else {
            return res.status(200).json({ Status: 'BAD' })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})


const Quest_Summery_Schema = new mongoose.Schema({
    Time: String,
    user: String,
    Qno_sel: [],
}, { timestamps: true });

const Quest_summerymodule = mongoose.model('Quest_summery', Quest_Summery_Schema);



app.post('/get/data/and/post/users/selected/data/to/db', async (req, res) => {
    const { user, img, Questio, a, b, c, d, Ans, lang, sel_lang, tough, seconds } = req.body;

    try {

        if (!user && !img && !Questio && !a && !b && !c && !d && !Ans && !lang && !sel_lang && !tough && !seconds) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })


        // Find all questions with the selected language to determine the next question number
        const find_Qst_len = await QuestionModule.find({ lang: sel_lang }).lean();
        const get_lng_dat = await QuestionModule.find({ Questio: Questio }).lean();

        // Create a new question entry with the next question number
        if (get_lng_dat.length <= 0) {
            const post_sel = await QuestionModule.create({
                sub_lang: lang,
                Time: Time, // Add the current timestamp for "Time"
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
                    Time: Time, // Add the current timestamp
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
        } else {
            return res.status(200).json({ Status: "IN" })
        }

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});


app.get('/get/wallet/amount/credits/links/by/:id', users_admin_Middle, async (req, res) => {
    const id = req.params.id;

    try {

        if (!id) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid ObjectId format" });
        }

        // Find the employee by ID
        const get_name = await Employeloginmodule.findById(id).lean();

        if (!get_name) {
            return res.status(404).json({ message: "Employee not found" });
        }

        // Find the question summary for the user
        const find_one = await Quest_summerymodule.findOne({ user: get_name.username }).lean();

        if (!find_one || !find_one.Qno_sel) {
            return res.status(404).json({ message: "No question summary found for this user" });
        }

        // Fetch all questions based on IDs in Qno_sel

        let intd = 0; // Use `let` instead of `const` for mutable variables

        const List = await Promise.all(
            find_one.Qno_sel.map(async (questionId) => {
                const dat = await QuestionModule.findById(questionId);
                return dat?.no?.length - 1 || 0; // Safely handle undefined 'yes'
            })
        );

        let inte = 0;

        const List1 = await Promise.all(
            find_one.Qno_sel.map(async (questionId) => {
                const dat = await QuestionModule.findById(questionId);
                return dat?.yes?.length - 1 || 0; // Safely handle undefined 'yes'
            })
        );

        // Accumulate the total 'yes' lengths
        intd = List.reduce((sum, length) => sum + length, 0);
        inte = List1.reduce((sum, length) => sum + length, 0);

        // Respond with the summary and questions
        const Rupee = (find_one.Qno_sel.length + intd)
        const Datas = {
            Out: intd,
            Ans: inte,
            Rupee: Rupee,
            Total_Quest: find_one.Qno_sel.length
        }
        return res.status(200).json({ Datas });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });

    }
});





// ✅ Notification Schema & Model
const NotificationSchema = new mongoose.Schema(
    {
        tokens: [String], // Array to store FCM tokens
    },
    { timestamps: true }
);
const NotificationModule = mongoose.model("Notification", NotificationSchema);

// // ✅ Send Notification to a Single User
// app.post("/send-notification", async (req, res) => {
//     const { token, title, body } = req.body;

//     if (!token || !title || !body) {
//         return res
//             .status(400)
//             .json({ error: "❌ Missing required fields: token, title, body" });
//     }

//     const message = {
//         token: token,
//         notification: { title, body },
//         data: { type: "chat" },
//         android: {
//             priority: "high",
//             notification: {
//                 sound: "default",
//                 channelId: "high_importance_channel",
//                 priority: "max", // Ensures heads-up notification
//                 visibility: "public", // Ensures it appears over the lock screen
//             },
//         },
//         apns: {
//             payload: {
//                 aps: {
//                     alert: { title, body },
//                     sound: "default",
//                     contentAvailable: true,
//                 },
//             },
//         },
//     };

//     try {
//         const response = await admin.messaging().send(message);
//         console.log("✅ Notification sent:", response);
//         res
//             .status(200)
//             .json({ success: true, message: "Notification sent!", response });
//     } catch (error) {
//         console.error("❌ Error sending notification:", error);
//         res
//             .status(500)
//             .json({ error: "Failed to send notification", details: error.message });
//     }
// });

// ✅ Store FCM Token from App
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
            return res
                .status(201)
                .json({ status: "ok", message: "FCM token already exists" });
        }

        notificationData.tokens.push(fcm);
        await notificationData.save();

        res
            .status(200)
            .json({ status: "ok", message: "FCM token stored successfully" });
    } catch (error) {
        console.error("❌ Error handling FCM token:", error);
        res
            .status(500)
            .json({ error: "Internal Server Error", details: error.message });
    }
});

// // ✅ Send Notification to All Users
// app.post("/send-notification/to/all", async (req, res) => {
//     const { title, body } = req.body;

//     if (!title || !body) {
//         return res
//             .status(400)
//             .json({ error: "❌ Missing required fields: title, body" });
//     }

//     try {
//         const notificationData = await NotificationModule.findOne();
//         if (!notificationData || !notificationData.tokens || notificationData.tokens.length === 0) {
//             return res.status(400).json({ error: "❌ No FCM tokens found" });
//         }

//         const messages = notificationData.tokens.map((token) => ({
//             token,
//             notification: { title, body },
//             data: { type: "chat" },
//             android: {
//                 priority: "high",
//                 notification: {
//                     sound: "default",
//                     channelId: "high_importance_channel",
//                     priority: "max",
//                     visibility: "public",
//                 },
//             },
//             apns: {
//                 payload: {
//                     aps: {
//                         alert: { title, body },
//                         sound: "default",
//                         contentAvailable: true,
//                     },
//                 },
//             },
//         }));

//         const responses = await Promise.all(messages.map((msg) => admin.messaging().send(msg)));
//         console.log("✅ Notifications sent:", responses.length);

//         res.status(200).json({
//             success: true,
//             message: "Notifications sent!",
//             responses,
//         });
//     } catch (error) {
//         console.error("❌ Error sending notifications:", error);
//         res.status(500).json({
//             error: "Failed to send notifications",
//             details: error.message,
//         });
//     }
// });




// Schema for OTP Verification
const ResetOTPSchema = new mongoose.Schema(
    {
        user: { type: String, required: true }, // User's ID or Email
        otp: { type: String, required: true },
        expiresAt: { type: Date, required: true },
    },
    { timestamps: true }
);

// Model for OTP
const ResetOTPModel = mongoose.model("Reset_Pass_OTP", ResetOTPSchema);


// Send OTP to user
const sendOTP = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid ObjectId format" });
        }

        const user = await Usermodule.findById(id).lean();

        if (!user) return res.status(404).json({ message: "User not found" });

        const otp = generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 mins

        const check_old_otp = await ResetOTPModel.findOne({ user: user.email })

        if (check_old_otp) {
            await check_old_otp.deleteOne();
        }

        // Save OTP in database
        await ResetOTPModel.create({ user: user.email, otp, expiresAt });

        // TODO: Send OTP via Email/SMS
        let mailOptions = {
            from: 'stawropuzzle@gmail.com', // Sender address
            to: `${user.email}`, // List of recipients
            subject: `stawro, OTP`, // Subject line
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
                        <strong>stawro</strong>
                    </div>
                    <div class="email-cnt-02">
                        <span>Hello, Dear <strong>${user.username}</strong> </span><br/>
                        <p>Welcome to stawro.<br/>
                        OTP to update new Password , Dont share With anyone, ${otp}</p><br/>
                            
                        <strong>${otp}</strong><br/>
             
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
                return res.status(202).json({ message: "Something went Wrong" })
            }

            return res.status(200).json({ Status: "OK" })
        });

        res.json({ message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send OTP" });
    }
};

// Verify OTP
const verifyOTP = async (req, res) => {
    try {
        const { id, otp } = req.body;

        if (!id && !otp) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid ObjectId format" });
        }

        const user = await Usermodule.findById(id).lean()
        const otpRecord = await ResetOTPModel.findOne({ user: user.email, otp });

        if (!otpRecord) return res.status(400).json({ message: "Invalid OTP" });
        if (new Date() > otpRecord.expiresAt)
            return res.status(400).json({ message: "OTP expired" });

        // OTP verified, delete record
        await ResetOTPModel.deleteOne({ _id: otpRecord._id });

        res.json({ message: "OTP verified, proceed to reset password" });
    } catch (error) {
        res.status(500).json({ error: "OTP verification failed" });
    }
};




// Reset Password
const resetPassword = async (req, res) => {
    try {
        const { id, oldPassword, newPassword } = req.body;

        if (!id) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid ObjectId format" });
        }

        const user = await Usermodule.findById(id);

        if (!user) return res.status(404).json({ message: "User not found" });

        // Check if oldPassword is provided (for normal password change)
        if (oldPassword) {
            const isMatch = await bcrypt.compare(oldPassword, user.pass);
            if (!isMatch) return res.status(400).json({ message: "Incorrect old password" });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.pass = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to reset password" });
    }
};



// Reset Password
const resetPasswordWithOTP = async (req, res) => {
    try {
        const { data, otp, newPassword } = req.body;

        if (!data && !otp && !newPassword) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })


        // Find user by username or email
        const user = await Usermodule.findOne({
            $or: [{ username: data.trim() }, { email: data.trim() }]
        });

        if (!user) return res.status(404).json({ message: "User not found" });

        // Verify OTP
        const otpRecord = await ResetOTPModel.findOne({ user: user.email, otp });
        if (!otpRecord) return res.status(400).json({ message: "Invalid OTP" });
        if (new Date() > otpRecord.expiresAt) {
            return res.status(400).json({ message: "OTP expired" });
        }

        // Delete OTP record after successful verification
        await ResetOTPModel.deleteOne({ _id: otpRecord._id });

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.pass = hashedPassword;
        await user.save();

        res.status(200).json({ message: "OTP verified, password updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to reset password" });
    }
};


const sendForgot_otp = async (req, res) => {
    try {
        const { data } = req.body;

        if (!data) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })

        // Find user by email or username
        const user = await Usermodule.findOne({
            $or: [{ username: data.trim() }, { email: data.trim() }]
        });

        if (!user) return res.status(404).json({ message: "User not found" });

        const otp = generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 mins

        // Save OTP in database
        await ResetOTPModel.create({ user: user.email, otp, expiresAt });

        // TODO: Send OTP via Email/SMS
        let mailOptions = {
            from: 'stawropuzzle@gmail.com', // Sender address
            to: `${user.email}`, // List of recipients
            subject: `stawro, OTP`, // Subject line
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
                          <strong>stawro</strong>
                      </div>
                      <div class="email-cnt-02">
                          <span>Hello, Dear <strong>${user.username}</strong> </span><br/>
                          <p>Welcome to stawro.<br/>
                          OTP to update new Password , Dont share With anyone, ${otp}</p><br/>
                              
                          <strong>${otp}</strong><br/>
               
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
                return res.status(202).json({ message: "Something went Wrong" })
            }

            return res.status(200).json({ Status: "OK", data: data._id })
        });

        res.json({ message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to send OTP" });
    }
}

app.post("/sendOTP/by/api/using/funtcion", sendOTP);
app.post("/verifyOTP", verifyOTP);
app.post("/resetPassword", resetPassword);

app.post("/sent/forgot/pass/app", sendForgot_otp);
app.post("/resetPasswordWithOTP", resetPasswordWithOTP);





app.delete("/delete/account/data/by/id/from/app/:id", async (req, res) => {
    const { id } = req.params;

    try {

        console.log("Deleting")
        if (!id) return res.status(400).json({ Status: "BAD", message: "Some Data Missing" })
        console.log("Deleting")
        const deletedUser = await UPImodule.findOneAndDelete({ user: id });

        if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
        }


        return res.status(200).json({ status: "OK", message: "Account deleted successfully" });
    } catch (error) {
        console.error("Error deleting account:", error);
        res.status(500).json({ error: "Failed to delete account" });
    }
});



const PORT = 80;


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const start_Stop_Schema = new mongoose.Schema({
    Time: String,
    Status: String,
    text: String,
    user: { type: String, unique: true }, // Unique constraint
}, { timestamps: true });

const Start_StopModule = mongoose.model('Start_Stop', start_Stop_Schema);


app.get("/start/or/no/check", async (req, res) => {
    try {

        const data = await Start_StopModule.findOne({ user: "kick" })
        if (data) {
            return res.status(200).json({ status: data })
        } else {
            return res.status(200).json({ Status: "BAD" })
        }


    } catch (error) {
        console.error("Error deleting account:", error);
        res.status(500).json({ error: "Failed to delete account" });
    }
})



app.post("/start/game/by/click", async (req, res) => {
    const { status, text } = req.body;

    try {
        // Check if required data is present
        if (!status) {
            return res.status(400).json({ Status: "MISSING_STATUS", message: "Status is required" });
        }

        // Check if a game status document exists
        const data = await Start_StopModule.findOne({ user: "kick" });

        if (data) {
            // Update existing status
            data.Status = status;
            data.text = text;
            data.Time = new Date(); // Optional: Update timestamp
            await data.save();
            return res.status(200).json({ Status: "OK", message: "Game status updated successfully" });
        } else {
            // Create a new document
            const Time = new Date();
            await Start_StopModule.create({ Time, Status: status, user: "kick", text });
            return res.status(200).json({ Status: "OK", message: "Game status updated successfully" });
        }



    } catch (error) {
        console.error("Error updating game status:", error);
        return res.status(500).json({ Status: "SERVER_ERR", message: "Failed to update game status" });
    }
});



// app.get('/try/new/:id', async (req, res) => {
//     const {id} = req.params;
//     const data = await Usermodule.findById(id);
//     return res.status(200).json(data);

// });







const user_track_ip = new mongoose.Schema({
    Time: String,
    ip: { type: String, unique: true },
    city: String
}, { timestamps: true });

const userstrackmodule = mongoose.model('Users_IP_Track', user_track_ip);

app.post('/new/ip/data', async (req, res) => {

    const { ip, city } = req.body;

    try {
        const user = await userstrackmodule.findOne({ ip: ip })
        if (!user) {
            await userstrackmodule.create({ Time, ip, city })
            return res.status(200).json({ Status: "OK" })
        }
        return res.status(200).json({ Status: "In" })
    } catch (error) {
        console.error("Error updating game status:", error);
        return res.status(500).json({ Status: "SERVER_ERR", message: "Failed to update game status" });
    }
})


const comment_Schema = new mongoose.Schema({
    Time: String,
    text: String,
    stars: String,
    name: String,
    profile: String,
    email: String,
    like: [],
    user: { type: String, unique: true }, // Unique constraint
}, { timestamps: true });

const CommentModule = mongoose.model('comment', comment_Schema);


app.post("/get/new/post/from/comment", authMiddleware, async (req, res) => {
    const { text, stars, name, profile, email } = req.body;
    const Time = new Date(); // Add Time assignment

    try {
        if (!text || !stars || !name || !profile || !email) {
            return res.status(400).json({ Status: "Miss", message: "Required fields are missing" });
        }

        const existingComment = await CommentModule.findOne({ email });

        if (!existingComment) {
            const user_data = await Usermodule.findOne({ email });
            const fees = await Rupeemodule.findOne({ username: "admin" });

            if (!user_data || !fees) {
                return res.status(404).json({ Status: "Not Found", message: "User or Fee data not found" });
            }

            const bal_data = await Balancemodule.findOne({ user: user_data._id });

            const crt = await CommentModule.create({
                Time,
                text,
                stars,
                name,
                user: user_data._id,
                profile,
                email
            });

            if (!bal_data) {
                const bal = parseInt(fees.rupee) + 5;
                await Balancemodule.create({
                    user: user_data._id,
                    Time,
                    balance: bal.toString(),
                    last_tr_id: user_data._id
                });

                await Historymodule.create({
                    Time,
                    user: user_data._id,
                    rupee: bal.toString(),
                    type: "Credited",
                    tp: "Rupee"
                });

                return res.status(200).json({ Status: "OK", to: crt._id, message: "Created New with Bonus" });
            } else {
                const new_bal = parseInt(bal_data.balance) + parseInt(fees.rupee);
                bal_data.balance = new_bal;
                await bal_data.save();

                await Historymodule.create({
                    Time,
                    user: user_data._id,
                    rupee: fees.rupee,
                    type: "Credited",
                    tp: "Rupee"
                });

                return res.status(200).json({ Status: "OK", to: crt._id, message: "Created New" });
            }
        } else {
            return res.status(200).json({ Status: "IN", message: "Already Exists" });
        }
    } catch (error) {
        console.error("Error in creating comment:", error);
        return res.status(500).json({
            Status: "SERVER_ERR",
            message: "Failed to create comment"
        });
    }
});

// app.post("/make/like/review/count", authMiddleware, async (req, res) => {
//   const { l_id, email } = req.body;
//   const Time = new Date();

//   try {
//     if (!l_id || !email) {
//       return res.status(400).json({ Status: "Miss" });
//     }


//     const data = await CommentModule.findById({ _id: l_id });

//     if(data.email === email){
//         return res.status(200).json({Status : "U"})
//     }


//     if (!data) {
//       return res.status(404).json({ Status: "Not Found", message: "Comment not found" });
//     }

//     const updated = await CommentModule.findOneAndUpdate(
//       { _id: l_id, like: { $ne: email } },
//       { $addToSet: { like: email } }
//     );

//     if (!updated) {
//       return res.status(200).json({ Status: "Exist" });
//     }

//     const user_data = await Usermodule.findOne({ email });
//     if (!user_data) {
//       return res.status(404).json({ Status: "Not Found", message: "User not found" });
//     }

//     const fees = await Rupeemodule.findOne({ username: "admin" });
//     if (!fees) {
//       return res.status(500).json({ Status: "Server Error", message: "Fee config missing" });
//     }

//     let bal_data = await Balancemodule.findOne({ user: user_data._id });
//     if (!bal_data) {
//       await Balancemodule.create({
//         user: user_data._id,
//         Time,
//         balance: "5"
//       });

//       await Historymodule.create({
//         Time,
//         user: user_data._id,
//         rupee: "5",
//         type: "Credited",
//         tp: "Rupee"
//       });

//       bal_data = await Balancemodule.findOne({ user: user_data._id });
//     }

//     const added_bal = parseInt(bal_data.balance) + parseInt(fees.rupee);
//     bal_data.balance = added_bal.toString();
//     await bal_data.save();

//     await Historymodule.create({
//       Time,
//       user: user_data._id,
//       rupee: fees.rupee,
//       type: "Credited",
//       tp: "Rupee"
//     });

//     return res.status(200).json({ Status: "OK", message: "Like recorded and balance updated" });
//   } catch (error) {
//     console.error("Error updating like and balance:", error);
//     return res.status(500).json({ Status: "SERVER_ERR", message: "Failed to process like" });
//   }
// });


app.post("/make/like/review/count", authMiddleware, async (req, res) => {
    const { l_id, email } = req.body;
    const Time = new Date();

    try {
        if (!l_id || !email) {
            return res.status(400).json({ Status: "Miss" });
        }

        // Check if the user already liked ANY document
        const alreadyLiked = await CommentModule.findOne({ like: email });
        if (alreadyLiked) {
            return res.status(200).json({
                Status: "ALREADY_LIKED",
                message: "You can like only one document.",
            });
        }

        // Find the comment/document by ID
        const data = await CommentModule.findById({ _id: l_id });
        if (!data) {
            return res.status(404).json({ Status: "Not Found", message: "Comment not found" });
        }

        if (data.email === email) {
            return res.status(200).json({ Status: "U" }); // User trying to like their own doc?
        }

        // Add like only if not already present (redundant here, but safe)
        const updated = await CommentModule.findOneAndUpdate(
            { _id: l_id, like: { $ne: email } },
            { $addToSet: { like: email } }
        );

        if (!updated) {
            return res.status(200).json({ Status: "Exist" });
        }

        // Proceed with user and balance updates
        const user_data = await Usermodule.findOne({ email });
        if (!user_data) {
            return res.status(404).json({ Status: "Not Found", message: "User not found" });
        }

        const fees = await Rupeemodule.findOne({ username: "admin" });
        if (!fees) {
            return res.status(500).json({ Status: "Server Error", message: "Fee config missing" });
        }

        let bal_data = await Balancemodule.findOne({ user: user_data._id });
        if (!bal_data) {
            await Balancemodule.create({
                user: user_data._id,
                Time,
                balance: "5",
                last_tr_id: user_data._id
            });

            await Historymodule.create({
                Time,
                user: user_data._id,
                rupee: "5",
                type: "Credited",
                tp: "Rupee",
            });

            bal_data = await Balancemodule.findOne({ user: user_data._id });
        }

        const added_bal = parseInt(bal_data.balance) + parseInt(fees.rupee);
        bal_data.balance = added_bal.toString();
        await bal_data.save();

        await Historymodule.create({
            Time,
            user: user_data._id,
            rupee: fees.rupee,
            type: "Credited",
            tp: "Rupee",
        });

        return res.status(200).json({
            Status: "OK",
            message: "Like recorded and balance updated",
        });

    } catch (error) {
        console.error("Error updating like and balance:", error);
        return res.status(500).json({
            Status: "SERVER_ERR",
            message: "Failed to process like",
        });
    }
});



app.get("/comment/review/frome/all/users", async (req, res) => {
    try {
        const data = await CommentModule.find({}).lean()
        return res.status(200).json({ data })
    } catch (error) {
        console.error("Error updating like and balance:", error);
        return res.status(500).json({ Status: "SERVER_ERR", message: "Failed to process like" });
    }
})

app.get("/comment/get/single/data/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const data = await CommentModule.findById(id); // Corrected: removed `{}`

        if (data) {
            return res.status(200).json({ data });
        } else {
            return res.status(404).json({ Status: "NO_DATA", message: "No data found" });
        }
    } catch (error) {
        console.error("Error fetching comment data:", error);
        return res.status(500).json({ Status: "SERVER_ERR", message: "Failed to fetch data" });
    }
});



app.get("/comment/get/single/data/email/:email", authMiddleware, async (req, res) => {
    const email = req.params.email;

    try {
        // Fetch the first comment that matches the email
        const data = await CommentModule.findOne({ email: email });

        if (data) {
            return res.status(200).json({ data });
        } else {
            return res.status(404).json({ Status: "NO_DATA", message: "No data found for this email." });
        }
    } catch (error) {
        console.error("Error fetching comment data:", error);
        return res.status(500).json({ Status: "SERVER_ERR", message: "Failed to fetch comment data." });
    }
});




const Question_Data_base_Schema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    a: {
        type: String,
        required: true
    },

    b: {
        type: String,
        required: true
    },

    c: {
        type: String,
        required: true
    },

    d: {
        type: String,
        required: true
    },

    language: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: false
    },

    seconds: {
        type: Number,
        required: true
    },

}, { timestamps: true });

const AI_QuestionModule = mongoose.model('Question Data', Question_Data_base_Schema);



const ip_singel_qst_Schema = new mongoose.Schema({
    Time: String,
    qno: String,
    rupee: { type: String, default: "" },
    yes: { type: String, default: "!" }, // Default value
    user: { type: String, unique: true }, // Unique constraint
}, { timestamps: true });

const ip_singel_qst_module = mongoose.model('singel_quest', ip_singel_qst_Schema);


app.get("/get/singel/qst/:ip", async (req, res) => {
    const ip = req.params.ip;

    try {
        if (!ip) {
            return res
                .status(400)
                .json({ Status: "No_IP", message: "IP address is required" });
        }

        // total questions count
        const qstCount = await QuestionModule.countDocuments();
        if (qstCount === 0) {
            return res
                .status(500)
                .json({ Status: "NO_QUESTIONS", message: "No questions available" });
        }

        // random question number (as string if stored that way)
        const randomQno = Math.floor(Math.random() * qstCount) + 1;
        const qnoStr = randomQno.toString();

        // try to find existing record
        const existing = await ip_singel_qst_module.findOne({ user: ip });

        // helper to build response payload from a question doc
        const buildPayload = (qnDoc, extra = {}) => ({
            img: qnDoc.img,
            Questio: qnDoc.Questio,
            qno: qnDoc.qno,
            a: qnDoc.a,
            b: qnDoc.b,
            c: qnDoc.c,
            d: qnDoc.d,
            seconds: qnDoc.seconds,
            ...extra,
        });

        if (!existing) {
            // no prior entry: pick a random question and create entry
            const qn_numm = await QuestionModule.findOne({ qno: qnoStr });
            if (!qn_numm) {
                return res
                    .status(500)
                    .json({ Status: "NO_QUESTION_FOUND", message: "Question missing" });
            }

            const now = Date.now();
            // create with upsert-like safety using updateOne with $setOnInsert to avoid duplicate-key errors
            await ip_singel_qst_module.findOneAndUpdate(
                { user: ip },
                {
                    $set: {
                        // fields to refresh every time, e.g., qno if it should change
                        qno: qnoStr,
                    },
                    $setOnInsert: {
                        user: ip,
                        yes: "!",
                        rupee: null,
                    },
                },
                {
                    upsert: true,
                    new: true,
                    setDefaultsOnInsert: true,
                }
            );


            const data = buildPayload(qn_numm);
            return res.status(200).json({ Status: "OK", data });
        }

        // existing entry logic: normalize `yes` values for consistency
        const statusFlag = (existing.yes || "").trim();

        if (statusFlag === "!") {
            const qn_numm = await QuestionModule.findOne({ qno: existing.qno });
            if (!qn_numm) {
                return res
                    .status(500)
                    .json({ Status: "NO_QUESTION_FOUND", message: "Question missing" });
            }
            const data = buildPayload(qn_numm, { yes: existing.yes });
            return res.status(200).json({ Status: "OK", data });
        } else if (statusFlag === "NO") {
            return res.status(200).json({ Status: "NO" });
        } else if (statusFlag === "Time_Out" || statusFlag === "Time Out") {
            return res
                .status(200)
                .json({ Status: "Time_Out", qno: existing.qno });
        } else if (statusFlag === "Yes") {
            return res.status(200).json({ Status: "Yes", rupee: existing.rupee });
        } else {
            // fallback / in-progress or unknown flag
            return res.status(200).json({ Status: "IN", qno: existing.qno });
        }
    } catch (error) {
        console.error("Error fetching comment data:", error);
        return res
            .status(500)
            .json({ Status: "SERVER_ERR", message: "Failed to fetch comment data." });
    }
});


// app.post("/get/singel/qst", async (req, res) => {
//     const { ip } = req.body;

//     try {

//         if (!ip) {
//             return res.status(400).json({ Status: "No_IP", message: "IP address is required" });
//         }

//         const qst = await QuestionModule.countDocuments({});

//         const to = qst;

//         const qno = Math.floor(Math.random() * to) + 1;
//         const existing = await ip_singel_qst_module.findOne({ user : ip });
//         if (!existing) {

//             const qn_numm = await QuestionModule.findOne({ qno: qno.toString() });
//             await ip_singel_qst_module.create({ Time, qno: qno.toString(), user : ip });

//             const data = {
//                 img: qn_numm.img,
//                 Questio: qn_numm.Questio,
//                 qno: qn_numm.qno,
//                 a: qn_numm.a,
//                 b: qn_numm.b,
//                 c: qn_numm.c,
//                 d: qn_numm.d,
//                 seconds: qn_numm.seconds,
//             }


//             return res.status(200).json({ Status: "OK", data });


//         }
//         else if (existing.yes === "!") {
//             const qn_numm = await QuestionModule.findOne({ qno: existing.qno });
//             const data = {
//                 yes: existing.yes,
//                 img: qn_numm.img,
//                 Questio: qn_numm.Questio,
//                 qno: qn_numm.qno,
//                 a: qn_numm.a,
//                 b: qn_numm.b,
//                 c: qn_numm.c,
//                 d: qn_numm.d,
//                 seconds: qn_numm.seconds,
//             }
//             return res.status(200).json({ Status: "OK", data });
//         }
//         else if (existing.yes === "NO") {
//             return res.status(200).json({ Status: "NO" });
//         } else if (existing.yes === "Time Out") {
//             return res.status(200).json({ Status: "Time_Out", qno: existing.qno });
//         }
//         else if (existing.yes === "Yes") {
//             return res.status(200).json({ Status: "Yes", rupee: existing.rupee });
//         }
//         else {
//             return res.status(200).json({ Status: "IN", qno: existing.qno });
//         }

//     } catch (error) {
//         console.error("Error fetching comment data:", error);
//         return res.status(500).json({ Status: "SERVER_ERR", message: "Failed to fetch comment data." });
//     }
// })



app.post("/time/out/by/singel/qst/data", async (req, res) => {
    const { ip } = req.body;

    try {
        if (!ip) {
            return res.status(400).json({ Status: "No_IP", message: "IP address is required" });
        }

        const existing = await ip_singel_qst_module.findOne({ user: ip });

        if (!existing) {
            return res.status(404).json({ Status: "NOT_FOUND", message: "No question found for this IP" });
        }

        await ip_singel_qst_module.updateOne({ user: ip }, { $set: { yes: "Time Out" } });
        return res.status(200).json({ Status: "Time_Out", message: "Question data updated successfully" });
    } catch (error) {
        console.error("Error updating question data:", error);
        return res.status(500).json({ Status: "SERVER_ERR", message: "Failed to update question data." });
    }
});




// app.post("/get/singel/qst/ans", async (req, res) => {
//     const { ip, qno, ans } = req.body;

//     try {
//         if (!ip || !qno || !ans) {
//             return res.status(400).json({ Status: "BAD", message: "Some Data Missing" });
//         }

//         const existing = await ip_singel_qst_module.findOne({ user : ip });

//         if (!existing) {
//             return res.status(404).json({ Status: "NOT_FOUND", message: "No question found for this IP" });
//         }

//         if (existing.qno !== qno) {
//             return res.status(400).json({ Status: "WRONG_QNO", message: "Question number does not match" });
//         }

//         if (existing.yes !== "!") {
//             return res.status(400).json({ Status: "ALREADY_ANSWERED", message: "Question already answered" });
//         }

//         const question = await QuestionModule.findOne({ qno });

//         if (!question) {
//             return res.status(404).json({ Status: "QUESTION_NOT_FOUND", message: "Question not found" });
//         }

//         if(existing){
//             if (question.Ans === ans) {
//             existing.yes = "Yes";
//             await existing.save();
//             const rw_data = await Singel_rewards_module.findOne({ user: "kick" });
//             if (rw_data.data.length >= 1) {

//                 const won_data = await Singel_win_module.findOne({ user : ip });
//                 if (!won_data) {

//                     const shuffled = rw_data.data.sort(() => Math.random() - 0.5);
//                     const removedItem = shuffled.shift();
//                     rw_data.data = shuffled;
//                     await rw_data.save(); // ✅ save the updated rewards

//                     await Singel_win_module.create({ Time, user : ip, rupee: removedItem });
//                     await ip_singel_qst_module.findOneAndUpdate(
//                         { user : ip },
//                         { rupee: removedItem }
//                     );

//                     return res.status(200).json({
//                         Status: "CORRECT",
//                         rupee: removedItem,
//                         message: "Correct answer"
//                     });
//                 }
//                 else {
//                     return res.status(200).json({ Status: "EX CORRECT", message: "Correct answer" });
//                 }
//             } else {
//                 return res.status(200).json({ Status: "CORRECT NO REWARD", message: "Correct answer" });
//             }


//         } else {
//             existing.yes = "NO";
//             await existing.save();
//             return res.status(200).json({ Status: "INCORRECT", message: "Incorrect answer" });
//         }
//         }


//     } catch (error) {
//         console.error("Error processing question answer:", error);
//         return res.status(500).json({ Status: "SERVER_ERR", message: "Failed to process answer" });
//     }
// });












// app.post("/get/singel/qst/ans", async (req, res) => {
//     const { ip, qno, ans } = req.body;

//     try {
//         if (!ip || !qno || !ans) {
//             return res.status(400).json({ Status: "BAD", message: "Some Data Missing" });
//         }

//         const existing = await ip_singel_qst_module.findOne({ ip });
//         if (!existing) {
//             return res.status(404).json({ Status: "NOT_FOUND", message: "No question found for this IP" });
//         }

//         if (existing.qno !== qno) {
//             return res.status(400).json({ Status: "WRONG_QNO", message: "Question number does not match" });
//         }

//         if (existing.yes !== "!") {
//             return res.status(400).json({ Status: "ALREADY_ANSWERED", message: "Question already answered" });
//         }

//         const question = await QuestionModule.findOne({ qno });
//         if (!question) {
//             return res.status(404).json({ Status: "QUESTION_NOT_FOUND", message: "Question not found" });
//         }

//         if (question.Ans === ans) {
//             existing.yes = "Yes";
//             await existing.save();

//             const rw_data = await Singel_rewards_module.findOne({ user: "kick" });
//             if (rw_data?.data?.length >= 1) {
//                 const shuffled = rw_data.data.sort(() => Math.random() - 0.5);
//                 const removedItem = shuffled.shift();
//                 rw_data.data = shuffled;
//                 await rw_data.save();

//                 const won_data = await Singel_win_module.findOne({ ip });
//                 const Time = Date.now();

//                 if (!won_data) {
//                     await Singel_win_module.create({ Time, ip, rupee: removedItem });

//                     await ip_singel_qst_module.findOneAndUpdate(
//                         { ip },
//                         { rupee: removedItem }
//                     );

//                     return res.status(200).json({
//                         Status: "CORRECT",
//                         rupee: removedItem,
//                         message: "Correct answer"
//                     });
//                 } else {
//                     return res.status(200).json({
//                         Status: "EX CORRECT",
//                         message: "Correct answer"
//                     });
//                 }
//             } else {
//                 return res.status(200).json({
//                     Status: "CORRECT NO REWARD",
//                     message: "Correct answer"
//                 });
//             }
//         } else {
//             existing.yes = "NO";
//             await existing.save();
//             return res.status(200).json({
//                 Status: "INCORRECT",
//                 message: "Incorrect answer"
//             });
//         }

//     } catch (error) {
//         console.error("Error processing question answer:", error);
//         return res.status(500).json({
//             Status: "SERVER_ERR",
//             message: "Failed to process answer"
//         });
//     }
// });


app.post("/get/singel/qst/ans", async (req, res) => {
    const { ip, qno, ans } = req.body;

    try {
        if (!ip || !qno || !ans) {
            return res.status(400).json({ Status: "BAD", message: "Some Data Missing" });
        }

        const existing = await ip_singel_qst_module.findOne({ user: ip });
        if (!existing) {
            return res.status(404).json({ Status: "NOT_FOUND", message: "No question found for this IP" });
        }

        if (existing.qno !== qno) {
            return res.status(400).json({ Status: "WRONG_QNO", message: "Question number does not match" });
        }

        if (existing.yes !== "!") {
            return res.status(400).json({ Status: "ALREADY_ANSWERED", message: "Question already answered" });
        }

        const question = await QuestionModule.findOne({ qno });
        if (!question) {
            return res.status(404).json({ Status: "QUESTION_NOT_FOUND", message: "Question not found" });
        }

        // CORRECT ANSWER BLOCK
        if (question.Ans === ans) {
            existing.yes = "Yes";
            await existing.save();

            const rw_data = await Singel_rewards_module.findOne({ user: "kick" });
            // console.log(rw_data.data)
            const len_t = rw_data.data.length

            if (len_t >= 0) {
                const won_data = await Singel_win_module.findOne({ user: ip });

                if (!won_data) {
                    const shuffled = rw_data.data.sort(() => Math.random() - 0.5);
                    const removedItem = shuffled.shift();
                    rw_data.data = shuffled;
                    await rw_data.save();

                    const Time = new Date().toISOString();
                    await Singel_win_module.create({ Time, user: ip, rupee: removedItem });
                    await ip_singel_qst_module.findOneAndUpdate(
                        { user: ip },
                        { rupee: removedItem }
                    );

                    return res.status(200).json({
                        Status: "CORRECT",
                        rupee: removedItem,
                        message: "Correct answer"
                    });
                } else {
                    return res.status(200).json({
                        Status: "EX CORRECT",
                        message: "Already answered correctly before"
                    });
                }
            } else {
                return res.status(200).json({
                    Status: "CORRECT NO REWARD",
                    message: "Correct answer, but no rewards left"
                });
            }

        } else {
            // INCORRECT ANSWER BLOCK
            existing.yes = "NO";
            await existing.save();
            return res.status(200).json({
                Status: "INCORRECT",
                message: "Incorrect answer"
            });
        }

    } catch (error) {
        console.error("Error processing question answer:", error);
        return res.status(500).json({
            Status: "SERVER_ERR",
            message: "Failed to process answer"
        });
    }
});



const Reward_Singel_Schema = new mongoose.Schema({
    Time: String,
    data: [], // Default value
    user: { type: String, unique: true }, // Unique constraint
}, { timestamps: true });

const Singel_rewards_module = mongoose.model('singel_Rewards', Reward_Singel_Schema);



const Win_Reward_Singel_Schema = new mongoose.Schema({
    Time: String,
    user: { type: String, unique: true }, // Unique constraint
    rupee: String,
}, { timestamps: true });

const Singel_win_module = mongoose.model('singel_win_Rewards', Win_Reward_Singel_Schema);




app.post("/add/singel/rewards", adminMiddleware, async (req, res) => {
    const { data } = req.body;

    try {
        if (!data) {

            return res.status(400).json({ Status: "BAD", message: "Some Data Missing" });

        }

        const newReward = await Singel_rewards_module.findOne({ user: "kick" });

        if (!newReward) {
            await Singel_rewards_module.create({ Time, data: [data], user: "kick" });
            return res.status(201).json({ Status: "OK", message: "Reward added successfully" });
        } else {
            newReward.data.push(data);
            await newReward.save();
            return res.status(200).json({ Status: "OK", message: "Reward updated successfully" });
        }

    } catch (error) {
        console.error("Error adding reward:", error);
        return res.status(500).json({ Status: "SERVER_ERR", message: "Failed to add reward." });
    }
});


app.get("/get/singel/rewards", async (req, res) => {
    try {
        const rewards = await Singel_rewards_module.findOne({ user: "kick" });

        if (!rewards || !rewards.data) {
            return res.status(404).json({ Status: "NOT_FOUND", message: "No rewards found" });
        }

        return res.status(200).json({ Status: "OK", data: rewards.data });
    } catch (error) {
        console.error("Error fetching rewards:", error);
        return res.status(500).json({ Status: "SERVER_ERR", message: "Failed to fetch rewards." });
    }
});


app.get("/get/singel/reward/data/by/:id/:u_id", async (req, res) => {
    const { id, u_id } = req.params;
    try {


        const data = await Singel_win_module.findOne({ user: id })
        if (data) {
            data.user = u_id
            await data.save()
            return res.status(200).json({ data })
        }

        const Data = await Singel_win_module.findOne({ user: u_id })

        if (Data) {
            return res.status(200).json({ data: Data })
        }

        if (!data && !Data) {
            return res.status(200).json({ Status: "NO" })
        }

    } catch (error) {
        console.error("Error fetching rewards:", error);
        return res.status(500).json({ Status: "SERVER_ERR", message: "Failed to fetch rewards." });
    }
})




app.get("/get/won/module/reward/with/upi/data", async (req, res) => {
    try {
        const allRewards = await Singel_win_module.find({});

        const rewardsWithUpi = await Promise.all(
            allRewards.map(async (reward) => {
                const upiData = await UPImodule.findOne({ user: reward.user });
                if (upiData) {
                    return {
                        reward,
                        upi: upiData
                    };
                }
                return null;
            })
        );

        const filtered = rewardsWithUpi.filter(item => item !== null);

        return res.status(200).json({ data: filtered });

    } catch (error) {
        console.error("Error fetching rewards:", error);
        return res.status(500).json({ Status: "SERVER_ERR", message: "Failed to fetch rewards." });
    }
});


app.delete("/delet/paid/after/one/day/data/:id", async (req, res) => {
    try {
        const data = await Singel_win_module.findById(req.params.id);

        if (data) {
            await data.deleteOne();  // Make sure to await this operation
            return res.status(200).json({ Status: "OK", message: "Deleted successfully" });
        } else {
            return res.status(404).json({ Status: "NOT_FOUND", message: "Data not found" });
        }

    } catch (error) {
        console.error("Error deleting reward:", error);
        return res.status(500).json({ Status: "SERVER_ERR", message: "Failed to delete reward." });
    }
});









// const paymentSchema = new mongoose.Schema({
//   orderId: String,
//   paymentId: String,
//   amount: Number,
//   status: String,
//   userId: String,
// }, { timestamps: true });

// module.exports = mongoose.model('Payment', paymentSchema);


// app.post('/pay/now', async (req, res) => {
//   try {
//     const { amount, userId, razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

//     // Step 1: Create order
//     const order = await razorpay.orders.create({
//       amount: amount * 100, // Razorpay works in paise
//       currency: "INR",
//       receipt: `rcpt_${Date.now()}`
//     });

//     // Optional: send order id back if frontend needs to pay separately
//     if (!razorpay_payment_id) {
//       return res.json({ orderId: order.id });
//     }

//     // Step 2: Verify signature
//     const generated_signature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_SECRET)
//       .update(razorpay_order_id + "|" + razorpay_payment_id)
//       .digest("hex");
//     const expectedSignature = crypto
//         .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//         .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//         .digest("hex");

//     if (generated_signature !== razorpay_signature) {
//       return res.status(400).json({ status: "FAIL", message: "Invalid payment signature" });
//     }

//     // Step 3: Save to DB
//     const payment = new Payment({
//       orderId: razorpay_order_id,
//       paymentId: razorpay_payment_id,
//       amount,
//       status: "PAID",
//       userId
//     });

//     await payment.save();

//     return res.status(200).json({ status: "SUCCESS", message: "Payment verified and saved", payment });

//   } catch (error) {
//     console.error("Payment Error:", error);
//     return res.status(500).json({ status: "ERROR", message: "Payment failed" });
//   }
// });









app.get("/remaining/rewards/len/and/list", async (req, res) => {
    try {
        const rewards = await Singel_rewards_module.findOne({ user: "kick" });
        if (rewards) {
            return res.status(200).json({ Status: "OK", data: rewards.data })
        } else {
            return res.status(200).json({ Status: "BAD" })
        }
    } catch (error) {
        console.error("Payment Error:", error);
        return res.status(500).json({ status: "ERROR", message: "Payment failed" });
    }
})







app.post("/razorpay", async (req, res) => {
    const { action, amount, currency, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (action === "create-order") {

        console.log(action, amount, currency, razorpay_order_id, razorpay_payment_id, razorpay_signature)
        try {
            const options = {
                amount: amount * 100,
                currency: currency || "INR",
                receipt: `rcpt_${Date.now()}`,
            };

            const order = await razorpay.orders.create(options);
            return res.json({ success: true, order });
        } catch (err) {
            console.error("Order Create Error:", err);
            return res.status(500).json({ success: false, error: "Failed to create order" });
        }
    }

    if (action === "verify-payment") {
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            return res.json({ success: true, message: "Payment Verified" });
        } else {
            try {
                const refund = await razorpay.payments.refund(razorpay_payment_id, {
                    speed: "optimum",
                    notes: { reason: "Signature verification failed" },
                });

                return res.status(400).json({
                    success: false,
                    message: "Signature verification failed. Refund initiated.",
                    refund,
                });
            } catch (refundErr) {
                console.error("Refund Error:", refundErr);
                return res.status(500).json({
                    success: false,
                    message: "Refund failed after signature mismatch",
                    error: refundErr.message,
                });
            }
        }
    }

    res.status(400).json({ success: false, message: "Invalid action" });
});




app.post("/refund/data/and/add/to/users", adminMidleware, async (req, res) => {
    const { id, text, ex_seconds } = req.body;

    try {
        const data = await ReportSecondModule.findById(id);
        if (!data) {
            return res.status(200).json({ Status: "BAD" });
        }

        if (text === "refund") {
            
            if(ex_seconds !== "no"){
                await Seconds_Module.updateOne(
                    {
                        category: data.cat,
                        Tough: data.tough,
                        "seconds.user": data.user
                    },
                    {
                        $set: { "seconds.$.seconds": ex_seconds } // update that user's seconds
                    }
                );
            }
            
            data.text = "refund";
            await data.save();
        
            // Fetch fee and balance with await
            const fees = await Rupeemodule.findOne({ username: "admin" });
            const bal = await Balancemodule.findOne({ user: data.user });

            if (!fees || !bal) {
                return res.status(404).json({ Status: "ERROR", message: "Fee or balance not found" });
            }

            const new_bal = parseInt(fees.rupee) + parseInt(bal.balance);
            bal.balance = new_bal;
            await bal.save();

            return res.status(200).json({ Status: "OK" });
        }
        
        else {
            data.text = "non-refund";
            await data.save();
            return res.status(200).json({ Status: "OK" });
        }

    } catch (error) {
        console.error("Payment Error:", error);
        return res.status(500).json({ status: "ERROR", message: "Payment failed" });
    }
});


// app.post("/new/sec/to/user/data/id", adminMiddleware, async (req, res) =>{
//     try{
//         const updated_sec = await Seconds_Module.updateOne(
//             {
//                 category: Qno.sub_lang,
//                 Tough: Qno.tough,
//                 "seconds.user": user
//             },
//             {
//                 $set: { "seconds.$.seconds": newSecondsValue } // update that user's seconds
//             }
//         );

//     }catch (error) {
//         console.error("Payment Error:", error);
//         return res.status(500).json({ status: "ERROR", message: "Payment failed" });
//     }
// })



const refer_and_earn_Schema = new mongoose.Schema({
    Time: String,
    my_referd : [
        {
            user : String,
            d_id : String
        }
    ],
    referd_user_d_id : String,
    ac_crt : { type: String, default: "No" },
    ac_deb : { type: String, default: "No" },
    user: { type: String, unique: true }, // Unique constraint
}, { timestamps: true });

const referandearnModule = mongoose.model('refer_and_earn', refer_and_earn_Schema);

app.post("/refer/and/earn", async (req, res) => {
    const { user, referd_user_d_id, referd } = req.body;

    try {
        const newRefer = new referandearnModule({
            Time: new Date().toISOString(),
            my_referd: [{
                user: referd.user,
                d_id: referd.d_id
            }],
            referd_user_d_id,
            user
        });

        await newRefer.save();
        return res.status(201).json({ status: "OK", message: "Referral created successfully" });
    } catch (error) {
        console.error("Referral Error:", error);
        return res.status(500).json({ status: "ERROR", message: "Failed to create referral" });
    }
});

app.get("/print/user/data", authMiddleware ,async(req, res)=>{
    try{
        console.log(req.user)        
    }catch (error) {
        console.error("Referral Error:", error);
        return res.status(500).json({ status: "ERROR", message: "Failed to create referral" });
    }
})

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});


process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', reason);
});


