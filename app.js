/*** Packages ***/
require("dotenv").config()
const express=require("express")
const bodyParser=require("body-parser")
const session=require("express-session")
const passport=require("passport")
const mongoose=require("mongoose")
const GoogleStrategy=require("passport-google-oauth20").Strategy
const User=require("./schemas/user_schema")
const router=require("./router/router")
/*** Packages end ***/ 

const app=express()

/*** App setup ***/

app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(session({
        secret: "kek",
        resave: false,
        saveUninitialized: false
    })
)
app.use(passport.initialize())
app.use(passport.session())
/*** App setup end ***/

/*** Mongoose setup ***/

mongoose.connect("mongodb://localhost:27017/instruoDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

/*** Mongoose setup end ***/

/*** Passport setup ***/

passport.use(User.createStrategy())
passport.serializeUser((user, done)=>{
    done(null, user.id)
})
passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
        done(err, user)
    })
})
passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:6969/auth/google/instruoapp"
    }, (accessToken, refreshToken, profile, cb)=>{
        User.findOne({ googleId: profile.id },(err, user)=>{
            if(err) console.log(err)
            else if(user) cb(err, user)
            else{
                const googleUser=new User({
                    username: profile.emails[0].value,
                    name: profile.displayName,
                    lastSeen: `on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
                    liked: [],
                    admin: false,
                    phone: "NA",
                    googleId: profile.id
                })
                googleUser.save((err)=>cb(err,googleUser))
            }
        })
    }
))
/*** Passport setup end ***/

/*** Routes ***/
app.use(router)
/*** Routes end ***/

app.listen(6969,()=>{console.log("6969 hehe")})