const express = require('express');
const router = express.Router();

const {
    userRegister,
    userLogin
} = require('../controllers/authController');


//rotas de autentificação
router.post('/register', userRegister);
router.post('/login', userLogin);  


module.exports = router;
