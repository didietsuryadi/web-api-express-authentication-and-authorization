var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController')


//Routing User
router.post('/login', userController.login);

router.post('/register', userController.register);

router.get('/user', userController.verify, userController.getData)



module.exports = router;
