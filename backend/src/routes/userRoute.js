const express = require('express');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddleware');
const {
    getAllUsersHandler,
    getUserByIdHandler,
    getUserProfileHandler,
    updateUserHandler,
    deleteUserHandler
} = require('../controllers/userController');

router.get("/profile", authMiddleware, getUserProfileHandler); 

router.get('/all-users', getAllUsersHandler);
router.get('/profile/:user_id', authMiddleware, getUserByIdHandler);
router.put('/profile/:user_id', authMiddleware, updateUserHandler);
router.delete('/profile/:user_id', authMiddleware, deleteUserHandler);

module.exports = router;