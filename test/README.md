## Testing data
Hello future self. These json files contain the testing data for my top5lister application. They have been exported from MongoDB compass. The structure of the database, the name of the database and collections, and how to import the data has been roughly outlined below.

### Names
The name of the database is called **top5lists**. The names of the collections correspond to the names of the json files in the test folder.

### The Database format
The structure of the database should look like the following:

top5lists 
    | - communitytop5lists
    | - posts
    | - users
    | - usertop5lists

Where **top5lists** is the name of the database and each collection is named after one of the test files.

### Importing the test files into MongoDB Compass
To import the files into MongoDB compass, I recommend creating the database with each of the empty collections. So you'd create a database called **top5lists** and then create the four collections; **posts**, **communitytop5lists**, **users**, and **usertop5lists**. 

Once the collections are set up, then import the test data into each of their respective collections. 


