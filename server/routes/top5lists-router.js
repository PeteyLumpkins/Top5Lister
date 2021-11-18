const auth = require('../auth')
const express = require('express')
const Top5ListController = require('../controllers/top5list-controller')
const UserController = require('../controllers/user-controller')
const router = express.Router()

router.put('/top5list/:id', auth.verify, Top5ListController.updateTop5List)
router.delete('/top5list/:id', auth.verify, Top5ListController.deleteTop5List)
router.get('/top5list/:id', auth.verify, Top5ListController.getTop5ListById)
router.get('/top5lists', auth.verify, Top5ListController.getTop5Lists)
router.get('/top5listpairs/:email', auth.verify, Top5ListController.getTop5ListPairs)

router.post('/usertop5list', auth.verify, Top5ListController.createUserTop5List)
router.post('/communitytop5list', auth.verify, Top5ListController.createCommunityTop5List)
router.get('/communitytop5list/:name', auth.verify, Top5ListController.getCommunityTop5Lists)

router.post('/register', UserController.registerUser)
router.get('/loggedIn', UserController.getLoggedIn)
router.post('/login', UserController.loginUser)
router.get('/logout', UserController.logoutUser)
module.exports = router