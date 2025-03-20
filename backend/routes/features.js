const express = require('express');
const {getContacts,addContact,handleMessages} = require("../controller/features");
const checkAuth = require('../middlewares/checkAuth');
const router = express.Router();

router.get("/contacts",checkAuth,getContacts);
router.post("/add-contact",checkAuth,addContact);
router.get("/get-messages",checkAuth,handleMessages);
module.exports = router;