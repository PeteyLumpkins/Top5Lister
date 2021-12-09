# The Top5Lister
Welcome to my Top5Lister application. Besides being my final project for my fundamentals of software engineering course, The Top5Lister is my first attempt at designing and implementing a full-stack web application using React, Express, Node, and MongoDB. It's far from perfect, but it's mine. There are actually some bits and pieces of code from our professor in here, but roughly 95% of the code is mine.


### About
The Top5Lister is, more or less, a social media application (with a few gimmicks). The app essentially allows for users to create and share lists of top-5-items with other users. 

<img width="100%" alt="Screen Shot 2021-12-09 at 5 35 55 PM" src="https://user-images.githubusercontent.com/63989572/145486785-432f6cfa-ebd9-43c7-be4d-48a5bd9c3200.png">

Here a user has logged in and is looking at three top5lists they have created and published. From the home screen, a user can navigate to the all-lists screen to view other users' top5lists or navigate to the community screen to view the community top5lists.

<img width="1440" alt="Screen Shot 2021-12-09 at 5 36 52 PM" src="https://user-images.githubusercontent.com/63989572/145488128-8a9c3976-107b-4d54-bc2d-2518d526ebd0.png">

Here our logged in user has found another users top5list and decided to like and comment on the users top5list.

<img width="1440" alt="Screen Shot 2021-12-09 at 6 08 50 PM" src="https://user-images.githubusercontent.com/63989572/145490047-f7564a72-6948-4ab0-9d87-b7025ec8597e.png">


Here the user is viewing the community lists and has decided to comment on the list. The community lists are a collection of all users' top-5-lists and their items and the votes for each item. 

### A Brief (and vague) Setup Tutorial

1. Download the code in this repository
2. Start MongoDB on your local machine
3. ```cd``` into the ```client``` folder and run ```npm install``` 
4. ```cd``` into the ```server``` folder and run ```npm install```
5. In the ```server``` folder run ```nodemon index.js``` 
6. In the ```client``` folder run ```npm start``` 

After which the client should start running on ```localhost:3000``` and the splash screen should be displayd and look something like the following:

<img width="1440" alt="Screen Shot 2021-12-09 at 5 57 42 PM" src="https://user-images.githubusercontent.com/63989572/145488932-1b340dff-9118-4ea7-b91c-dd3a6299a761.png">
