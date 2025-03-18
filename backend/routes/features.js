const express = require('express');
const getContacts = require("../controller/features");
const checkAuth = require('../middlewares/checkAuth');
const router = express.Router();

router.get("/contacts",checkAuth,getContacts);


module.exports = router;