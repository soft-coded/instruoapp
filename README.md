# Instruoapp - The Sexy Webapp

*Finally* got done with this. Only took me what, like *20+* hours? Easy Peasy. I am *totally* not sleep deprived. ~~**Pick me.**~~
Now let's break it down. 

The backend for this Sexy webapp is entirely written in Node.js. I have used MongoDB as the database.
The app can be run by using the command *node app.js* in the root directory. The webpage can be viewed by going to *localhost:6969* (\*wink\*).

### I have not worked on the app's frontend much, if at all. I have entirely used bootstrap and internet downloaded templates.
So now if it looks ugly, you know why. *Please don't @ me if you don't like the looks of this app*. I could have obviously made it prettier, but then I would've been even more sleep deprived, and this is a backend task anyway.

## Packages
There are various packages that I have used in this app. Let's have a look.
1. ***Express***:  Easily the best node.js web framework.
1. ***Mongoose***: Node js package for easier mongoDB database management.
1. ***Passport***: Authentication package.
Rest all are middlewares or helper packages.

## Using the Sexy Webapp

* To view the news/home page, no sign in is required. I have included two sample news posts on the main page that don't do anything, but any news posted by a user will open up in a new page after clicking on **Read More**.
* User can create an account by clicking on the **Sign Up** button on the right side of the navbar. This will open up the sign up page. There are some sexy ajax functionalities on this page, like checking if a user's email is already registered, and uh, yeah that's it.
### WARNING
**Sign up with google will not work because I have obviously not committed the google Cliend ID and Secret to github.** If you have your own, you can paste those in place of *process.env.CLIENT_ID* and *process.env.CLIENT_SECRET* to make it work.
* After signing in, the user can or cannot post news depending upon whether the user decided to be an Admin or not. Admins will have a *Create Post* button on the right side of the homepage.
* After the post is made, the user will be redirected to the post's own page. This page can also be accessed by clicking **Read More** on the respective post on the homepage.
* Any user (whether admin or not) can like any post by going to the post's page. But only the user who actually made that post can delete it.
* Signed Out users can log in by clicking on the **Log In** button on the navbar. **Log In with google will also not work, obviously.**
* Every user has a *Profile* page which can be accessed using the **Profile** button on the navbar.
* The profile page shows all details about the user, including all the posts that the user has liked.

I think that about sums it up. I am sure you are going to pick me, after all I have made this web app so sexy (**not in terms of looks**).
Anyway, this was a lot of fun, now I am going back to sleep. I need those sweet sweet 13 hours of sleep in a day.
