# Instruo app - The Sexy Webapp

*Finally* got done with this. Only took me what, like *20+* hours? Easy Peasy. I am *totally* not sleep deprived. ~~**Pick me.**~~

Now let's break it down. 
## Disclaimer

* The backend for this Sexy webapp is entirely written in Node.js. I have used MongoDB as the database.
* The app can be run by first installing all the packages using *npm i* and then using the command *node app.js* in the root directory. The webpage can be viewed by going to *localhost:6969* (\*wink\*).

* **I have not worked on the app's frontend much, if at all. I have entirely used bootstrap and internet downloaded templates.**

So now if it looks ugly, you know why. ***Please don't @ me if you don't like the looks of this app***. I could have obviously made it prettier, but then I would've been even more sleep deprived, and this is a backend task anyway.
* I have not used semicolons anywhere because I straight up don't like them. Thats the sole reason I main Python lel.

## Packages
There are various packages that I have used in this app. Let's have a look.

* **Backend**
  1. ***Express***:  Easily the best node.js web framework.
  1. ***Mongoose***: Node js package for easier mongoDB database management.
  1. ***Passport***: Authentication package.
  1. Rest all are middlewares or helper packages.
  
* **Frontend**
  1. **Bootstrap**: Duh.
  1. **jQuery**:  The absolute best thing to have happened to frontend javascript. Bless John Resig.
  1. **EJS**: The templating language.
  

## Using the Sexy Webapp

* To view the news/home page, no sign in is required. I have included two sample news posts on the main page that don't do anything, but any news posted by a user will open up in a new page after clicking on **Read More**.
* User can create an account by clicking on the **Sign Up** button on the right side of the navbar. This will open up the sign up page. There are some sexy ajax functionalities on this page, like checking if a user's email is already registered, and uh, yeah that's it.
* \*\***WARNING**\*\*: **Sign up with google will not work because I have obviously not committed the google Client ID and Secret to github.** If you have your own, you can paste those in place of *process.env.CLIENT_ID* and *process.env.CLIENT_SECRET* to make it work.
* After signing in, the user can or cannot post news depending upon whether the user decided to be an Admin or not. Admins will have a *Create Post* button on the right side of the homepage.
* After the post is made, the user will be redirected to the post's own page. This page can also be accessed by clicking **Read More** on the respective post on the homepage.
* Any user (whether admin or not) can like any post by going to the post's page. But only the user who actually made that post can delete it.
* Users can log out by clicking on **Log Out** on the homepage navbar.
* Logged out users can log back in by clicking on the **Log In** button on the homepage navbar. **Log In with google will also not work, obviously.**
* Every user has a *profile* page which can be accessed using the **Profile** button on the navbar. The profile page shows all details about the user, including all the posts that the user has liked (the required cart system).

## Conclusion
I think that about sums it up. I am sure you are going to pick me, after all I have made this web app so sexy (**not in terms of looks**).

I would like to mention that the code I have used in the backend of this web app is entirely by me. I have not used any help from someone else or the internet (minus the docs, stack overflow (bless that website) and the almighty google.co.in. I am starting to think I haven't really written anything myself lmoa).

Anyway, this was a lot of fun, now I am going back to sleep. I need those *sweet sweet* 13 hours of sleep in a day.
