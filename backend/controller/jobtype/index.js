let express = require('express');
let router = express.Router();


//load controller
const jobtypeController = require('./jobtypeController');
router.use('/',jobtypeController);

module.exports = router;
