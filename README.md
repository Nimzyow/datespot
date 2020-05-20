# DateSpot

So you're in a relationship, or perhaps you matched in an online dating app. That's fantastic but what do you do now? Where do you go for your date? Isn't it stressful to setup and plan the date? Well, stress no more as we have you covered with curated dates based on the location of your choosing!:) :)

![heart](https://raw.githubusercontent.com/rafahg/travel-final-project/master/images/logo.jpg)

## Table of content

- [Installation](#installation)
- [Database](#database)
- [Testing](#testing)
- [Running the application](#running-the-application)
- [Tech stack](#tech-stack)
- [Extra notes](#extra-notes)
- [Team who collaborated on this project](#team-who-collaborated-on-this-project)

## Installation

### Backend

Follow these steps to install required dependencies:

1. In the root of the projecttype the following in your terminal:

```
$ npm install
```

That's it for the backend!

### Frontend

Follow these steps to install required dependencies:

1. In the root of the project, cd into datespot-react and type the following in your terminal:

```
$ npm install
```

Great! That's it for the front end!

## Database
In the root of the project, cd into date_spot-rails and type the following in your terminal:

INSTRUCTIONS TO BE GIVEN HERE AS TO HOW TO SETUP MONGODB AND SEED INTO THE DB

## Testing

### Backend

Follow these steps to run tests for the backend:

1. In the root of the project, type the following in your terminal:

```
$ npm run test
```

You should see the tests for the backend in the terminal.

### Frontend

Follow these steps to run tests in the front end:

1. In the root of the project, cd into datespot-react and type the following in your terminal:

```
$ npm test
```

You should be able to see the tests performed in React

## Running the application

Follow these steps to run the server:

1. In the root of the project, type the following in your terminal:

```
$ npm run server
```

Yay! You just turned on the server for this project! This won't do us much good though as you won't be able to see anything. Time to fire up the front end.

Open another instance of your terminal and Follow these steps to run tests in the front end:

1. In the root of the project, cd into datespot-react and type the following in your terminal:

```
$ npm start
```

Great! So now you have both the backend and frontend working! Now feel free to play around with the application on localhost 4000.

FUTURE PLANS: I will use concurrently so that in the root all you have to do is type npm run dev to run both the backend and the frontend at the same time.

## Planning

This was a group project done for the presentation day at Makers Academy. It involved us giving a presentation on a project we worked. We were given just over a week to come up with an idea and create an application in just over a week. The original backend was done in Rails using a SQL database and the front end was done in React using Reacts Context API for state management. I was resposible for the front end. I wanted more responsibilites in the backend and thought it would be a great exercise to rip out the Rails backend and convert that to a JavaScript backend using Node.js, Express.js and MongoDB as the DB. 

The aim is not only convert the backend but to also thoroughly test it. I believe I've demonstrated my capabilites in using Reacts Context API but I also wanted to demonstrate my capabilites in Redux. To that end I made another aim to convert Reacts Context API to Redux as I believe this will be a great evidence that I am more than competant in the use of Redux.

**From the below paragraph to the end of the Planning portion of this README is the original brainstorming and planning of this project involving Rails as the backend.**

The planning of this application started out with a brainstorming session where we laid out all of our ideas. The group had many interesting ideas which we discussed in depth:

![ideas](https://raw.githubusercontent.com/rafahg/travel-final-project/master/images/ideas.png)

In the end, we chose to work on an application we felt could challenge us in many areas, called DateSpot. It is an date curator which will get rid of the stress of thinking of a location or what you should do on a date.

![dateSpotBrainStorm](https://raw.githubusercontent.com/rafahg/travel-final-project/master/images/dateSpotBrainStorm.png)

For our MVP we decided to keep it as simple as possible. Our MVP would be to simple display a list of curated dating spots on the main page.

![mvp](https://raw.githubusercontent.com/rafahg/travel-final-project/master/images/mvp.png)

## Tech stack

- JavaScript
- React (hooks)
- Redux
- Jest and Enzyme
- Cypress
- Node
- Express
- Supertest
- chai
- nyc
- MongoDB
- Mongoose
- eslint
- prettier

## Team who collaborated on the original project which includes Ruby on Rails as the backend

### and their daily roles

| Name                 | Day 1           | Day 2           | Day 3           | Day 4           | Day 5           |
| :------------------- | :-------------- | :-------------- | :-------------- | :-------------- | :-------------- |
| Nima Soufiani        | Technician      | Ideas/helper    | Scribe/reporter | Leader          | Scrum master    |
| Rafa Hernandez       | Scrum master    | Technician      | Ideas/helper    | Scribe/reporter | Leader          |
| Neha Singh           | Leader          | Scrum master    | Technician      | Ideas/helper    | Scribe/reporter |
| Artemis Papanikolaou | Scribe/reporter | Leader          | Scrum master    | Technician      | Ideas/helper    |
| Gareth Harris        | Ideas/helper    | Scribe/reporter | Leader          | Scrum master    | Technician      |

## Extra notes

This project is turning to be a great exercise to really test my capabilites. I am not only trying to convert the backend to Node and Express with MongoDB as my database, I am also converting Reacts Context API to Redux. I am also doing all of this with testing in mind. I aim to have the backend and front end thoroughly tested. My use of Tests and implementation of Redux will be the main showcase of this project.
