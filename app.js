/*** Packages ***/
require("dotenv").config()
const express=require("express")
const bodyParser=require("body-parser")
const session=require("express-session")
const passport=require("passport")
const mongoose=require("mongoose")
const passportLocalMongoose=require("passport-local-mongoose")
const GoogleStrategy=require("passport-google-oauth20").Strategy
const findOrCreate=require("mongoose-findorcreate")
/*** Packages end ***/ 

const app=express()

/*** App setup ***/

app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))
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

const newsSchema=new mongoose.Schema({
    title: String,
    heading: String,
    post: String,
    date: String,
    op: String,
    postId: Number
})

const userSchema=new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    lastSeen: String,
    phone: String,
    admin: Boolean,
    googleId: String 
})
userSchema.plugin(passportLocalMongoose)
userSchema.plugin(findOrCreate)
const User=new mongoose.model("User",userSchema)
const News=new mongoose.model("News",newsSchema)

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
        User.findOrCreate({ googleId: profile.id },(err, user)=>cb(err, user))
    }
))
/*** Passport setup end ***/

/*** Routes ***/

/*** Get requests***/
app.get("/",(req,res)=>{
    let authed=false
    let admin=false
    News.find().sort({$natural: -1}).limit(5).exec((err,news)=>{
        if(err) console.log(err)
        else{
            if(req.isAuthenticated()){
                authed=true
                User.findOne({username: req.user.username},(err,result)=>{
                    if(err) console.log(err)
                    if(result.admin) admin=true
                    res.render("home",{authed: authed, admin: admin, news: news})
                    result.lastSeen=`on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`
                    result.save()
                })
            }
            else res.render("home",{authed: authed, admin: admin, news: news})
        }
    })
})

app.get("/signup",(req,res)=>{
    res.render("signup",{idiocy: false, matchErr: false, phoneErr: false, passErr: false})
})

app.get("/login",(req,res)=>{
    res.render("login", {err: false})
})

app.get('/auth/google', passport.authenticate('google', {scope: ['profile']}))

app.get("/auth/google/instruoapp", 
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res)=>res.redirect('/'))

app.get("/logout",(req,res)=>{
    req.logOut()
    res.redirect("/")
})

app.get("/newpost",(req,res)=>{
    res.render("newpost")
})

app.get("/post/:postId",(req,res)=>{
    const numId=Number(req.params.postId)
    let sameUser=false
    News.findOne({postId: numId},(err,result)=>{
        if(err) console.log(err)
        else if(result==null) res.redirect("/404")
        else{
            if(req.isAuthenticated() && req.user.username==result.op)
                sameUser=true
            res.render("post",{post: result, sameUser: sameUser})    
        }
    })
})

app.get("/deletepost/:postId",(req,res)=>{
    const numId=Number(req.params.postId)
    News.findOne({postId: numId},(err,result)=>{
        if(err) console.log(err)
        else if(result==null) res.redirect("/404")
        else{
            if(req.isAuthenticated() && result.op===req.user.username){
                News.deleteOne({postId: numId},()=>res.redirect("/"))
            }
            else res.redirect("/404")
        }
    })
})
/*** Get requests end ***/

/*** Post requests***/

app.post("/signup",(req,res)=>{
    const password=req.body.password
    const phone=req.body.phone
    if(password!==req.body.repass){
        res.render("signup",{idiocy: true, matchErr: true, passErr: false, phoneErr: false})
    }
    else if(password.length<8){
        res.render("signup",{idiocy: true, matchErr: false, passErr: true, phoneErr: false})
    }
    else if(!phone.match(/[0-9]/g) || phone.length!==10){
        res.render("signup",{idiocy: true, matchErr: false, passErr: false, phoneErr: true})
    }
    else{
        let admin=false
        if(req.body.admin) admin=true
        User.register({
            username: req.body.username.replace(/>/g,"&gt;").replace(/</g,"&lt;"),
            name: req.body.name.replace(/>/g,"&gt;").replace(/</g,"&lt;"),
            lastSeen: `on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
            phone: phone,
            admin: admin,
            googleId: "NA"
        },password,(err, user)=>{
            if(err){
                console.log(err)
                res.redirect("/signup")
            }
            else{
                passport.authenticate("local")(req, res, ()=>{
                    res.redirect("/")
                })
            }
        })

    }
})

app.post("/login",(req,res)=>{
    passport.authenticate('local', (err,user)=>{
        if(err) console.log(err)
        else if(!user) res.render("login",{err: true})
        else{
            req.logIn(user,(err)=>{
                if(err) console.log(err)
                else res.redirect("/")
            })
        }
    })(req,res)
})

app.post("/checkname",(req,res)=>{
    User.findOne({username: req.body.username},(err,result)=>{
        if(err) console.log(err)
        res.send(result!=null)
    })
})

app.post("/newpost",(req,res)=>{
    let postId=Date.now()
    if(req.isAuthenticated()){
        const news=new News({
            title: req.body.title.replace(/>/g,"&gt;").replace(/</g,"&lt;"),
            heading: req.body.heading.replace(/>/g,"&gt;").replace(/</g,"&lt;"),
            post: req.body.content.replace(/>/g,"&gt;").replace(/</g,"&lt;"),
            date: new Date().toLocaleDateString(),
            op: req.user.username,
            postId: postId
        })
        news.save()
        res.redirect("/post/"+postId)
    }
    else res.redirect("/login")
})
/*** Post requests end ***/
/*** Routes end ***/
app.use((req,res)=>{
    res.status(404).render("404")
})
app.listen(6969,()=>{console.log("6969 hehe")})