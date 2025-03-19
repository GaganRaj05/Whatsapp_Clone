const express = require('express');
const {getContacts,addContact} = require("../controller/features");
const checkAuth = require('../middlewares/checkAuth');
const router = express.Router();

router.get("/contacts",checkAuth,getContacts);
router.post("/add-contact",checkAuth,addContact);

module.exports = router;