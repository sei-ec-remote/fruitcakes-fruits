# Fruitcakes Full CRUD Full Stack App

- Use Express to build a server
- Use Mongoose to communicate with mongoDB
- Full CRUD functionality on our fruits resource
- User Authentication
- The ability to add comments to fruits
- (Maybe gather data from a 3rd party API)

This app will start as an API, that receives requests and sends JSON responses, but eventually we will add a views layer that will render html in our browser.

This is an MVC application.
We're using the MVC system for organizing our code.
This breaks our app down into these three parts.
MVC stands for 
- Models
- Views
- Controllers

Models - All of our data, what shape it's in and what resources we're using(models), and how our resources relate to one another

Views - All the different ways we can see our data, whether it's as a JSON response, or an actual HTML response, this determines how our data can be viewed by the user.

Controllers - Tell us what we can do and connect our views and our models. We can think of our routes as our controllers, because they determine how a user can interact with our resources