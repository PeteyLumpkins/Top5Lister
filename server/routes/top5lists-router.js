const auth = require('../auth')
const express = require('express')
const Top5ListController = require('../controllers/top5list-controller')
const UserController = require('../controllers/user-controller')
const router = express.Router()

// router.put('/top5list/:id', auth.verify, Top5ListController.updateTop5List)
// router.delete('/top5list/:id', auth.verify, Top5ListController.deleteTop5List)
// router.get('/top5list/:id', auth.verify, Top5ListController.getTop5ListById)
// router.get('/top5lists', auth.verify, Top5ListController.getTop5Lists)
// router.get('/top5listpairs/:email', auth.verify, Top5ListController.getTop5ListPairs)

// TODO need to auth.verify these routes
router.put('/usertop5list', Top5ListController.updateUserTop5List);
router.post('/usertop5list', Top5ListController.createUserTop5List);
router.put('/post', Top5ListController.updatePost); 
router.put('/publish', Top5ListController.publishTop5List);

router.get('/top5lists', Top5ListController.getTop5Lists);
router.get('/usertop5lists', auth.verify, Top5ListController.getUserTop5Lists);
router.get('/communitytop5lists', Top5ListController.getCommunityTop5Lists);

// router.get('/communitytop5lists', Top5ListController.getCommunityTop5Lists);
// router.get('/top5lists', Top5ListController.getTop5Lists);

router.post('/register', UserController.registerUser)
router.get('/loggedIn', UserController.getLoggedIn)
router.post('/login', UserController.loginUser)
router.get('/logout', UserController.logoutUser)
module.exports = router