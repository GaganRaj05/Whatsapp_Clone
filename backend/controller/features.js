const Contacts = require('../models/Contacts');
const User = require("../models/Users")
async function getContacts(req,res) {
    try {
        const user_id = req.user_id;
        const contacts = await Contacts.findOne({user:user_id}).populate("contacts.contactUser")
        if(!contacts) return res.status(401).json("No contacts found");

        return res.status(201).json(contacts);
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Some error occured, please try again later");
    }
}

async function addContact(req, res) {
    try {
        const user_id = req.user_id;
        const {phone} = req.body;
        const userExists = await User.findOne({phone_number:phone});
        if(!userExists) return res.status(401).json("Invite user to whatsapp");
        
        const contactExists = await Contacts.find({
            user:user_id,
            'contacts':{
                $elemMatch:{
                    'phone_number':phone
                }
            }
        })

        if(contactExists.length>0) return res.status(400).json("Phone number already in contacts list");
        const contactInfo = {
            contactUser:userExists._id,
            name:userExists.name,
            phone_number:userExists.phone_number,
            profile_pic:userExists.profile_pic
        }
        const userInfo = await Contacts.findOne({user:user_id})
        console.log(userInfo)
        userInfo.contacts.push(contactInfo);
        userInfo.save();
        return res.status(201).json("New Contact added successfully!!");
    }
    catch(err) {
        console.log(err.message);
        return res.status(501).json("Internal Server Error")
    }
}
module.exports = {getContacts,addContact};