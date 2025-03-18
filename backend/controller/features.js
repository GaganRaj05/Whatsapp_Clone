const Contacts = require('../models/Contacts');

async function getContacts(req,res) {
    try {
        const user_id = req.user_id;
        const contacts = await Contacts.findOne({user:user_id}).populate("contacts.contactUser")
        console.log(user_id)
        if(!contacts) return res.status(401).json("No messages found");

        return res.status(201).json(contacts);
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured, please try again later");
    }
}
module.exports = getContacts;