const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/save-user/:username', userController.saveUser);
router.delete('/delete-user/:username', userController.deleteUser);
router.get('/find-mutual-followers/:username', userController.findMutualFollowers);
router.get('/search-users', userController.searchUsers);
router.patch('/update-user/:username', userController.updateUser);
router.get('/list-users', userController.listUsers);

module.exports = router;
