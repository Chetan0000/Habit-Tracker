const express = require('express');
const router = express.Router();

const homeController = require('../controllers/home_controllers');

router.get('/' , homeController.home);
router.get('/habit',homeController.habit);
router.post('/habit/add',homeController.addHabit);
router.get('/habit/Status', homeController.updateStatus);
router.get('/habit/delete',homeController.destroy);


module.exports = router;
