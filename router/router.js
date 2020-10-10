const express=require("express")
const User=require("../schemas/user_schema")
const News=require("../schemas/news_schema")
const passport=require("passport")


const app=express.Router()
app.use(express.static('public'))

/*** Get requests***/
app.get("/",(req,res)=>{
    let authed=false
    let admin=false
    News.find().sort({$natural: -1}).limit(5).exec((err,news)=>{
        if(err) console.log(err)
        else{
            if(req.isAuthenticated()){
                authed=req.user.username
                User.findOne({username: req.user.username},(err,result)=>{
                    if(err) console.log(err)
                    if(result.admin) admin=true
                    res.render("home",{authed: authed, admin: admin, news: news})
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

app.get('/auth/google', passport.authenticate('google', {scope: ['email', 'profile']}))

app.get('/auth/google/instruoapp', 
    passport.authenticate('google', { failureRedirect: '/login' }),(req, res)=>res.redirect('/'))

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
            let hasLiked=false
            if(req.isAuthenticated()){
                if(req.user.username==result.op) sameUser=true
                let ind=result.likes.likers.indexOf(req.user.username)
                if(ind>-1) hasLiked=true
            }    
            res.render("post",{post: result, sameUser: sameUser, hasLiked: hasLiked})    
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

app.get("/profile/:email",(req,res)=>{
    User.findOne({username: req.params.email},(err,result)=>{
        if(err) console.log(err)
        else if(result==null) res.redirect("/404")
        else{
            News.find({postId: {$in: result.liked}},(err,likedNews)=>{
                if(err) return console.log(err)
                result.lastSeen=`on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`
                result.save()
                res.render("profile",{user: result, likedPosts: likedNews})
            })
        } 
    })
})

app.get("/likepost/:postId",(req,res)=>{
    let numId=Number(req.params.postId)
    if(req.isAuthenticated()){
        News.findOne({postId: numId},(err,result)=>{
            if(err) return console.log(err)
            else if(result==null) return res.redirect("/404")
            User.findOne({username: req.user.username},(err,op)=>{
                if(err) return console.log(err)
                let ind=result.likes.likers.indexOf(req.user.username)
                let stat=0
                if(ind>-1){
                    result.likes.likesNum--
                    op.liked.splice(op.liked.indexOf(numId),1)
                    result.likes.likers.splice(ind,1)
                }
                else{
                    result.likes.likesNum++
                    op.liked.push(numId)
                    result.likes.likers.push(req.user.username)
                    stat=1
                }
                op.save()
                result.save()
                res.send({likes: result.likes.likesNum, status: stat})
            })
            
        })
    }
    else res.send(false)
})
/*** Get requests end ***/

/*** Post requests***/

app.post("/signup",(req,res)=>{
    if(req.isUnauthenticated()){
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
    }
    else res.redirect("/profile/"+req.user.username)
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
            postId: postId,
            likes: {
                likesNum: 0,
                likers: []
            }
        })
        news.save()
        res.redirect("/post/"+postId)
    }
    else res.redirect("/login")
})

/*** Post requests end ***/
app.use((req,res)=>{
    res.status(404).render("404")
})


module.exports=app