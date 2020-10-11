# Instruo app - The Sexy Webapp

A simple app to submit as the instruo task. Let's break it down. 

## Disclaimer

* The backend for this Sexy webapp is entirely written in Node.js. I have used MongoDB as the database.
* **I have not worked on the app's frontend much, if at all. I have entirely used bootstrap and internet downloaded templates.**  So now if it looks ugly, you know why. ***Please don't @ me if you don't like the looks of this app***. I could have obviously made it prettier, but that was not the task.
* I have not used semicolons anywhere because I don't like them. That's the sole reason I main Python.

## Packages
There are various packages that I have used in this app. Let's have a look.

* **Backend**
  1. **Express**:  Easily the best node.js web framework.
  1. **Body-parser**: Package for accessing HTML form data.
  1. **Mongoose**: Node js package for easier mongoDB database management.
  1. **Passport**: Authentication package.
  1. **Express-session, Passport-local-mongoose**: Helper packages required for authentication.
  1. **Passport-google-oauth20**: Package for google based authorisation.
  1. There is also **dotenv**, but it is not useful here. I used it to access the stored google client id and secret. You can go ahead and uninstall it.
  
* **Frontend**
  1. **Bootstrap**: Yeah.
  1. **jQuery**:  Single-handedly the best frontend javascript library.
  1. **EJS** as the templating language.  
  
  Reminder that I have not worked much on the frontend.
  

## Setup
### Server setup
* **Step 1**

    Install the latest LTS version of node js on you pc by [going to the official node js website](https://nodejs.org/en/download/).
* **Step 2**

    Clone this repo
    
      $ git clone https://github.com/soft-coded/instruoapp
* **Step 3**

    Install all the dependencies
      
      $ cd your_directory/instruoapp
      
      $ npm i
* **Step 4**

    Run the app
    
      $ node app.js
### Use the app in browser
    
    Enter the url localhost:6969

## Using the Sexy Webapp

* To view the news/home page, go to ***localhost:6969***. I have included two sample news posts on the homepage that exist solely to take up space on the page.
* Not having an account is way too boring on this website, so let's make one.
  * You can create an account by clicking on the **Sign Up** button on the right side of the navbar. This will open up the sign up page. There are some sexy ajax functionalities on this page, like checking if a user's email is already registered, and uh, yeah that's it.
  * \*\***WARNING**\*\*: **Sign up with google will not work because I have obviously not committed the google Client ID and Secret to github.** If you have your own, you can paste those in place of *process.env.CLIENT_ID* and *process.env.CLIENT_SECRET* to make it work.
  * After signing in, you can or cannot post news depending upon whether you decided to be an Admin or not. Admins will have a **Create Post** button on the right side of the homepage.
* Clicking on the **Create Post** button will open up the create post page. Every post has a title, heading and the post content.
* After a post is made, you will be redirected to the post's own page. This page can also be accessed by clicking **Read More** on the respective post on the homepage.
* Any user (whether admin or not) can like any post by going to the post's page and clicking the **Like Post** button below the heading.
* Only the user who actually made the post can delete it. You can delete your posts by clicking on the **Delete Post** button right before the like button.
* You can log out by clicking on **Log Out** on the homepage navbar.
* After logging out, you can log back in by clicking on the **Log In** button on the homepage navbar. This opens the log in page. **Log In with google will also not work.**, unless a correct google client id and secret is provided.
* Every user has a profile page which can be accessed using the **Profile** button on the homepage navbar. The profile page shows all the details about the user, including all the posts that the user has liked (the required cart system).

## Conclusion
I think that about sums it up. I would like to mention that the code I have used in the backend of this web app is entirely by me. I have not used any help from someone else or the internet (minus the docs, stack overflow (bless that website) and the almighty google.co.in).
